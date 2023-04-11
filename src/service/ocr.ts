import type { OcrLanguageKeys } from '../store/ocrOptions'
import baiduCloudApi from '../api/baiduCloudApi'
import tencentCloudApi from '../api/tencentCloudApi'
import spaceOcrApi from '../api/spaceOcrApi'
import { invoke } from '@tauri-apps/api/tauri'

export function ocr(ocrProvide: OcrLanguageKeys, ocrMode: string, ocrLanguage: string, base64ImageData: string): Promise<string> {
    base64ImageData = base64ImageData.replace(/^data:image\/\w+;base64,/, '');
    let promises: Promise<string>;
    switch (ocrProvide) {
        case "BaiduCloud":
            promises = baiduCloudApi.ocr(ocrMode, base64ImageData);
            break;
        case "TencentCloud":
            promises = tencentCloudApi.ocr(ocrMode, base64ImageData);
            break;
        case "SpaceOCR":
            promises = spaceOcrApi.ocr(ocrMode, base64ImageData, ocrLanguage);
            break;
    }
    return new Promise((resolve, reject) => {
        promises.then(res => {
            invoke('insert_history', {info: {image_data: base64ImageData, ocr_text: res, cloud: ocrProvide}})
            resolve(res)
        }).catch(e => {
            invoke('insert_history', {info: {image_data: base64ImageData, ocr_text: e, cloud: ocrProvide}})
            reject(e)
        })
    })
}