import { createRouter } from 'vue-router'

function removeQueryParams(to) {
    if (Object.keys(to.query).length)
        return { path: to.path, query: {}, hash: to.hash }
}

function removeHash(to) {
    if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

const UserDetails = {
    template: `...`,
    beforeRouteEnter(to, from) {
        // 在渲染该组件的对应路由被验证前调用
        // 不能获取组件实例 `this` ！
        // 因为当守卫执行时，组件实例还没被创建！
    },
    beforeRouteUpdate(to, from) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
        // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
    },
    beforeRouteLeave(to, from) {
        // 在导航离开渲染该组件的对应路由时调用
        // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
    },
}

// 路由懒加载
const About = () => import('../view/About.vue')

const routes = [
    {
        path: '/users/:id',
        component: UserDetails,
        // 只在进入路由时触发，不会在params、query、hash改变时触发
        beforeEnter: (to, from, next) => {
            return false;   // 取消导航
        },
        // 元信息
        meta: { requireAuth: true }
    },
    {
        path: '/about',
        component: About,
        beforeEnter: [removeQueryParams, removeHash],

    }
]

const router = createRouter({});

// 全局路由守卫
// to 即将要进入的目标，from 当前导航正要离开的目标
router.beforeEach((to, from) => {
    return false;   // 返回false表示取消导航
})
// 当前路由导航被中断，开启新导航
router.beforeEach((to, from) => {
    return { name: 'user', params: { username: 'xxyCoder' } }   // 返回router.push内可以传入的参数
})
router.beforeEach((to, from) => {
    // 没有返回或返回true表示导航有效
})
// 监听错误
router.onError(() => { });
// 全局解析守卫
router.beforeResolve(to => { })
// 全局后置钩子
router.afterEach((to, from) => { })