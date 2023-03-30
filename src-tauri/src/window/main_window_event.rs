use crate::config::config;
use crate::util::debounce::debounce_forever;
use std::sync::mpsc::Sender;
use std::time::Duration;
use tauri::WindowEvent;
use tauri::{AppHandle, Manager, PhysicalPosition, PhysicalSize};

pub fn event_trigger(
    event: WindowEvent,
    app_handle: &AppHandle,
    resized_debounce: &Sender<(AppHandle, PhysicalSize<u32>)>,
    moved_debounce: &Sender<PhysicalPosition<i32>>,
) {
    match event {
        tauri::WindowEvent::Resized(size) => {
            resized_debounce
                .send((app_handle.app_handle(), size))
                .unwrap();
        }
        tauri::WindowEvent::Moved(pos) => {
            moved_debounce.send(pos).unwrap();
        }
        _ => {}
    }
}

pub fn create_resized_debounce() -> Sender<(AppHandle, PhysicalSize<u32>)> {
    debounce_forever(
        |(app_handle, size): (AppHandle, PhysicalSize<u32>)| {
            // println!("resized debounce: {:?}", size);
            let mut config = config::get_config();
            let mut main = config.window.get_mut("main").unwrap();
            if (main.width != size.width || main.height != size.height) && size.height > 100 {
                if app_handle
                    .get_window("main")
                    .unwrap()
                    .is_maximized()
                    .unwrap()
                {
                    main.maximized = true
                } else {
                    main.maximized = false;
                    main.width = size.width;
                    main.height = size.height;
                }
                config::save_config(config);
            }
        },
        Duration::from_millis(1000),
    )
}

pub fn create_moved_debounce() -> Sender<PhysicalPosition<i32>> {
    debounce_forever(
        |pos: PhysicalPosition<i32>| {
            // println!("moved debounce: {:?}", pos);
            let mut config = config::get_config();
            let mut main = config.window.get_mut("main").unwrap();
            if (main.x != pos.x || main.y != pos.y) && pos.x > -32000 {
                main.x = pos.x;
                main.y = pos.y;
                config::save_config(config);
            }
        },
        Duration::from_millis(1000),
    )
}
