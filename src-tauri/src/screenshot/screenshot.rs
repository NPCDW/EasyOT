use screenshots::Screen;
// use std::{fs};

#[tauri::command]
pub fn screenshot() -> Vec<u8> {
  let screens = Screen::all().unwrap();
  let mut buffer = vec![];
  for screen in screens {
    // println!("capturer {screen:?}");
    let image = screen.capture().unwrap();
    buffer = image.buffer().to_owned();
    // fs::write(format!("target/{}-2.png", screen.display_info.id), &buffer).unwrap();
  }
  buffer
}