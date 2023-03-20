import type {OcrLanguageKeys} from '../store/ocrOptions'
import baiduCloudApi from '../api/baiduCloudApi'
import tencentCloudApi from '../api/tencentCloudApi'

export async function ocr(ocrProvide: OcrLanguageKeys, ocrMode: string, ocrLanguage: string, base64ImageData: string): Promise<string> {
    base64ImageData = base64ImageData.replace(/^data:image\/\w+;base64,/, '');
    switch (ocrProvide) {
        case "BaiduCloud": 
            return await baiduCloudApi.ocr(ocrMode, base64ImageData);
        case "TencentCloud": 
            return await tencentCloudApi.ocr(ocrMode, base64ImageData);
        case "SpaceOCR": 
            return "";
    }
}