import { availableMonitors } from '@tauri-apps/api/window';

export async function screenshot() {
    const monitors = availableMonitors();
    console.log(monitors)
}