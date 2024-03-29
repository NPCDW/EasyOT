import { invoke } from '@tauri-apps/api/tauri'
import _ from 'lodash';
import { defineStore } from 'pinia'
import { ref } from "vue";

export const useConfig = defineStore('config', () => {
    const config = ref<Config>()

    function get_config() {
        return config.value
    }

    async function refresh_config() {
        config.value = await invoke("get_config");
        console.log("refresh_config ", config.value)
        return config.value
    }

    async function save_config(tmp: Config) {
        config.value = _.cloneDeep(tmp);
        await invoke("save_config", { config: config.value });
        console.log("save_config ", config.value)
    }

    return { refresh_config, save_config, get_config }
})

interface CommonConfig {
    word_selection_interval: number,
    language: string,
}

interface BaiduCloudOcrConfig {
    access_token: string,
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
    default_ocr_mode: string,
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

interface HotKeysConfig {
    ocr: string,
    word_selection_translate: string,
    screenshot_translate: string,
}

export interface Config {
    common: CommonConfig,
    ocr: OcrConfig,
    translate: TranslateConfig,
    hot_keys: HotKeysConfig,
}
