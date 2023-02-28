import * as VueRouter from 'vue-router'
import HelloWord from '../components/HelloWord.vue'

const routes = [
    { path: '/', redirect: '/hello' },
    { path: '/hello', component: HelloWord },
]

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router