use chrono::prelude::*;
use sea_query::{Expr, Iden, Query, SqliteQueryBuilder, Func, Order};
use sea_query_rusqlite::RusqliteBinder;

use crate::{db::history::history_dto::{HistoryDto}, db::db_init::DB_CONN_POOL};

pub enum HistoryDtoFields {
    Table, Id, CreateTime, ImageData, OcrText, TranslateText, Cloud
}

impl Iden for HistoryDtoFields {
    fn unquoted(&self, s: &mut dyn std::fmt::Write) {
        write!(s, "{}",
            match self {
                Self::Table => "history",
                Self::Id => "id",
                Self::CreateTime => "create_time",
                Self::ImageData => "image_data",
                Self::OcrText => "ocr_text",
                Self::TranslateText => "translate_text",
                Self::Cloud => "cloud",
            }
        ).unwrap();
    }
}

fn row_to_entity(row: &rusqlite::Row) -> Result<HistoryDto, rusqlite::Error> {
    let create_time: String = row.get("create_time")?;
    Ok(HistoryDto {
        id: row.get("id")?,
        create_time: Some(NaiveDateTime::parse_from_str(&create_time, "%Y-%m-%d %H:%M:%S").unwrap()),
        image_data: row.get("image_data")?,
        ocr_text: row.get("ocr_text")?,
        translate_text: row.get("translate_text")?,
        cloud: row.get("cloud")?,
    })
}

pub fn count() -> Result<usize, Box<dyn std::error::Error>> {
    let (sql, params) = Query::select()
        .from(HistoryDtoFields::Table)
        .expr(Func::count(Expr::col(HistoryDtoFields::Id)))
        .build_rusqlite(SqliteQueryBuilder);

    let conn = DB_CONN_POOL.get()?;
    let mut stmt = conn.prepare(sql.as_str())?;
    let mut rows = stmt.query(&*params.as_params())?;
    let row = rows.next()?.unwrap();
    Ok(row.get(0)?)
}

pub fn list(page_number: u64, page_size: u64) -> Result<Vec<HistoryDto>, Box<dyn std::error::Error>> {
    let (sql, params) = Query::select()
        .columns([
            HistoryDtoFields::Id,
            HistoryDtoFields::CreateTime,
            HistoryDtoFields::ImageData,
            HistoryDtoFields::OcrText,
            HistoryDtoFields::TranslateText,
            HistoryDtoFields::Cloud,
        ])
        .from(HistoryDtoFields::Table)
        .order_by(HistoryDtoFields::CreateTime, Order::Desc)
        .limit(page_size).offset((page_number - 1) * page_size)
        .build_rusqlite(SqliteQueryBuilder);

    let conn = DB_CONN_POOL.get()?;
    let mut stmt = conn.prepare(&sql)?;
    let rows = stmt.query_map(&*params.as_params(), row_to_entity)?;
    let mut result = vec![];
    for item in rows {
        result.push(item?);
    }
    Ok(result)
}

pub fn insert(history_dto: HistoryDto) -> Result<i64, Box<dyn std::error::Error>> {
    let (sql, params) = Query::insert()
        .into_table(HistoryDtoFields::Table)
        .columns([
            HistoryDtoFields::ImageData,
            HistoryDtoFields::OcrText,
            HistoryDtoFields::TranslateText,
            HistoryDtoFields::Cloud,
        ])
        .values_panic([
            history_dto.image_data.into(),
            history_dto.ocr_text.into(),
            history_dto.translate_text.into(),
            history_dto.cloud.into(),
        ])
        .build_rusqlite(SqliteQueryBuilder);

    let conn = DB_CONN_POOL.get()?;
    conn.execute(&sql, &*params.as_params())?;
    Ok(conn.last_insert_rowid())
}
