import { invoke } from '@tauri-apps/api/tauri'

export let config: object | null;

export async function get_config(): Promise<object> {
    if (config) {
        return config;
    }
    config = await invoke("get_config");
    console.log("config", config)
    return config!;
}