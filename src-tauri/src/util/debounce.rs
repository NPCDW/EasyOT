use std::fmt::Debug;
use std::sync::mpsc::{Sender, channel};
use std::thread;
use std::time::Duration;

#[allow(dead_code)]
pub fn debounce<T: Send + Debug + 'static>(
    f: impl Fn(&T) + Send + 'static,
    debounce_time: Duration,
) -> Sender<T> {
    let (tx, rx) = channel::<T>();
    thread::spawn(move || {
        let mut last_value = None;
        loop {
            match rx.recv_timeout(debounce_time) {
                Ok(value) => {
                    last_value = Some(value);
                }
                Err(_) => {
                    if last_value.is_some() {
                        f(last_value.as_ref().unwrap());
                    }
                    break;
                }
            }
        }
    });
    tx
}

#[cfg(test)]
mod debounce_test {
    use std::time::Duration;

    use super::*;

    #[test]
    fn debounce_test() {
        let mut tx = debounce(|x| {
            println!("debounce: {:?}", x);
        }, Duration::from_millis(500));
        tx.send(1).unwrap();
        tx.send(2).unwrap();
        tx.send(3).unwrap();
        thread::sleep(Duration::from_millis(600));
        let res = tx.send(4);
        if res.is_err() {
            let new_tx = debounce(|x| {
                println!("debounce: {:?}", x);
            }, Duration::from_millis(500));
            tx = new_tx;
            tx.send(4).unwrap();
        }
        tx.send(5).unwrap();
        thread::sleep(Duration::from_millis(400));
        tx.send(6).unwrap();
        thread::sleep(Duration::from_millis(400));
        tx.send(7).unwrap();
        thread::sleep(Duration::from_millis(2000));
    }
}