<template>
  <div>
    <van-nav-bar
    :title="activeTitle"
    fixed
    />
    <div class="main">
       <!-- 二级路由 挂载点-->
      <router-view></router-view>
    </div>
    
    <van-tabbar  route>
      <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/layout/search" icon="search">搜索页</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    name:'Layout',
    data() {
      return {
        // 顶部导航要显示的内容
        activeTitle:this.$route.meta.title  // 网页默认打开时候的标题
      }
    },
    watch:{
      $route(){
        this.activeTitle = this.$route.meta.title // 提取切换后的路由信息对象里的title
      }
    }
}
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}

</style>