import * as globalShortcut from '@tauri-apps/api/globalShortcut';
// import { get_words } from './get-words'
import { screenshot } from './screenshot'

export async function registerDefault(): Promise<void> {
    const registered = await globalShortcut.isRegistered('CommandOrControl+F4');
    if (!registered) {
        await globalShortcut.register('CommandOrControl+F4', async () => {
            console.log('Shortcut triggered');
            await screenshot();
        });
        console.log('Shortcut key registration succeeded');
    } else {
        console.log('Shortcut key has been registered, registration failed');
    }
}
