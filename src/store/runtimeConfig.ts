import { invoke } from '@tauri-apps/api/tauri'
import _ from 'lodash';
import { defineStore } from 'pinia'
import {ref} from "vue";

export const useRuntimeConfig = defineStore('runtimeConfig', () => {
    const config = ref<RuntimeConfig>()

    function getRuntimeConfig() {
        return config.value
    }

    async function refreshRuntimeConfig() {
        config.value = await invoke("get_runtime_config");
        console.log("refreshRuntimeConfig ", config.value)
    }

    return { refreshRuntimeConfig, getRuntimeConfig }
})

interface HotkeyConflict {
    ocr: boolean,
    word_selection_translate: boolean,
    screenshot_translate: boolean,
}

export interface RuntimeConfig {
    config_path: string,
    hotkey_conflict: HotkeyConflict,
}
