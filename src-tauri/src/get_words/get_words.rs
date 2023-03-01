use enigo::{Enigo, Key, KeyboardControllable, MouseControllable};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn get_words() -> String {
    let mut enigo = Enigo::new();
    println!("screen dimensions: {:?}", enigo.main_display_size());
    println!("mouse location: {:?}", enigo.mouse_location());
    enigo.key_down(Key::Control);
    enigo.key_down(Key::Raw(0x2d));
    enigo.key_up(Key::Raw(0x2d));
    enigo.key_up(Key::Control);
    return "".to_string();
}
