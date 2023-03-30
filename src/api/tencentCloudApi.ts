import * as CryptoJS from 'crypto-js';
import { getClient, Body } from '@tauri-apps/api/http';
import { useConfig } from '../store/config'
import i18n from '../i18n'

export default {
    ocr, translate
}

const { t } = i18n.global

async function translate(sourceText: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
    let config = useConfig().get_config()
    if (!config?.ocr.tencent_cloud.secret_id || !config?.ocr.tencent_cloud.secret_key) {
        return t('result.EmptyKeyMessage')
    }

    let payloadStr = JSON.stringify({
        SourceText: sourceText,
        Source: sourceLanguage,
        Target: targetLanguage,
        ProjectId: 0,
    })
    const client = await getClient();
    const response = await client.post('https://tmt.tencentcloudapi.com/', Body.text(payloadStr), {
        headers: signForTranslate(payloadStr)
    });
    console.log("tencent translate", response)
    if (!response.ok) {
        return t('result.ErrorRequest') + JSON.stringify(response);
    }
    const data = response.data as TencentCloudTranslateResponse
    if (data.Response.Error) {
        return data.Response.Error.Code + '\n' + data.Response.Error.Message
    }
    return data.Response.TargetText
}

async function ocr(mode: string, imageBase64: string) {
    let config = useConfig().get_config()
    if (!config?.ocr.tencent_cloud.secret_id || !config?.ocr.tencent_cloud.secret_key) {
        return t('result.EmptyKeyMessage')
    }

    let payloadStr = JSON.stringify({
        ImageBase64: imageBase64,
    })
    const client = await getClient();
    const response = await client.post('https://ocr.tencentcloudapi.com/', Body.text(payloadStr), {
        headers: signForOcr(mode, payloadStr)
    });
    console.log("tencent ocr", response)
    if (!response.ok) {
        return t('result.ErrorRequest') + JSON.stringify(response);
    }
    const data = response.data as TencentCloudOcrResponse
    if (data.Response.Error) {
        return data.Response.Error.Code + '\n' + data.Response.Error.Message
    }
    let text = ''
    for (let i = 0; i < data.Response.TextDetections.length; i++) {
        text += data.Response.TextDetections[i].DetectedText + '\n'
    }
    return text
}

interface TencentCloudTranslateResponse {
    Response: {
        Error: {
            Code: string,
            Message: string
        },
        TargetText: string
    }
}

interface TencentCloudOcrResponse {
    Response: {
        Error: {
            Code: string,
            Message: string
        },
        TextDetections: {
            DetectedText: string
        }[]
    }
}

function signForTranslate(payloadStr: string) {
    return sign({
        endpoint: "tmt.tencentcloudapi.com",
        service: "tmt",
        action: "TextTranslate",
        version: "2018-03-21",
        payloadStr,
    })
}

function signForOcr(mode: string, payloadStr: string) {
    return sign({
        endpoint: "ocr.tencentcloudapi.com",
        service: "ocr",
        action: mode,
        version: "2018-11-19",
        payloadStr,
    })
}

interface SignParam {
    endpoint: string,
    service: string,
    action: string,
    version: string,
    payloadStr: string
}

function sign(param: SignParam) {
    const { endpoint, service, action, version, payloadStr } = param
    let config = useConfig().get_config()
    // 密钥参数
    const SECRET_ID = config?.ocr.tencent_cloud.secret_id
    const SECRET_KEY = config?.ocr.tencent_cloud.secret_key
    const region = 'ap-beijing'
    const timestamp = Date.parse(new Date().toString()) / 1000
    // const timestamp = 1551113065
    //时间处理, 获取世界时间日期
    const date = getDate(timestamp)
    // ************* 步骤 1：拼接规范请求串 *************
    const signedHeaders = "content-type;host"
    // const payload = "{\"Limit\": 1, \"Filters\": [{\"Values\": [\"\\u672a\\u547d\\u540d\"], \"Name\": \"instance-name\"}]}"
    const hashedRequestPayload = getHash(payloadStr);
    const httpRequestMethod = "POST"
    const canonicalUri = "/"
    const canonicalQueryString = ""
    const canonicalHeaders = "content-type:application/json\n" + "host:" + endpoint + "\n"
    const canonicalRequest = httpRequestMethod + "\n"
        + canonicalUri + "\n"
        + canonicalQueryString + "\n"
        + canonicalHeaders + "\n"
        + signedHeaders + "\n"
        + hashedRequestPayload
    // console.log(payloadStr)
    // console.log(canonicalRequest)
    // ************* 步骤 2：拼接待签名字符串 *************
    const algorithm = "TC3-HMAC-SHA256"
    const hashedCanonicalRequest = getHash(canonicalRequest);
    const credentialScope = date + "/" + service + "/" + "tc3_request"
    const stringToSign = algorithm + "\n" +
        timestamp + "\n" +
        credentialScope + "\n" +
        hashedCanonicalRequest
    // console.log(stringToSign)
    // ************* 步骤 3：计算签名 *************
    const kDate = sha256(date, 'TC3' + SECRET_KEY)
    const kService = sha256(service, kDate)
    const kSigning = sha256('tc3_request', kService)
    const signature = sha256(stringToSign, kSigning, 'hex')
    // console.log(signature)
    // ************* 步骤 4：拼接 Authorization *************
    const authorization = algorithm + " " +
        "Credential=" + SECRET_ID + "/" + credentialScope + ", " +
        "SignedHeaders=" + signedHeaders + ", " +
        "Signature=" + signature
    // console.log(authorization)
    // const curlcmd = 'curl -X POST ' + "https://" + endpoint
    //     + ' -H "Authorization: ' + authorization + '"'
    //     + ' -H "Content-Type: application/json; charset=utf-8"'
    //     + ' -H "Host: ' + endpoint + '"'
    //     + ' -H "X-TC-Action: ' + action + '"'
    //     + ' -H "X-TC-Timestamp: ' + timestamp.toString() + '"'
    //     + ' -H "X-TC-Version: ' + version + '"'
    //     + ' -H "X-TC-Region: ' + region + '"'
    //     + " -d '" + payload + "'"
    // console.log(curlcmd)
    return {
        "Authorization": authorization,
        "Content-Type": "application/json",
        "Host": endpoint,
        "X-TC-Action": action,
        "X-TC-Timestamp": timestamp.toString(),
        "X-TC-Version": version,
        "X-TC-Region": region,
        // "X-TC-Language": "zh-CN",
        "X-TC-RequestClient": "EasyOT",
    }
}

function sha256(message: string, secret: string | CryptoJS.lib.WordArray = '', encoding = '') {
    let hash = CryptoJS.HmacSHA256(message, secret)
    if (encoding === '') {
        return hash
    }
    return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Hex.parse(hash.toString()));
}

function getHash(message: string) {
    let hash = CryptoJS.SHA256(message).toString()
    return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Hex.parse(hash));
}

function getDate(timestamp: number): string {
    const date = new Date(timestamp * 1000)
    const year = date.getUTCFullYear()
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
    const day = ('0' + date.getUTCDate()).slice(-2)
    return `${year}-${month}-${day}`
}