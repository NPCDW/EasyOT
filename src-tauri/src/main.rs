#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate lazy_static;

mod get_words;
mod screenshot;
mod config;
mod util;
mod window;

use tauri::{SystemTray, Manager, PhysicalSize, PhysicalPosition, AppHandle};
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent};
use util::debounce::debounce;
use get_words::get_words::get_words;
use screenshot::screenshot::screenshot;
use config::config::get_config;
use config::runtime_config::get_runtime_config;
use config::config::save_config;
use util::global_shortcut_util;
use window::window::show_main_window;
use util::global_shortcut_util::{reregister_for_ocr, reregister_for_word_selection_translate};

fn main() {
    // println!("{:?}", *config::config::CONFIG);
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let hide = CustomMenuItem::new("hide".to_string(), "隐藏托盘");
    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    let tray = SystemTray::new().with_menu(tray_menu);

    let mut resized_debounce = create_resized_debounce();
    let mut moved_debounce = create_moved_debounce();

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app_handle, event| match event {
            SystemTrayEvent::LeftClick { .. } => {
                show_main_window(app_handle.app_handle(), "/");
            },
            SystemTrayEvent::MenuItemClick { id, .. } => {
                match id.as_str() {
                    "quit" => {
                        let _ = app_handle.tray_handle().destroy();
                        global_shortcut_util::unregister_all(app_handle);
                        std::process::exit(0);
                    }
                    "hide" => {
                        let window = app_handle.get_window("main").unwrap();
                        window.hide().unwrap();
                    }
                    _ => {}
                }
            },
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![get_words, screenshot, get_config, save_config, show_main_window, get_runtime_config, reregister_for_ocr, reregister_for_word_selection_translate])
        .setup(|app| {
            let config = get_config();
            if config.hot_keys.word_selection_translate != "" {
                let app_handle = app.app_handle();
                let _is_ok = global_shortcut_util::register_for_word_selection_translate(app_handle, config.hot_keys.word_selection_translate.as_str());
            }
            if config.hot_keys.ocr != "" {
                let app_handle = app.app_handle();
                let _is_ok = global_shortcut_util::register_for_ocr(app_handle, config.hot_keys.ocr.as_str());
            }
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(move |app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            tauri::RunEvent::WindowEvent { label, event, .. } => {
                if label == "main" {
                    match event {
                        tauri::WindowEvent::Resized(size) => {
                            let res = resized_debounce.send((app_handle.app_handle(), size));
                            if res.is_err() {
                                resized_debounce = create_resized_debounce();
                                resized_debounce.send((app_handle.app_handle(), size)).unwrap();
                            }
                        }
                        tauri::WindowEvent::Moved(pos) => {
                            let res = moved_debounce.send(pos);
                            if res.is_err() {
                                moved_debounce = create_moved_debounce();
                                moved_debounce.send(pos).unwrap();
                            }
                        }
                        _ => {}
                    }
                }
            }
            _ => {}
        });
}

fn create_resized_debounce() -> std::sync::mpsc::Sender<(AppHandle, PhysicalSize<u32>)> {
    debounce(|(app_handle, size): (AppHandle, PhysicalSize<u32>)| {
        println!("resized debounce: {:?}", size);
        let mut config = get_config();
        let mut main = config.window.get_mut("main").unwrap();
        if (main.width != size.width || main.height != size.height) && size.height > 100 {
            if app_handle.get_window("main").unwrap().is_maximized().unwrap() {
                main.maximized = true
            } else {
                main.maximized = false;
                main.width = size.width;
                main.height = size.height;
            }
            save_config(config);
        }
    }, std::time::Duration::from_millis(1000))
}

fn create_moved_debounce() -> std::sync::mpsc::Sender<PhysicalPosition<i32>> {
    debounce(|pos: PhysicalPosition<i32>| {
        println!("moved debounce: {:?}", pos);
        let mut config = get_config();
        let mut main = config.window.get_mut("main").unwrap();
        if (main.x != pos.x || main.y != pos.y) && pos.x > -32000 {
            main.x = pos.x;
            main.y = pos.y;
            save_config(config);
        }
    }, std::time::Duration::from_millis(1000))
}