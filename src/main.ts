import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import App from './App.vue'
import { get_config } from './store/config'
import { registerDefault } from './util/global-shortcut'
import router from './router/router'

const app = createApp(App)

app.use(router)
app.mount('#app')

await registerDefault();

await get_config();
