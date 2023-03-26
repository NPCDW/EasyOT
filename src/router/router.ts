import * as VueRouter from 'vue-router'
import About from '../pages/About.vue'
import Setting from '../pages/Setting.vue'
import Result from '../pages/Result.vue'
// import Screenshot from '../pages/Screenshot.vue'
import Window from '../components/Window.vue'

const routes = [
    { path: '/', redirect: '/window/result' },
    {
        path: '/window',
        component: Window,
        children: [
            {
                path: 'result',
                component: Result,
            },
            {
                path: 'setting',
                component: Setting,
            },
            {
                path: 'info',
                component: About,
            },
        ],
    },
    // { path: '/screenshot', component: Screenshot },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router