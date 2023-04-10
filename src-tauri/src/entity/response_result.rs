use serde::{Deserialize, Serialize};

#[allow(dead_code)]
#[derive(Deserialize, Serialize)]
pub struct ResponseResult<T> {
    pub code: u32,
    pub message: String,
    pub data: Option<T>,
}

impl<T: Serialize> ResponseResult<T> {
    #[allow(dead_code)]
    pub fn ok() -> ResponseResult<T> {
        ResponseResult::<T> {
            code: 20000,
            message: "success".to_string(),
            data: None,
        }
    }

    #[allow(dead_code)]
    pub fn ok_data(data: T) -> ResponseResult<T> {
        ResponseResult::<T> {
            code: 20000,
            message: "success".to_string(),
            data: Some(data),
        }
    }
    
    #[allow(dead_code)]
    pub fn error_msg(message: String) -> ResponseResult<T> {
        ResponseResult::<T> {
            code: 50000,
            message,
            data: None,
        }
    }
}