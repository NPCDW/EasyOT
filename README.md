# EasyOT

!["https://www.rust-lang.org/"](https://img.shields.io/badge/rust-1.67.1-f17d3e.svg)
!["https://tauri.app/"](https://img.shields.io/badge/tauri-1.2-24c8db.svg)
!["https://vitejs.dev/"](https://img.shields.io/badge/vite-4.1-646cff.svg)
!["https://vuejs.org/"](https://img.shields.io/badge/vuejs-3-45c089.svg)
!["https://element-plus.org/"](https://img.shields.io/badge/element_plus-2.0-409eff.svg)

[简体中文](README-zh.md)

Use global shortcuts to easily perform text recognition and machine translation (requires cloud service provider)

This project is rewritten from [NPCDW/WpfTool](https://github.com/NPCDW/WpfTool), but the project is no better than WpfTool

|                    | WpfTool         | EasyOT   |
| ------------------ | --------------- | -------- |
| Memory usage (background)   | 3-4M            | 8-16M    |
| Memory usage (single window) | 95M             | 110-140M |
| Screenshot speed           | 200ms           | 1s       |

## Development
Development
```shell
cargo tauri dev
```
build
```shell
cargo tauri build
```

## Recommended IDE Setup

- VS Code
- Tauri Plugin
- rust-analyzer Plugin
- Better TOML Plugin
- Volar Plugin
- TypeScript Vue Plugin
- Tailwind CSS Plugin

## Thanks

- [rust-lang](https://www.rust-lang.org/)
- [tauri-app](https://tauri.app/)
- [vitejs](https://vitejs.dev/)
- [vuejs](https://vuejs.org/)
- [element-plus](https://element-plus.org/)
- [enigo-rs/enigo](https://github.com/enigo-rs/enigo)
- [robmikh/screenshot-rs](https://github.com/robmikh/screenshot-rs)
- [screenshots](https://crates.io/crates/screenshots)
