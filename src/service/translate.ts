import type { TranslateLanguageKeys } from '../store/translateOptions'
import googleTranslateApi from '../api/googleTranslateApi'
import tencentCloudApi from '../api/tencentCloudApi'
import baiduAIApi from '../api/baiduAIApi'
import { invoke } from '@tauri-apps/api/tauri'

export function translate(translateProvide: TranslateLanguageKeys, sourceLanguage: string, targetLanguage: string, text: string): Promise<string> {
    let promises: Promise<string>;
    switch (translateProvide) {
        case "BaiduAI":
            promises = baiduAIApi.translate(text, sourceLanguage, targetLanguage);
            break;
        case "TencentCloud":
            promises = tencentCloudApi.translate(text, sourceLanguage, targetLanguage);
            break;
        case "GoogleTranslate":
            promises = googleTranslateApi.translate(text, sourceLanguage, targetLanguage);
            break;
    }
    return new Promise((resolve, reject) => {
        promises.then(res => {
            invoke('insert_history', {info: {ocr_text: text, translate_text: res, cloud: translateProvide}})
            resolve(res)
        }).catch(e => {
            invoke('insert_history', {info: {ocr_text: text, translate_text: e, cloud: translateProvide}})
            reject(e)
        })
    })
}