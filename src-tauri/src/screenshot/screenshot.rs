#[cfg(target_os = "macos,linux")]
use screenshots::Screen;
#[cfg(target_os = "windows")]
use screenshot_win_dxgi::CaptureMode;
use tauri::{AppHandle, Manager};
use enigo::{Enigo, MouseControllable};
// use std::{fs};

#[cfg(target_os = "windows")]
#[tauri::command(async)]
pub fn screenshot(app_handle: AppHandle) -> (Vec<u8>, i32, i32, u32, u32, f64) {
  let window = app_handle.get_window("screenshot").unwrap();
  let monitors = window.available_monitors().unwrap();

  let enigo = Enigo::new();
  let mouse = enigo.mouse_location();

  let mut index = 1;
  let mut x = 0;
  let mut y = 0;
  let mut width = 0;
  let mut height = 0;
  let mut scale = 1f64;
  for (i, monitor) in monitors.iter().enumerate() {
      if monitor.position().x <= mouse.0 && mouse.0 < monitor.position().x + monitor.size().width as i32 
        && monitor.position().y <= mouse.1 && mouse.1 < monitor.position().y + monitor.size().height as i32  {
          index = i + 1;
          x = monitor.position().x;
          y = monitor.position().y;
          width = monitor.size().width;
          height = monitor.size().height;
          scale = monitor.scale_factor();
      }
  }

  let buffer = screenshot_win_dxgi::capture(CaptureMode::Monitor(index)).unwrap();
  
  (buffer, x, y, width, height, scale)
}

#[cfg(target_os = "macos,linux")]
#[tauri::command(async)]
pub fn screenshot() -> Vec<u8> {
  let screens = Screen::all().unwrap();
  let mut buffer = vec![];
  for screen in screens {
    // println!("capturer {screen:?}");
    let image = screen.capture().unwrap();
    buffer = image.buffer().to_owned();
    // fs::write(format!("target/{}-2.png", screen.display_info.id), &buffer).unwrap();
  }
}