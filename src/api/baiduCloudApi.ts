import { getClient, Body } from '@tauri-apps/api/http';
import { useConfig } from '../store/config'

const OCR_BASE_PATH = "https://aip.baidubce.com/"

async function getAccessToken(client_id: string, client_secret: string): Promise<string> {
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
    return (response.data as { access_token: string }).access_token
}

async function ocr(type: string, image: string) {
    let config = useConfig().get_config();
    let access_token = await getAccessToken(config?.ocr.baidu_cloud.client_id!, config?.ocr.baidu_cloud.client_secret!);

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