use chrono::{naive::serde::ts_milliseconds_option, NaiveDateTime};
use serde::{Deserialize, Serialize};

#[allow(dead_code)]
#[derive(Debug, Deserialize, Serialize, Clone, Default)]
pub struct HistoryDto {
    pub id: Option<u32>,
    #[serde(with = "ts_milliseconds_option", default)]
    pub create_time: Option<NaiveDateTime>,
    pub image_data: Option<String>,
    pub ocr_text: Option<String>,
    pub translate_text: Option<String>,
    pub cloud: Option<String>,
}