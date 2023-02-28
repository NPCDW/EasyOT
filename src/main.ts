import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import App from './App.vue'
import { registerDefault } from './util/global-shortcut.js'

const app = createApp(App)

app.mount('#app')

await registerDefault();