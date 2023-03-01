use image::{ImageBuffer, Rgba};

#[tauri::command]
pub async fn screenshot(handle: tauri::AppHandle) {
  let _ = tauri::WindowBuilder::new(&handle, "screenshot", tauri::WindowUrl::App("/".into()))
    .always_on_top(true)
    .decorations(false)
    .position(0f64, 0f64)
    // .inner_size(1920f64, 1080f64)
    .resizable(false)
    // .skip_taskbar(true)
    .build().unwrap();
  
    let buf = win_screenshot::prelude::capture_display().unwrap();
    let img: ImageBuffer<Rgba<u8>, Vec<u8>> =
        ImageBuffer::from_raw(buf.width, buf.height, buf.pixels).unwrap();
    img.save("screenshot.jpg").unwrap();
}