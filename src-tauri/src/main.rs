#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate lazy_static;

mod config;
mod service;
mod util;
mod window;

use config::config::get_config;
use config::config::save_config;
use config::runtime_config::get_runtime_config;
use service::auto_start::{disable_auto_start, enable_auto_start, get_auto_start_status};
use service::get_words::get_words;
use service::global_hotkey;
use service::global_hotkey::{reregister_for_ocr, reregister_for_word_selection_translate};
use service::screenshot::screenshot;
use tauri::{CustomMenuItem, SystemTrayEvent, SystemTrayMenu};
use tauri::{Manager, SystemTray};
use window::main_window::show_main_window;
use window::main_window_event;
use service::singleton;

fn main() {
    if singleton::is_app_running() {
        std::process::exit(0);
    }

    // println!("{:?}", *config::config::CONFIG);
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let tray_menu = SystemTrayMenu::new().add_item(quit);
    let tray = SystemTray::new().with_menu(tray_menu);

    let resized_debounce = main_window_event::create_resized_debounce();
    let moved_debounce = main_window_event::create_moved_debounce();

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app_handle, event| match event {
            SystemTrayEvent::LeftClick { .. } => {
                show_main_window(app_handle.app_handle(), "/");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    let _ = app_handle.tray_handle().destroy();
                    global_hotkey::unregister_all(app_handle);
                    std::process::exit(0);
                }
                _ => {}
            },
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![
            get_words,
            screenshot,
            get_config,
            save_config,
            get_runtime_config,
            show_main_window,
            reregister_for_ocr,
            reregister_for_word_selection_translate,
            get_auto_start_status,
            enable_auto_start,
            disable_auto_start
        ])
        .setup(|app| {
            global_hotkey::init_register(app);
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
                    main_window_event::event_trigger(
                        event,
                        app_handle,
                        &resized_debounce,
                        &moved_debounce,
                    );
                }
            }
            _ => {}
        });
}
