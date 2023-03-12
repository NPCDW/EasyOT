import crypto from "crypto";
// import {type BinaryToTextEncoding} from "crypto"

// function sign(payloadStr: string) {
//     // 密钥参数
//     const SECRET_ID = this.form.SECRET_ID
//     const SECRET_KEY = this.form.SECRET_KEY
//     const endpoint = "ocr.tencentcloudapi.com"
//     const service = "ocr"
//     const region = 'ap-beijing'
//     const action = this.form.type
//     const version = "2018-11-19"
//     const timestamp = Date.parse(new Date().toString()) / 1000
//     // const timestamp = 1551113065
//     //时间处理, 获取世界时间日期
//     const date = getDate(timestamp)
//     // ************* 步骤 1：拼接规范请求串 *************
//     const signedHeaders = "content-type;host"
//     // const payload = "{\"Limit\": 1, \"Filters\": [{\"Values\": [\"\\u672a\\u547d\\u540d\"], \"Name\": \"instance-name\"}]}"
//     const hashedRequestPayload = getHash(payloadStr);
//     const httpRequestMethod = "POST"
//     const canonicalUri = "/"
//     const canonicalQueryString = ""
//     const canonicalHeaders = "content-type:application/json\n" + "host:" + endpoint + "\n"
//     const canonicalRequest = httpRequestMethod + "\n"
//         + canonicalUri + "\n"
//         + canonicalQueryString + "\n"
//         + canonicalHeaders + "\n"
//         + signedHeaders + "\n"
//         + hashedRequestPayload
//     console.log(canonicalRequest)
//     // ************* 步骤 2：拼接待签名字符串 *************
//     const algorithm = "TC3-HMAC-SHA256"
//     const hashedCanonicalRequest = getHash(canonicalRequest);
//     const credentialScope = date + "/" + service + "/" + "tc3_request"
//     const stringToSign = algorithm + "\n" +
//         timestamp + "\n" +
//         credentialScope + "\n" +
//         hashedCanonicalRequest
//     console.log(stringToSign)
//     // ************* 步骤 3：计算签名 *************
//     const kDate = sha256(date, 'TC3' + SECRET_KEY, 'hex')
//     const kService = sha256(service, kDate, 'hex')
//     const kSigning = sha256('tc3_request', kService, 'hex')
//     const signature = sha256(stringToSign, kSigning, 'hex')
//     console.log(signature)
//     // ************* 步骤 4：拼接 Authorization *************
//     const authorization = algorithm + " " +
//         "Credential=" + SECRET_ID + "/" + credentialScope + ", " +
//         "SignedHeaders=" + signedHeaders + ", " +
//         "Signature=" + signature
//     console.log(authorization)
//     // const curlcmd = 'curl -X POST ' + "https://" + endpoint
//     //     + ' -H "Authorization: ' + authorization + '"'
//     //     + ' -H "Content-Type: application/json; charset=utf-8"'
//     //     + ' -H "Host: ' + endpoint + '"'
//     //     + ' -H "X-TC-Action: ' + action + '"'
//     //     + ' -H "X-TC-Timestamp: ' + timestamp.toString() + '"'
//     //     + ' -H "X-TC-Version: ' + version + '"'
//     //     + ' -H "X-TC-Region: ' + region + '"'
//     //     + " -d '" + payload + "'"
//     // console.log(curlcmd)
//     return {
//         "Authorization": authorization,
//         "Content-Type": "application/json",
//         "Host": endpoint,
//         "X-TC-Action": action,
//         "X-TC-Timestamp": timestamp.toString(),
//         "X-TC-Version": version,
//         "X-TC-Region": region,
//     }
// }

// function sha256(message: string, secret = '', encoding: BinaryToTextEncoding) {
//     const hmac = crypto.createHmac('sha256', secret)
//     return hmac.update(message).digest(encoding)
// }

// function getHash(message: string, encoding: BinaryToTextEncoding = 'hex') {
//     const hash = crypto.createHash('sha256')
//     return hash.update(message).digest(encoding)
// }

// function getDate(timestamp: number): string {
//     const date = new Date(timestamp * 1000)
//     const year = date.getUTCFullYear()
//     const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
//     const day = ('0' + date.getUTCDate()).slice(-2)
//     return `${year}-${month}-${day}`
// }