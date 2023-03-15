#[cfg(target_os = "macos,linux")]
use screenshots::Screen;
#[cfg(target_os = "windows")]
use screenshot_win_dxgi::CaptureMode;
// use std::{fs};

#[cfg(target_os = "windows")]
#[tauri::command(async)]
pub fn screenshot() -> Vec<u8> {
  let buffer = screenshot_win_dxgi::capture(CaptureMode::Monitor(1)).unwrap();
  
  buffer
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