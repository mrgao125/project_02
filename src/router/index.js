import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Play from '@/views/Play'
import Search from '@/views/Search'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/layout'

    },
    {
        path: '/layout',
        redirect: '/layout/home', // 马上重定向到二级路由
        component: Layout,
        children: [{
                path: 'home',
                component: Home,
                meta: {
                    title: '首页'
                }
            },
            {
                path: 'search',
                component: Search,
                meta: {
                    title: '搜索'
                }
            }
        ]
    },
    {
        path: '/play',
        component: Play
    }
]

const router = new VueRouter({
    routes
})
router.afterEach((to, from) => {
    document.title = '我的网易云音乐'
})

export default router