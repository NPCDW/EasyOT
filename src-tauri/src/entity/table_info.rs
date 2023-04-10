use serde::{Deserialize, Serialize};

#[allow(dead_code)]
#[derive(Deserialize, Serialize)]
pub struct TableInfo<T> {
    pub count: usize,
    pub list: Vec<T>,
}

impl<T: Serialize> TableInfo<T> {
    #[allow(dead_code)]
    pub fn new(count: usize, list: Vec<T>) -> TableInfo<T> {
        TableInfo {
            count,
            list,
        }
    }
}