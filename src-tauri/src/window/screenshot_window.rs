use enigo::{Enigo, MouseControllable};
use tauri::AppHandle;

pub fn build_screenshot_window(app_handle: &AppHandle) {
    let enigo = Enigo::new();
    let mouse = enigo.mouse_location();

    let _ = tauri::WindowBuilder::new(
        app_handle,
        "screenshot",
        tauri::WindowUrl::App("/screenshot/?target=ocr".into()),
    )
    .always_on_top(true)
    .decorations(false)
    .position(mouse.0.into(), mouse.1.into())
    .inner_size(1f64, 1f64)
    .resizable(false)
    .visible(false)
    .skip_taskbar(true)
    .transparent(true)
    .build()
    .unwrap();
}
