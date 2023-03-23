use crate::util::regedit_util;
use crate::config::config::APP_DIR;

const REGEDIT_AUTO_START_DIR: &'static str = r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run";
const REGEDIT_AUTO_START_KEY: &'static str = r"EasyOT";

#[tauri::command]
pub fn get_status() -> bool {
    let res = regedit_util::get(REGEDIT_AUTO_START_DIR, REGEDIT_AUTO_START_KEY);
    res.is_ok()
}

#[tauri::command]
pub fn enable() -> bool {
    let app_path = APP_DIR.join("easyot.exe");
    let res = regedit_util::set(REGEDIT_AUTO_START_DIR, REGEDIT_AUTO_START_KEY, app_path.to_str().unwrap());
    res.is_ok()
}

#[tauri::command]
pub fn disable() -> bool {
    let res = regedit_util::delete(REGEDIT_AUTO_START_DIR, REGEDIT_AUTO_START_KEY);
    res.is_ok()
}