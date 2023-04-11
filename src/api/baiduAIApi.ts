import { getClient, Body } from '@tauri-apps/api/http';
import { useConfig } from '../store/config'
import { random } from '../util/number_util'
import * as CryptoJS from 'crypto-js';
import i18n from '../i18n'

const TRANSLATE_URL = "https://fanyi-api.baidu.com/api/trans/vip/translate"

const { t } = i18n.global

async function translate(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
    let config = useConfig().get_config()
    if (!config?.translate.baidu_ai.app_id || !config?.translate.baidu_ai.app_secret) {
        throw t('result.EmptyKeyMessage')
    }
    const salt = random(1, 10000000) + ""
    const appid = config?.translate.baidu_ai.app_id
    const signStr = appid + text + salt + config?.translate.baidu_ai.app_secret
    const sign = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Hex.parse(CryptoJS.MD5(signStr).toString()));

    const client = await getClient();
    const response = await client.post(TRANSLATE_URL, Body.form({
        q: text,
        from: sourceLanguage,
        to: targetLanguage,
        appid,
        salt,
        sign,
    }));
    console.log("baidu translate", response)
    if (!response.ok) {
        throw t('result.ErrorRequest') + JSON.stringify(response);
    }
    const data = response.data as BaiduAiTranslateResponse
    if (data.error_code) {
        throw data.error_code + "\n" + data.error_msg
    }
    let target = ''
    for (let i = 0; i < data.trans_result.length; i++) {
        target += data.trans_result[i].dst + '\n'
    }
    return target
}

interface BaiduAiTranslateResponse {
    error_code: string,
    error_msg: string,
    trans_result: {
        dst: string
    }[]
}

export default {
    translate
}