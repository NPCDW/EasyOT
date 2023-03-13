import { getClient } from '@tauri-apps/api/http';

const TRANSLATE_BASE_PATH = "https://translate.googleapis.com/translate_a/single";

async function translate(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
    let param = "?client=gtx&dt=t"
            + "&sl=" + sourceLanguage
            + "&tl=" + targetLanguage
            + "&q=" + encodeURIComponent(text);
    const client = await getClient();
    const response = await client.get(TRANSLATE_BASE_PATH + param);
    console.log("google translate", response)
    if (!response.ok) {
        return "请求失败：" + JSON.stringify(response);
    }
    const jsonArray = response.data as string[][][];
    let result = "";
    for (const item of jsonArray[0]) {
        result += item[0]
    }
    return result
}

export default {
    translate
}