import { getClient, Body } from '@tauri-apps/api/http';
import {useConfig} from '../store/config'
import i18n from '../i18n'

const INVOKE_URL = "https://api.ocr.space/parse/image"

async function ocr(type: string, imageBase64: string, ocrLanguage: string) {
    const { t } = i18n.global
    let config = useConfig().get_config()
    if (!config?.ocr.space_ocr.api_key) {
        return t('result.EmptyKeyMessage')
    }
    
    const client = await getClient();
    console.log({
        base64image: "data:image/png;base64," + imageBase64,
        apikey: config?.ocr.space_ocr.api_key,
        language: ocrLanguage,
        OCREngine: type,
    })
    const response = await client.post(INVOKE_URL, Body.form({
        base64image: "data:image/png;base64," + imageBase64,
        apikey: config?.ocr.space_ocr.api_key!,
        language: ocrLanguage,
        OCREngine: type,
    }));
    console.log("spaceocr ocr", response)
    if (!response.ok) {
        return t('result.ErrorRequest') + JSON.stringify(response);
    }
    const data = response.data as { ErrorMessage: string, ParsedResults: { ParsedText: string }[] }
    if (data.ErrorMessage) {
        return data.ErrorMessage
    }
    let target = ''
    for (let i = 0; i < data.ParsedResults.length; i++) {
        target += data.ParsedResults[i].ParsedText + '\n'
    }
    return target
}

export default {
    ocr
}