use std::io;
use winreg::enums::*;
use winreg::RegKey;

#[allow(dead_code)]
pub fn create_dir(dir: &str) -> Result<(), io::Error> {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    hkcu.create_subkey(dir)?;
    Ok(())
}

#[allow(dead_code)]
pub fn get(dir: &str, key: &str) -> Result<String, io::Error> {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let reg_key = hkcu.open_subkey(dir)?;
    let value = reg_key.get_value(key)?;
    Ok(value)
}

#[allow(dead_code)]
pub fn set(dir: &str, key: &str, value: &str) -> Result<(), io::Error> {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let reg_key = hkcu.open_subkey(dir)?;
    reg_key.set_value(key, &value)?;
    Ok(())
}

#[allow(dead_code)]
pub fn delete(dir: &str, key: &str) -> Result<(), io::Error> {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let reg_key = hkcu.open_subkey(dir)?;
    reg_key.delete_subkey(key)?;
    Ok(())
}
