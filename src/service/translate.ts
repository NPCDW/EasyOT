import googleTranslateApi from '../api/googleTranslateApi'
import type {TranslateLanguageKeys} from '../store/translateOptions'

export async function translate(translateProvide: TranslateLanguageKeys, sourceLanguage: string, targetLanguage: string, text: string): Promise<string> {
    switch (translateProvide) {
        case "BaiduAI": 
            return "";
        case "TencentCloud": 
            return "";
        case "GoogleTranslate": 
            return await googleTranslateApi.translate(text, sourceLanguage, targetLanguage);
    }
}