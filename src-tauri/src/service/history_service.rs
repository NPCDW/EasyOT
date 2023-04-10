use crate::db::history::{history_mapper, history_dto::HistoryDto};
use crate::entity::response_result::ResponseResult;
use crate::entity::table_info::TableInfo;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct ListQuery {
    page_number: u64,
    page_size: u64,
    cloud: Option<String>,
}

#[tauri::command]
pub async fn list_history(query: ListQuery) -> ResponseResult<TableInfo<HistoryDto>> {
    let count = match history_mapper::count() {
        Ok(res) => res,
        Err(e) => {
            return ResponseResult::error_msg(e.to_string());
        }
    };
    if count <= 0 {
        return ResponseResult::ok_data(TableInfo::<HistoryDto>::new(count, vec![]));
    }
    let list = match history_mapper::list(query.page_number, query.page_size) {
        Ok(res) => res,
        Err(e) => {
            return ResponseResult::error_msg(e.to_string());
        }
    };
    ResponseResult::ok_data(TableInfo::new(count, list))
}

#[tauri::command]
pub async fn insert_history(info: HistoryDto) -> ResponseResult<i64> {
    match history_mapper::insert(info) {
        Ok(_) => ResponseResult::ok(),
        Err(e) => ResponseResult::error_msg(e.to_string())
    }
}
