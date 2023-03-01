use screenshots::Screen;
use std::{fs, time::Instant};

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
  
    let start = Instant::now();
    let screens = Screen::all().unwrap();
    let mut buffer = vec![];
    for screen in screens {
      // println!("capturer {screen:?}");
      let image = screen.capture().unwrap();
      buffer = image.buffer().to_owned();
      // fs::write(format!("target/{}.png", screen.display_info.id), buffer).unwrap();
  
      // image = screen.capture_area(300, 300, 300, 300).unwrap();
      // buffer = image.buffer();
      // fs::write(format!("target/{}-2.png", screen.display_info.id), buffer).unwrap();
    }
    println!("运行耗时: {:?}", start.elapsed());
    buffer
}