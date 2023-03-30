use std::io::{BufRead, BufReader, Write};
use std::path::{Path, PathBuf};
use std::{fs, fs::File};

#[allow(dead_code)]
pub fn read_file(path: &Path) -> Result<String, Box<dyn std::error::Error>> {
    let file: File = File::open(path)?;
    let mut res = String::default();
    let lines = BufReader::new(file).lines();
    for line in lines {
        if let Ok(x) = line {
            res.push_str(&x);
            res.push('\n');
        }
    }
    Ok(res)
}

#[allow(dead_code)]
pub fn write_file(path: &Path, text: &str) {
    let mut file = File::create(path).unwrap_or_else(|e| {
        panic!("Could not create file: {:?}", e);
    });
    file.write_all(text.as_bytes()).unwrap_or_else(|e| {
        panic!("Write file: {:?}", e);
    });
}

#[allow(dead_code)]
pub fn create_dir(path: &Path) {
    fs::create_dir_all(path).unwrap_or_else(|e| {
        panic!(
            "Could not create file directory: {}, {:?}",
            &path.display(),
            e
        )
    });
}

#[allow(dead_code)]
pub fn list_dir(path: &Path) -> Vec<PathBuf> {
    let mut list = Vec::default();
    for child in fs::read_dir(path).unwrap() {
        list.push(child.unwrap().path());
    }
    list
}
