import * as globalShortcut from '@tauri-apps/api/globalShortcut';
import { listen } from '@tauri-apps/api/event'

export async function registerDefault(): Promise<void> {
    const registered = await globalShortcut.isRegistered('CommandOrControl+F4');
    if (!registered) {
        await globalShortcut.register('CommandOrControl+F4', () => {
            console.log('Shortcut triggered');
        });
        console.log('Shortcut key registration succeeded');
    } else {
        console.log('Shortcut key has been registered, registration failed');
    }

    listenUnregisterAll()
}

export async function listenUnregisterAll(): Promise<void> {
    await listen('unregister-all-event', async (event) => {
        await globalShortcut.unregisterAll();
        console.log('Shortcut key unregisterAll succeeded');
    })
}
