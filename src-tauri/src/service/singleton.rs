use sysinfo::{ProcessExt, System, SystemExt};

pub fn is_app_running() -> bool {
    let mut sys = System::new_all();
    sys.refresh_processes();

    let mut count = 0;
    for (_, process) in sys.processes() {
        if process.name().eq_ignore_ascii_case("easyot.exe") {
            count += 1;
            if count > 1 {
                return true;
            }
        }
    }
    return false;
}