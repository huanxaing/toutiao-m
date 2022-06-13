import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: () =>
        import ('@/views/Login.vue')
}, {
    path: '/',
    name: 'home',
    redirect: '/shouye',
    component: () =>
        import ('@/views/Home'),
    children: [{
        path: '/shouye',
        name: 'shouye',
        meta: { noCache: false, keepAlive: true },
        component: () =>
            import ('@/views/Shouye')
    }, {
        path: '/wenda',
        name: 'wenda',
        component: () =>
            import ('@/views/Wenda')
    }, {
        path: '/shipin',
        name: 'shipin',
        component: () =>
            import ('@/views/Shipin')
    }, {
        path: '/wode',
        name: 'wode',
        component: () =>
            import ('@/views/Wode')
    }]

}, {
    path: '/search',
    name: 'search',
    component: () =>
        import ('@/views/Search/search.vue')
}, {
    path: '/article/:id',
    name: 'article',
    component: () =>
        import ('@/views/Article/article.vue'),
    props: true // 开启路由传参，说白了就是把路由的参数映射到组件的props里
}]

const router = new VueRouter({
        routes
    })
    // 挂载路由导航守卫
    // router.beforeEach((to, from, next) => {
    //     // to 将要访问的路径; from 代表从哪个路径跳转而来;next 是一个函数,表示放行。next() 放行  next('/login')  强制跳转
    //     // 如果客户是访问登录界面 就直接放行
    //     if (to.path === '/login') return next()
    //         // 获取 token
    //     const tokend = window.localStorage.getItem('token')
    //         // 如果没有 token 值就强制跳转到登录界面
    //     if (!tokend) return next('/login')
    //     next()
    // })

export default router