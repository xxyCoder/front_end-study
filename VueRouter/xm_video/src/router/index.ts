import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        component: () => import('../components/login.vue'),
        name: 'Login'
    }, 
    {
        path: '/about/:id',
        component: () => import('../components/about.vue'),
        name: 'About'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router