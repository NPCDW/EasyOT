use tauri::{AppHandle, Manager};

use crate::config::config;

#[tauri::command(async)]
pub fn show_main_window(app_handle: AppHandle, url: &str) {
    let config = config::get_config();

    if let Some(window) = app_handle.get_window("main") {
        std::thread::sleep(core::time::Duration::from_millis(100));
        let _ = window.emit("router-change-event", url);
        window.unminimize().unwrap();
        window.show().unwrap();
        window.set_focus().unwrap();
    } else {
        let main = config.window.get("main").unwrap();
        let window =
            tauri::WindowBuilder::new(&app_handle, "main", tauri::WindowUrl::App(url.into()))
                .decorations(false)
                .resizable(true)
                .title("EasyOT")
                .position(main.x.into(), main.y.into())
                .inner_size(main.width.into(), main.height.into())
                .maximized(main.maximized)
                .transparent(true)
                .build()
                .unwrap();
        window.show().unwrap();
        window.set_focus().unwrap();
    }
}
