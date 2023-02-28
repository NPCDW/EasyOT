import * as VueRouter from 'vue-router'
import HelloWord from '../components/HelloWord.vue'

const routes = [
    { path: '/', redirect: '/hello' },
    { path: '/hello', component: HelloWord },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

export default router