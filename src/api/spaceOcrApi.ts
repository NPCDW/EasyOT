import { getClient, Body } from '@tauri-apps/api/http';
import { useConfig } from '../store/config'
import i18n from '../i18n'

const INVOKE_URL = "https://api.ocr.space/parse/image"

const { t } = i18n.global

async function ocr(type: string, imageBase64: string, ocrLanguage: string) {
    let config = useConfig().get_config()
    if (!config?.ocr.space_ocr.api_key) {
        throw t('result.EmptyKeyMessage')
    }

    const client = await getClient();
    const response = await client.post(INVOKE_URL, Body.form({
        base64image: "data:image/png;base64," + imageBase64,
        apikey: config?.ocr.space_ocr.api_key!,
        language: ocrLanguage,
        OCREngine: type,
    }));
    console.log("spaceocr ocr", response)
    if (!response.ok) {
        throw t('result.ErrorRequest') + JSON.stringify(response);
    }
    const data = response.data as SpaceOcrResponse
    if (data.ErrorMessage) {
        throw data.ErrorMessage
    }
    let target = ''
    for (let i = 0; i < data.ParsedResults.length; i++) {
        target += data.ParsedResults[i].ParsedText + '\n'
    }
    return target
}

interface SpaceOcrResponse {
    ErrorMessage: string,
    ParsedResults: {
        ParsedText: string
    }[]
}

export default {
    ocr
}