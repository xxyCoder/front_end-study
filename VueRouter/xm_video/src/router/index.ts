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
        name: 'About',
        children: [
            {
                path: '/detai',
                component: () => import("../components/detail.vue")
            }
        ]
    },
    {
        path: '/',
        component: () => import('../components/root.vue'),
        // 重定向三种形式
        // redirect: "/roots",
        // redirect: {
        //     path: "/root"
        // },
        redirect: to => {
            // return '/root'
            return {
                path: '/root',
                query: {
                    ...to.query,
                    name: 'xxy'
                }
            }
        },
        children: [
            {
                path: 'A',
                components: {
                    // 默认routerview 不带名字
                    default: () => import("../components/A.vue")
                }
            },
            {
                path: "BC",
                components: {
                    // 命名视图
                    B: () => import("../components/B.vue"),
                    C: () => import("../components/C.vue")
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 前置路由守卫
router.beforeEach((to, from, next) => {
    next();
})

export default router