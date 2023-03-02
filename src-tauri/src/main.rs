#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod get_words;
mod screenshot;

use tauri::{SystemTray, Manager, GlobalShortcutManager};
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent};
use get_words::get_words::get_words;
use screenshot::screenshot::screenshot;

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let hide = CustomMenuItem::new("hide".to_string(), "隐藏托盘");
    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { .. } => {
                if let Some(window) = app.get_window("main") {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                } else {
                    let window = tauri::WindowBuilder::new(app, "main", tauri::WindowUrl::App("/".into()))
                        .decorations(false)
                        .resizable(true)
                        .title("EasyOT")
                        .inner_size(800f64, 600f64)
                        .transparent(true)
                        .build().unwrap();
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            },
            SystemTrayEvent::MenuItemClick { id, .. } => {
                match id.as_str() {
                    "quit" => {
                        let _ = app.tray_handle().destroy();
                        let _ = app.global_shortcut_manager().unregister_all();
                        std::process::exit(0);
                    }
                    "hide" => {
                        let window = app.get_window("main").unwrap();
                        window.hide().unwrap();
                    }
                    _ => {}
                }
            },
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![get_words, screenshot])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|app_handle, event| match event {
            tauri::RunEvent::WindowEvent { label: windows_label, event: windows_event, .. } => {
                // println!("windows label: {}, windows event: {:?}", windows_label, windows_event);
                if windows_label.as_str() == "main" {
                    match windows_event {
                        tauri::WindowEvent::CloseRequested {api, ..} => {
                            api.prevent_close();
                            let window = app_handle.get_window("main").unwrap();
                            window.hide().unwrap();
                        },
                        _ => {}
                    }
                }
            }
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}
