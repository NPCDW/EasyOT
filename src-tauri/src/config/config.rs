use std::sync::RwLock;
use std::{collections::HashMap, path::PathBuf};

use serde::{Deserialize, Serialize};

use crate::util::file_util;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CommonConfig {
    pub word_selection_interval: u32,
    pub language: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct BaiduCloudOcrConfig {
    pub access_token: String,
    pub client_id: String,
    pub client_secret: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TencentCloudOcrConfig {
    pub secret_id: String,
    pub secret_key: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SpaceOcrOcrConfig {
    pub api_key: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OcrConfig {
    pub default_ocr_provide: String,
    pub default_ocr_mode: String,
    pub default_ocr_language: String,
    pub baidu_cloud: BaiduCloudOcrConfig,
    pub tencent_cloud: TencentCloudOcrConfig,
    pub space_ocr: SpaceOcrOcrConfig,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct BaiduAITranslateConfig {
    pub app_id: String,
    pub app_secret: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TencentCloudTranslateConfig {
    pub secret_id: String,
    pub secret_key: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TranslateConfig {
    pub default_translate_provide: String,
    pub default_translate_source_language: String,
    pub default_translate_target_language: String,
    pub baidu_ai: BaiduAITranslateConfig,
    pub tencent_cloud: TencentCloudTranslateConfig,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct HotKeysConfig {
    pub ocr: String,
    pub word_selection_translate: String,
    pub screenshot_translate: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct WindowConfig {
    pub x: i32,
    pub y: i32,
    pub width: u32,
    pub height: u32,
    pub maximized: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Config {
    pub common: CommonConfig,
    pub ocr: OcrConfig,
    pub translate: TranslateConfig,
    pub hot_keys: HotKeysConfig,
    pub window: HashMap<String, WindowConfig>,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            common: CommonConfig {
                word_selection_interval: 400,
                language: "zh_CN".to_string(),
            },
            ocr: OcrConfig {
                default_ocr_provide: "BaiduCloud".to_string(),
                default_ocr_mode: "general_basic".to_string(),
                default_ocr_language: "auto".to_string(),
                baidu_cloud: BaiduCloudOcrConfig {
                    access_token: "".to_string(),
                    client_id: "".to_string(),
                    client_secret: "".to_string(),
                },
                tencent_cloud: TencentCloudOcrConfig {
                    secret_id: "".to_string(),
                    secret_key: "".to_string(),
                },
                space_ocr: SpaceOcrOcrConfig {
                    api_key: "".to_string(),
                },
            },
            translate: TranslateConfig {
                default_translate_provide: "TencentCloud".to_string(),
                default_translate_source_language: "auto".to_string(),
                default_translate_target_language: "zh".to_string(),
                baidu_ai: BaiduAITranslateConfig {
                    app_id: "".to_string(),
                    app_secret: "".to_string(),
                },
                tencent_cloud: TencentCloudTranslateConfig {
                    secret_id: "".to_string(),
                    secret_key: "".to_string(),
                },
            },
            hot_keys: HotKeysConfig {
                ocr: "F4".to_string(),
                word_selection_translate: "F2".to_string(),
                screenshot_translate: "Ctrl+F2".to_string(),
            },
            window: HashMap::from([(
                String::from("main"),
                WindowConfig {
                    x: 300,
                    y: 300,
                    width: 800,
                    height: 600,
                    maximized: false,
                },
            )]),
        }
    }
}

lazy_static! {
    #[derive(Debug)]
    pub static ref APP_DIR: PathBuf = {
        std::env::current_dir().unwrap_or_else(|e| {
            panic!("获取程序目录失败：{:?}", e);
        })
    };

    #[derive(Debug)]
    pub static ref CONFIG_DIR: PathBuf = {
        tauri::api::path::config_dir().unwrap_or_else(|| {
            panic!("获取配置目录失败");
        })
    };

    #[derive(Debug)]
    pub static ref CONFIG_FILE_PATH: PathBuf = {
        CONFIG_DIR.join("EasyOT").join("setting.yml")
    };

    #[derive(Debug, Clone)]
    pub static ref CONFIG: RwLock<Config> = {
        let config;
        if !CONFIG_FILE_PATH.exists() {
            file_util::create_dir(CONFIG_FILE_PATH.parent().unwrap());
            config = Config::default();
            let yaml = serde_yaml::to_string(&config).unwrap_or_else(|e| {
                panic!("Serialize config fail, {:?}", e)
            });
            file_util::write_file(CONFIG_FILE_PATH.as_path(), &yaml);
        } else {
            let yaml = file_util::read_file(&CONFIG_FILE_PATH).unwrap();
            // 序列化时，如果结构体比 yaml 数据多字段，需要添加在相应字段添加 #[serde(default)]，如果 yaml 数据相比于结构体多字段，会被忽略
            config = serde_yaml::from_str(&yaml).unwrap_or_else(|e| {
                panic!("配置文件 {} 转 yaml 格式失败：{:?}", &CONFIG_FILE_PATH.display(), e);
            })
        }
        let mut runtime_config = crate::config::runtime_config::get_runtime_config();
        runtime_config.config_path = CONFIG_FILE_PATH.to_str().unwrap().to_string();
        crate::config::runtime_config::save_runtime_config(runtime_config);
        RwLock::new(config)
    };
}

#[tauri::command]
pub fn get_config() -> Config {
    (*CONFIG).read().unwrap().to_owned()
}

#[tauri::command]
pub fn save_config(config: Config) {
    *CONFIG.write().unwrap() = config.clone();
    let yaml =
        serde_yaml::to_string(&config).unwrap_or_else(|e| panic!("Serialize config fail, {:?}", e));
    file_util::write_file(CONFIG_FILE_PATH.as_path(), &yaml)
}
