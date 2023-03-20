import { getClient, Body } from '@tauri-apps/api/http';
import {useConfig} from '../store/config'

const INVOKE_URL = "https://api.ocr.space/parse/image"

async function ocr(type: string, imageBase64: string, ocrLanguage: string) {
    let config = useConfig().get_config()
    
    const client = await getClient();
    console.log({
        base64image: "data:image/png;base64," + imageBase64,
        apikey: config?.ocr.space_ocr.api_key!,
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
        return "请求失败：" + JSON.stringify(response);
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