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

## 免费额度
- 文字识别
    - 腾讯云 [https://cloud.tencent.com/document/product/866/35945](https://cloud.tencent.com/document/product/866/35945)
    - 百度云 [https://cloud.baidu.com/doc/OCR/s/fk3h7xu7h](https://cloud.baidu.com/doc/OCR/s/fk3h7xu7h)
    - SpaceOCR [https://ocr.space/OCRAPI](https://ocr.space/OCRAPI)
- 翻译
    - 腾讯云 [https://cloud.tencent.com/document/product/551/35017](https://cloud.tencent.com/document/product/551/35017)
    - 百度AI [https://fanyi-api.baidu.com/product/113](https://fanyi-api.baidu.com/product/113)
    - 谷歌翻译（免费不限量，但不是官方接入点）

# 功能

* 支持多屏幕不同 `dpi` 下的文字识别，默认快捷键 `F4`
* 支持划词翻译，默认快捷键 `F2` ，先用鼠标选中一段文字，然后按下快捷键，会弹窗进行翻译

# 说明

多屏幕文字识别：只会对鼠标所在的屏幕进行截图

如何取消截图？按 `ESC` 或 单击鼠标右键即可

划词（屏幕取词）是采用模拟发送 `Ctrl+C` ，然后再从剪切板取词

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
