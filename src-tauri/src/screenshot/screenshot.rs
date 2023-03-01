#[tauri::command]
pub async fn screenshot(handle: tauri::AppHandle) {
  let _ = tauri::WindowBuilder::new(
    &handle,
    "screenshot", /* the unique window label */
    tauri::WindowUrl::App("/".into())
  ).build().unwrap();
}