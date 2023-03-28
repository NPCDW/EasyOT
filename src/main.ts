import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import App from './App.vue'
import { useConfig } from './store/config'
import { useRuntimeConfig } from './store/runtimeConfig'
import router from './router/router'
import { createPinia } from 'pinia'
import i18n from './i18n'
import {type LocaleLangType} from './i18n/locale'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

let config = await useConfig().refresh_config()
await useRuntimeConfig().refreshRuntimeConfig()

i18n.global.locale.value = (config?.common.language! as LocaleLangType)

app.use(i18n)

app.mount('#app')
