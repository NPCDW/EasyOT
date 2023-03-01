import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default ({mode}) => {
    const env = loadEnv(mode, process.cwd());
    console.log(mode, env)
    return defineConfig({
        plugins: [
            vue(),
            AutoImport({
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
            }),
            Components({
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        enabledCollections: ['ep'],
                    }),
                ],
            }),
            Icons({
                autoInstall: true,
            }),
        ],
        // development    production
        base: mode === 'development' ? '/' : './',
        // prevent vite from obscuring rust errors
        clearScreen: false,
        // Tauri expects a fixed port, fail if that port is not available
        server: {
            strictPort: true,
        },
        // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
        // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
        // env variables
        envPrefix: ['VITE_', 'TAURI_'],
        build: {
            // Tauri uses Chromium on Windows and WebKit on macOS and Linux
            target: 'chrome110',
            // don't minify for debug builds
            minify: 'esbuild',
            // 为调试构建生成源代码映射 (sourcemap)
            sourcemap: false,
        },
    })
}