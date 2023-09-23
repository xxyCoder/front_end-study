const User = {
    template: '<div>User {{ $route.params.id }}</div>'
};

const Post = {
    template: '<div>{{ route.params.username }} {{ route.params.postId }}</div>'
}

const School = {
    template: '<div>School</div>'
}

const SchoolProfile = {
    template: '<div>SchoolProfile</div>'
}

const Student = {
    template: '<div>Student</div>'
}

const Page = {
    props: ['id'],
    template: '<div>User {{ id }}</div>'
}

const routes = [
    // 动态字段以冒号开始
    { path: '/user/:id', component: User },
    { path: '/users/:username/posts/:postId', component: Post },
    // 参数中定义正则
    { path: '/:orderId(\\d+)' },    // 仅仅匹配数字
    { path: '/:productName' },   // 匹配其他内容
    // 可重复参数
    { path: '/:chapter+' }, // 匹配 /one, /one/two, /one/two/three ...
    { path: '/:chapter*' }, //匹配 /, /one, /one/two, /one/two/three ...
    // Sensitive和Strict路由配置
    { path: '/user/:username/:id', sensitive: true },   // 大小写敏感
    { path: '/post/:title', strict: true }, // 严格匹配，尾部没有/则不能带上 /
    // 嵌套路由
    {
        path: '/school/:id',
        component: School,
        children: [
            {
                path: 'profile',    // 路径匹配 /school/123/profile
                component: SchoolProfile
            },
            {
                path: '/student',   // 路径匹配 /student
                component: Student
            }
        ]
    },
    // 命名视图
    {
        path: '/',
        components: {   // 与router-view中name属性进行匹配
            default: Home,
            LeftSidebar,
            RightSidebar
        }
    },
    // 嵌套命名视图
    {
        path: '/settings',
        component: UserSettings,
        children: [
            {
                path: 'emails',
                component: UserEmail
            },
            {
                path: 'profile',
                components: {
                    default: UserProfile,
                    helper: UserHelper
                }
            }
        ]
    },
    // 重定向和别名
    { path: '/home1', redirect: '/' },
    { path: '/home2', redirect: { name: 'homepage' } },
    // /search/xxyCoder ===> /search?q=xxyCoder
    { path: '/search/:searchText', redirect: to => { return { path: '/search', query: { q: to.params.searchText } } } },
    // /user/123/post ===> /user/123/profile
    { path: '/users/:id/posts', redirect: to => { return 'profile' } },
    // 别名 访问/home，URL仍然是/home，但是被匹配到/
    { path: '/', alias: '/home' },
    // 嵌套路径使用别名
    {
        path: '/users',
        children: [
            {
                path: '',
                alias: ['/people', 'list']   // 匹配/users   /people     /users/list
            }
        ]
    },
    // 嵌套路由有参数
    {
        path: '/users/:id',
        children: [
            {
                path: "profile",
                alias: ['/:id', ''] // 匹配/users/24    /users/24/profile   /24
            }
        ]
    },
    // 将props传递给组件
    {
        path: '/page/:id',
        component: Page,
        props: true // 布尔模式
    },
    {
        path: '/page/:id',
        components: {
            default: User,
            sidebar: Sidebar,
        },
        props: { default: true, sidebar: false }    // 命名视图
    },
    {
        path: '/page',
        component: Page,
        props: route => ({ query: route.query.q })  // 函数模式，将/page?query=vue的vue传递
    }
]