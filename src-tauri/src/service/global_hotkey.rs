use crate::config::config;
use crate::config::runtime_config;
use crate::service::get_words::get_words;
use crate::window::main_window::show_main_window;
use crate::window::screenshot_window::build_screenshot_window;
use rand::Rng;
use tauri::{App, AppHandle};
use tauri::{GlobalShortcutManager, Manager};

pub fn register_for_word_selection_translate(app_handle: AppHandle, key: &str) -> bool {
    let mut runtime_config = runtime_config::get_runtime_config();
    let result = app_handle.global_shortcut_manager().register(key, move || {
        get_words();
        show_main_window(
            app_handle.app_handle(),
            format!(
                "/window/result?target=word_selection&rand={:?}",
                rand::thread_rng().gen::<f64>()
            )
            .as_str(),
        );
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
        let _ = app_handle
            .global_shortcut_manager()
            .unregister(old_hotkey.as_str());
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
    let mut runtime_config = runtime_config::get_runtime_config();
    let result = app_handle.global_shortcut_manager().register(key, move || {
        if let Some(window) = app_handle.get_window("screenshot") {
            window.show().unwrap();
            window.set_focus().unwrap();
        } else {
            build_screenshot_window(&app_handle);
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
        let _ = app_handle
            .global_shortcut_manager()
            .unregister(old_hotkey.as_str());
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

pub fn init_register(app: &App) {
    let config = config::get_config();
    if config.hot_keys.word_selection_translate != "" {
        let app_handle = app.app_handle();
        register_for_word_selection_translate(
            app_handle,
            config.hot_keys.word_selection_translate.as_str(),
        );
    }
    if config.hot_keys.ocr != "" {
        let app_handle = app.app_handle();
        register_for_ocr(app_handle, config.hot_keys.ocr.as_str());
    }
}
