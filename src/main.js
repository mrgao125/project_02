import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from './router/index'

import '@/mobile/flexible.js' // 页面适配
import '@/styles/reset.css' // 初始化样式
// 引入Tabbar组件
import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, Icon, Search, List } from 'vant'

Vue.use(Icon)
Vue.use(Cell) // 引入cell单元格组件
Vue.use(VanImage)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Col)
Vue.use(Row)
Vue.use(Search)
Vue.use(List)

// 目标：封装网络请求
// 测试封装的API方法
/* import { recommendMusicAPI } from '@/api'
async function fn() {
    const res = await recommendMusicAPI() // api方法原地会得到，axios请求在原地的Promise对象(里面有一个ajax请求)
    console.log(res)
}
fn() */


Vue.config.productionTip = false

// 完成vant组件库自动适配

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')