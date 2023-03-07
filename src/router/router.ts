import * as VueRouter from 'vue-router'
import HelloWord from '../pages/HelloWord.vue'
import Result from '../pages/Result.vue'
import Screenshot from '../pages/Screenshot.vue'
import Window from '../components/Window.vue'

const routes = [
    { path: '/', redirect: '/window/info' },
    {
        path: '/window',
        component: Window,
        children: [
            {
                path: 'setting',
                component: HelloWord,
            },
            {
                path: 'result',
                component: Result,
            },
            {
                path: 'info',
                component: HelloWord,
            },
        ],
    },
    { path: '/screenshot', component: Screenshot },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router