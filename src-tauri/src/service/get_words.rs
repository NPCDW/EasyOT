use enigo::{Enigo, Key, KeyboardControllable};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn get_words() {
    let mut enigo = Enigo::new();

    enigo.key_up(Key::Control);
    enigo.key_up(Key::Alt);
    enigo.key_up(Key::Meta);
    enigo.key_up(Key::Shift);

    enigo.key_down(Key::Control);
    enigo.key_down(Key::Raw(0x2d));
    enigo.key_up(Key::Raw(0x2d));
    // enigo.key_click(Key::Layout('c'));
    enigo.key_up(Key::Control);
}
