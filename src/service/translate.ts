import googleTranslateApi from '../api/googleTranslateApi'
import tencentCloudApi from '../api/tencentCloudApi'
import baiduAIApi from '../api/baiduAIApi'
import type {TranslateLanguageKeys} from '../store/translateOptions'

export async function translate(translateProvide: TranslateLanguageKeys, sourceLanguage: string, targetLanguage: string, text: string): Promise<string> {
    switch (translateProvide) {
        case "BaiduAI": 
            return baiduAIApi.translate(text, sourceLanguage, targetLanguage);
        case "TencentCloud": 
            return await tencentCloudApi.translate(text, sourceLanguage, targetLanguage);
        case "GoogleTranslate": 
            return await googleTranslateApi.translate(text, sourceLanguage, targetLanguage);
    }
}