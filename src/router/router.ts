import * as VueRouter from 'vue-router'
import HelloWord from '../pages/HelloWord.vue'
import Window from '../components/Window.vue'

const routes = [
    { path: '/', redirect: '/window/hello' },
    {
        path: '/window',
        component: Window,
        children: [
            {
                path: 'hello',
                component: HelloWord,
            },
        ],
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

export default router