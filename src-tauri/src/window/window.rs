use tauri::{AppHandle, Manager};

#[tauri::command(async)]
pub fn show_main_window(app_handle: AppHandle, url: &str) {
    if let Some(window) = app_handle.get_window("main") {
        let _ = window.emit("router-change-event", url);
        window.show().unwrap_or_else(|e| {
            println!("{:?}", e)
        });
        window.set_focus().unwrap_or_else(|e| {
            println!("{:?}", e)
        });
    } else {
        let window = tauri::WindowBuilder::new(&app_handle, "main", tauri::WindowUrl::App(url.into()))
            .decorations(false)
            .resizable(true)
            .title("EasyOT")
            .inner_size(800f64, 600f64)
            .center()
            .transparent(true)
            .build().unwrap_or_else(|e| {
                panic!("{:?}", e)
            });
        window.show().unwrap_or_else(|e| {
            println!("{:?}", e)
        });
        window.set_focus().unwrap_or_else(|e| {
            println!("{:?}", e)
        });
    }
}