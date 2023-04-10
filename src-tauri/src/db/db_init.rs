use std::path::Path;

use crate::config::config;
use crate::util::file_util;

lazy_static! {
    #[derive(Debug)]
    pub static ref DB_VERSION_LIST: Vec<String> = {
        let mut list = vec![];
        list.push("2023-04-10-01".to_string());
        list
    };
    pub static ref DB_CONN_POOL: r2d2::Pool<r2d2_sqlite::SqliteConnectionManager> = {
        log::info!("Init DB Connect Pool");
        let config = config::get_config();
        let db_filepath = Path::new(&config.db.filepath);
        let manager = r2d2_sqlite::SqliteConnectionManager::file(db_filepath);
        let pool = r2d2::Pool::builder()
            .max_size(config.db.max_pool_size)
            .build(manager).unwrap_or_else(|e| {
                panic!("创建线程池失败，{:?}", e);
            });
        log::info!("Finish Init DB Connect Pool");
        pool
    };
}

pub fn init() {
    init_file();

    migrate_db().unwrap_or_else(|e| {
        panic!("Migrate DB FAIL, {:?}", e)
    });
}

fn init_file() {
    let config = config::get_config();
    let filepath = &config.db.filepath;
    let db_filepath = Path::new(&filepath);
    file_util::create_file(db_filepath);
}

fn migrate_db() -> Result<(), rusqlite::Error> {
    log::info!("Migrate DB");
    let conn = DB_CONN_POOL.get().unwrap_or_else(|e| {
        panic!("数据库连接池获取连接失败，{:?}", e)
    });
    let mut stmt = conn.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'version'")?;
    let mut rows = stmt.query([])?;
    let row = rows.next()?.unwrap_or_else(|| {
        panic!("第一行数据为空")
    });
    let exist: i64 = row.get(0)?;
    let current_version: String;
    if exist <= 0 {
        current_version = "".to_string();
    } else {
        let mut stmt = conn.prepare("SELECT version FROM version order by id desc limit 1")?;
        let mut rows = stmt.query([])?;
        let row = rows.next()?.unwrap();
        current_version = row.get(0)?;
    }
    if current_version[..] == DB_VERSION_LIST.last().unwrap()[..] {
        log::info!("DB version is match, current version {}", &current_version);
        return Ok(());
    }
    log::info!("DB version require {}, Current version is {}, start upgrade db", &DB_VERSION_LIST.last().unwrap(), &current_version);
    let mut dir = std::env::current_dir().unwrap_or_else(|e| {
        panic!("获取程序目录失败：{:?}", e);
    });
    dir.push("db/");
    for item in &*DB_VERSION_LIST {
        if current_version[..] < item[..] {
            let sql_file_path = dir.join(format!("{}.sql", item));
            let sql = file_util::read_file(&sql_file_path).unwrap_or_else(|e| {
                panic!("读取SQL文件失败，文件地址：{}，错误：{:?}", &sql_file_path.display(), e);
            });
            conn.execute_batch(&sql)?;
        }
    }
    log::info!("DB upgrade finished");
    Ok(())
}