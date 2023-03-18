use std::sync::RwLock;

use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct HotkeyConflict {
    pub ocr: bool,
    pub word_selection_translate: bool,
    pub screenshot_translate: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RuntimeConfig {
    pub config_path: String,
    pub hotkey_conflict: HotkeyConflict,
}

impl Default for RuntimeConfig {
    fn default() -> Self {
        Self {
            config_path: "".to_string(),
            hotkey_conflict: HotkeyConflict {
                ocr: false,
                word_selection_translate: false,
                screenshot_translate: false,
            },
        }
    }
}

lazy_static! {
    #[derive(Debug, Clone)]
    pub static ref RUNTIME_CONFIG: RwLock<RuntimeConfig> = {
        let config = RuntimeConfig::default();
        RwLock::new(config)
    };
}

#[tauri::command]
pub fn get_runtime_config() -> RuntimeConfig {
    (*RUNTIME_CONFIG).read().unwrap().to_owned()
}

#[tauri::command]
pub fn save_runtime_config(config: RuntimeConfig) {
    *RUNTIME_CONFIG.write().unwrap() = config.clone();
}
