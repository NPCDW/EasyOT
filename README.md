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

## Free Quota
- OCR
    - Tencent Cloud [https://cloud.tencent.com/document/product/866/35945](https://cloud.tencent.com/document/product/866/35945)
    - Baidu Cloud [https://cloud.baidu.com/doc/OCR/s/fk3h7xu7h](https://cloud.baidu.com/doc/OCR/s/fk3h7xu7h)
    - SpaceOCR [https://ocr.space/OCRAPI](https://ocr.space/OCRAPI)
- Translate
    - Tencent Cloud [https://cloud.tencent.com/document/product/551/35017](https://cloud.tencent.com/document/product/551/35017)
    - Baidu AI [https://fanyi-api.baidu.com/product/113](https://fanyi-api.baidu.com/product/113)
    - Google Translate (free and unlimited, but unofficial endpoint)

## Features

* Support text recognition on multiple screens and different dpi, the default shortcut key is `F4`
* Support word translation, the default shortcut key is `F2`, first select a piece of text with the mouse, and then press the shortcut key, a window will pop up for translation

## IMPORTANT

Multi-screen capture: only the screen where the mouse is placed will be captured

How to cancel screenshot? Press `ESC` or right-click

Marking words (taking words from the screen) is to send `Ctrl+Insert` by analog, and then get words from the clipboard

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
