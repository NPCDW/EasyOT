import { getClient, Body } from '@tauri-apps/api/http';
import { useConfig } from '../store/config'
import i18n from '../i18n'

const OCR_BASE_PATH = "https://aip.baidubce.com/"

const { t } = i18n.global
    
async function getAccessToken(): Promise<string> {
    return new Promise(async (resolve, reject) => {
        let config = useConfig().get_config();
        if (!config?.ocr.baidu_cloud.client_id || !config?.ocr.baidu_cloud.client_secret) {
            return reject(t('result.EmptyKeyMessage'))
        }
        const access_token = config?.ocr.baidu_cloud.access_token;
        if (access_token) {
            let expire = access_token.substring(0, access_token.lastIndexOf('.'))
            expire = expire.substring(expire.lastIndexOf('.') + 1)
            let currentTime = Date.parse(new Date().toString()) / 1000
            if (parseInt(expire) - currentTime > 24 * 60 * 60) {
                return resolve(access_token)
            }
        }
        const client_id = config?.ocr.baidu_cloud.client_id
        const client_secret = config?.ocr.baidu_cloud.client_secret

        const client = await getClient();
        const response = await client.post(OCR_BASE_PATH + 'oauth/2.0/token', Body.form({
            grant_type: 'client_credentials',
            client_id,
            client_secret,
        }));
        console.log("baidu getAccessToken", response)
        if (!response.ok) {
            return reject(t('result.ErrorRequest') + JSON.stringify(response));
        }
        const data = response.data as { access_token: string }
        config!.ocr.baidu_cloud.access_token = data.access_token
        await useConfig().save_config(config!);
        return resolve(data.access_token)
    })
}

async function ocr(type: string, image: string) {
    const access_token = await getAccessToken()
    
    const client = await getClient();
    const response = await client.post(OCR_BASE_PATH + 'rest/2.0/ocr/v1/' + type, Body.form({
        image: image,
        access_token,
    }));
    console.log("baidu ocr", response)
    if (!response.ok) {
        return t('result.ErrorRequest') + JSON.stringify(response);
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