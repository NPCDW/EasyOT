use screenshots::Screen;

#[tauri::command]
pub async fn screenshot(handle: tauri::AppHandle) -> Vec<u8> {
  let _ = tauri::WindowBuilder::new(&handle, "screenshot", tauri::WindowUrl::App("/".into()))
    .always_on_top(true)
    .decorations(false)
    .position(0f64, 0f64)
    // .inner_size(1920f64, 1080f64)
    .resizable(false)
    // .skip_taskbar(true)
    .build().unwrap();
  
    let screens = Screen::all().unwrap();
    let mut buffer = vec![];
    for screen in screens {
      // println!("capturer {screen:?}");
      let image = screen.capture().unwrap();
      buffer = image.buffer().to_owned();
    }
    buffer
}