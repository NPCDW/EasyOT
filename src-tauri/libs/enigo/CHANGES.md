# Unreleased

## Changed
- Windows: `mouse_scroll_y` with a positive number scrolls down just like on the other platforms
- Windows: replaced `winapi` with the official `windows` crate
- Rust: Using Rust version 2021
- Rust: Minimum supported Rust version (MSRV) is set in Cargo.toml
- Rust: MSRV is 1.64
- macOS, Windows: Moved the functions `main_display_size` and `mouse_location` from `Enigo` to `MouseControllable`

## Added
- DSL: Additional ParseError variants to give better feedback what the problem was
- DSL: Additional keys
- All: Added support for F10-F20
- CI/CD: Github Workflows to make sure the code builds and the tests pass
- Traits: Added the functions `main_display_size` and `mouse_location` to `MouseControllable`
- Linux: Implemented the functions `main_display_size` and `mouse_location` for `MouseControllable`

## Fixed
- Windows: panicked at `cannot transmute_copy if U is larger than T` (https://github.com/enigo-rs/enigo/issues/121)
- Windows: Inconsistent behavior between the `mouse_move_relative` and `mouse_move_to` functions (https://github.com/enigo-rs/enigo/issues/91)
- Windows, macOS: Stop panicking when `mouse_down` or `mouse_up` is called with either of `MouseButton::ScrollUp`, `MouseButton::ScrollDown`, `MouseButton::ScrollLeft`, `MouseButton::ScrollRight` and instead scroll
- Windows: Always use key codes to be layout independent. Only use scan codes for `Key::Layout` (Fixes https://github.com/enigo-rs/enigo/issues/99, https://github.com/enigo-rs/enigo/issues/84)
- macOS: `key_click` no longer triggers a segmentation fault when called with `Key::Layout` argument (Fixes https://github.com/enigo-rs/enigo/issues/124)