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

use tauri::{SystemTray, Manager, GlobalShortcutManager};
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent};
use rand::Rng;
use get_words::get_words::get_words;
use screenshot::screenshot::screenshot;
use config::config::get_config;
use config::config::save_config;
use window::window::show_main_window;

fn main() {
    // println!("{:?}", *config::config::CONFIG);
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let hide = CustomMenuItem::new("hide".to_string(), "隐藏托盘");
    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    let tray = SystemTray::new().with_menu(tray_menu);

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
                        let _ = app_handle.global_shortcut_manager().unregister_all();
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
        .invoke_handler(tauri::generate_handler![get_words, screenshot, get_config, save_config, show_main_window])
        .setup(|app| {
            let app_handle = app.app_handle();
            let _ = app_handle.global_shortcut_manager().register("CommandOrControl+F4", move || {
                get_words();
                show_main_window(app_handle.app_handle(), format!("/window/result?target=word_selection&rand={:?}", rand::thread_rng().gen::<f64>()).as_str());
            });
            let app_handle = app.app_handle();
            let _ = app_handle.global_shortcut_manager().register("CommandOrControl+PrintScreen", move || {
                if let Some(window) = app_handle.get_window("screenshot") {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                } else {
                    let _ = tauri::WindowBuilder::new(&app_handle, "screenshot", tauri::WindowUrl::App("/screenshot?target=ocr".into()))
                        .always_on_top(true)
                        .decorations(false)
                        .position(0f64, 0f64)
                        .inner_size(600f64, 600f64)
                        .resizable(false)
                        .visible(false)
                        .skip_taskbar(true)
                        .transparent(true)
                        .build().unwrap();
                    // window.show().unwrap();
                    // window.set_focus().unwrap();
                }
            });
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}
