# EasyOT

!["https://www.rust-lang.org/"](https://img.shields.io/badge/rust-1.67.1-f17d3e.svg)
!["https://tauri.app/"](https://img.shields.io/badge/tauri-1.2-24c8db.svg)
!["https://vitejs.dev/"](https://img.shields.io/badge/vite-4.1-646cff.svg)
!["https://vuejs.org/"](https://img.shields.io/badge/vuejs-3-45c089.svg)
!["https://element-plus.org/"](https://img.shields.io/badge/element_plus-2.0-409eff.svg)

使用全局快捷键方便的进行文本识别和机器翻译（需借助云服务商）

项目重写自 [NPCDW/WpfTool](https://github.com/NPCDW/WpfTool)，但是该项目并没有比 WpfTool 更优秀

|                    | WpfTool         | EasyOT   |
| ------------------ | --------------- | -------- |
| 内存占用（后台）   | 3-4M            | 8-16M    |
| 内存占用（单窗口） | 95M             | 110-140M |
| 截图速度           | 200ms           | 1s       |

## 开发
开发
```shell
cargo tauri dev
```
构建
```shell
cargo tauri build
```

## 推荐 IDE

- VS Code
- Tauri Plugin
- rust-analyzer Plugin
- Better TOML Plugin
- Volar Plugin
- TypeScript Vue Plugin
- Tailwind CSS Plugin

## 感谢

- [rust-lang](https://www.rust-lang.org/)
- [tauri-app](https://tauri.app/)
- [vitejs](https://vitejs.dev/)
- [vuejs](https://vuejs.org/)
- [element-plus](https://element-plus.org/)
- [enigo-rs/enigo](https://github.com/enigo-rs/enigo)
- [robmikh/screenshot-rs](https://github.com/robmikh/screenshot-rs)
- [screenshots](https://crates.io/crates/screenshots)
