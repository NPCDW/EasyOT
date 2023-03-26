import { createApp } from 'vue'
// import { createI18n } from 'vue-i18n'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import App from './App.vue'
import { useConfig } from './store/config'
import { useRuntimeConfig } from './store/runtimeConfig'
import router from './router/router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

await useConfig().refresh_config()
await useRuntimeConfig().refreshRuntimeConfig()

// const i18n = createI18n({
//     // something vue-i18n options here ...
// })
// app.use(i18n)

app.mount('#app')
