import { invoke } from '@tauri-apps/api/tauri'
import { defineStore } from 'pinia'
import {ref, computed} from "vue";

export const useConfig = defineStore('config', () => {
    const config = ref<Config>()

    async function refresh_config() {
        config.value = await invoke("get_config");
        console.log("refresh_config ", config)
    }

    const value = computed(async () => {
        if (!config.value) {
            await refresh_config()
        }
        return config.value
    })

    return { refresh_config, value }
})

interface CommonConfig {
    word_selection_interval: number,
    language: string,
}

interface BaiduCloudOcrConfig {
    access_token: string,
    access_token_expires_time: string,
    client_id: string,
    client_secret: string,
}

interface TencentCloudOcrConfig {
    secret_id: string,
    secret_key: string,
}

interface SpaceOcrOcrConfig {
    api_key: string,
}

interface OcrConfig {
    default_ocr_provide: string,
    default_ocr_type: string,
    default_ocr_language: string,
    baidu_cloud: BaiduCloudOcrConfig,
    tencent_cloud: TencentCloudOcrConfig,
    space_ocr: SpaceOcrOcrConfig,
}

interface BaiduAITranslateConfig {
    app_id: string,
    app_secret: string,
}

interface TencentCloudTranslateConfig {
    secret_id: string,
    secret_key: string,
}

interface TranslateConfig {
    default_translate_provide: string,
    default_translate_source_language: string,
    default_translate_target_language: string,
    baidu_ai: BaiduAITranslateConfig,
    tencent_cloud: TencentCloudTranslateConfig,
}

interface HotKeysDetail {
    modifiers: number,
    key: number,
    text: string,
}

interface HotKeysConfig {
    ocr: HotKeysDetail,
    word_selection_translate: HotKeysDetail,
    screenshot_translate: HotKeysDetail,
}

interface Config {
    common: CommonConfig,
    ocr: OcrConfig,
    translate: TranslateConfig,
    hot_keys: HotKeysConfig,
}
