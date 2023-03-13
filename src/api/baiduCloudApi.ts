import { getClient, Body } from '@tauri-apps/api/http';
import _ from 'lodash';
import { useConfig, type Config } from '../store/config'

const OCR_BASE_PATH = "https://aip.baidubce.com/"

async function getAccessToken(): Promise<string> {
    const config = useConfig().get_config();
    const access_token = config?.ocr.baidu_cloud.access_token;
    if (access_token) {
        let expire = access_token.substring(0, access_token.lastIndexOf('.'))
        expire = expire.substring(expire.lastIndexOf('.') + 1)
        let currentTime = Date.parse(new Date().toString()) / 1000
        if (parseInt(expire) - currentTime > 24 * 60 * 60) {
            return access_token
        }
    }
    const client_id = config?.ocr.baidu_cloud.client_id!
    const client_secret = config?.ocr.baidu_cloud.client_secret!

    const client = await getClient();
    const response = await client.post(OCR_BASE_PATH + 'oauth/2.0/token', Body.form({
        grant_type: 'client_credentials',
        client_id,
        client_secret,
    }));
    console.log("baidu getAccessToken", response)
    if (!response.ok) {
        return "请求失败：" + JSON.stringify(response);
    }
    const data = response.data as { access_token: string }
    let config_copy = _.cloneDeep(config)!
    config_copy.ocr.baidu_cloud.access_token = data.access_token
    useConfig().save_config(config_copy);
    return data.access_token
}

async function ocr(type: string, image: string) {
    let access_token = await getAccessToken();

    const client = await getClient();
    const response = await client.post(OCR_BASE_PATH + 'rest/2.0/ocr/v1/' + type, Body.form({
        image: image,
        access_token,
    }));
    console.log("baidu ocr", response)
    if (!response.ok) {
        return "请求失败：" + JSON.stringify(response);
    }
    const data = response.data as { error_code: string, error_msg: string, words_result: { words: string }[] }
    if (data.error_code) {
        return data.error_msg
    }
    let text = ''
    for (let i = 0; i < data.words_result.length; i++) {
        text += data.words_result[i].words + '\n'
    }
    return text
}

export default {
    ocr
}