use tauri::{AppHandle, PhysicalSize, PhysicalPosition};
use tauri::{GlobalShortcutManager, Manager};
use crate::get_words::get_words::get_words;
use crate::window::window::show_main_window;
use crate::config::runtime_config;
use crate::config::config;
use rand::Rng;
use enigo::{Enigo, MouseControllable};

pub fn register_for_word_selection_translate(app_handle: AppHandle, key: &str) -> bool {
    let mut runtime_config = runtime_config::get_runtime_config();
    let result = app_handle.global_shortcut_manager().register(key, move || {
        get_words();
        show_main_window(app_handle.app_handle(), format!("/window/result?target=word_selection&rand={:?}", rand::thread_rng().gen::<f64>()).as_str());
    });
    runtime_config.hotkey_conflict.word_selection_translate = !result.is_ok();
    runtime_config::save_runtime_config(runtime_config);
    result.is_ok()
}

#[tauri::command]
pub fn reregister_for_word_selection_translate(app_handle: AppHandle, key: &str) -> bool {
    let mut config = config::get_config();
    let old_hotkey = config.hot_keys.word_selection_translate;
    if key == old_hotkey {
        return true;
    }
    if old_hotkey != "" {
        let _ = app_handle.global_shortcut_manager().unregister(old_hotkey.as_str());
    }
    if key == "" {
        return true;
    }
    let is_ok = register_for_word_selection_translate(app_handle, key);
    if is_ok {
        config.hot_keys.word_selection_translate = key.to_string();
        config::save_config(config);
    }
    is_ok
}

pub fn register_for_ocr(app_handle: AppHandle, key: &str) -> bool {
    let enigo = Enigo::new();
    let mouse = enigo.mouse_location();

    let mut runtime_config = runtime_config::get_runtime_config();
    let result = app_handle.global_shortcut_manager().register(key, move || {
        if let Some(window) = app_handle.get_window("screenshot") {
            window.show().unwrap();
            window.set_focus().unwrap();
        } else {
            let window = tauri::WindowBuilder::new(&app_handle, "screenshot", tauri::WindowUrl::App("/screenshot?target=ocr".into()))
                .always_on_top(true)
                .decorations(false)
                .position(-1920f64, 0f64)
                .inner_size(1920f64, 1080f64)
                .resizable(false)
                .visible(false)
                .skip_taskbar(true)
                .transparent(true)
                .build().unwrap();
            
  let window = app_handle.get_window("screenshot").unwrap();
  let monitors = window.available_monitors().unwrap();
            
            let mut index = 1;
            let mut x = 0;
            let mut y = 0;
            let mut width = 0;
            let mut height = 0;
            let mut scale = 1f64;
            for (i, monitor) in monitors.iter().enumerate() {
                if monitor.position().x <= mouse.0 && mouse.0 < monitor.position().x + monitor.size().width as i32 
                    && monitor.position().y <= mouse.1 && mouse.1 < monitor.position().y + monitor.size().height as i32  {
                    index = i + 1;
                    x = monitor.position().x;
                    y = monitor.position().y;
                    width = monitor.size().width;
                    height = monitor.size().height;
                    scale = monitor.scale_factor();
                }
            }
            window.set_position(PhysicalPosition::new(x, y)).unwrap();
            window.set_size(PhysicalSize::new(width, height)).unwrap();
            println!("{:?}, {:?}, {}, {:?}", window.inner_size(), window.outer_position(), index, mouse);

            // window.show().unwrap();
            // window.set_focus().unwrap();
        }
    });
    runtime_config.hotkey_conflict.ocr = !result.is_ok();
    runtime_config::save_runtime_config(runtime_config);
    result.is_ok()
}

#[tauri::command]
pub fn reregister_for_ocr(app_handle: AppHandle, key: &str) -> bool {
    let mut config = config::get_config();
    let old_hotkey = config.hot_keys.ocr;
    if key == old_hotkey {
        return true;
    }
    if old_hotkey != "" {
        let _ = app_handle.global_shortcut_manager().unregister(old_hotkey.as_str());
    }
    if key == "" {
        return true;
    }
    let is_ok = register_for_ocr(app_handle, key);
    if is_ok {
        config.hot_keys.ocr = key.to_string();
        config::save_config(config);
    }
    is_ok
}

pub fn unregister_all(app_handle: &AppHandle) {
    let _ = app_handle.global_shortcut_manager().unregister_all();
}
