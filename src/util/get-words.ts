import { invoke } from '@tauri-apps/api/tauri'

export async function get_words() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    await invoke("get_words");
}