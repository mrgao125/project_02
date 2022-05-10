<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="lightgray"
      placeholder="请输入搜索关键词"
      @input="inputChange"
    />
    <!-- 搜索下的容器 -->
    <div class="search_wrap" v-if="this.SearchList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词的容器 -->
      <div class="hot_name_wrap">
        <!-- 热搜关键字 -->
        <span 
        class="hot_item" 
        v-for="(obj,index) in hotWords" 
        :key="index"
        @click="fn(obj.first)"
        >
        {{obj.first}}
        </span>
      </div>
     </div>


      <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">搜索结果</p>
      <!-- 搜索结果的容器 -->
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
        <SongItem
        v-for="SongsObj in SearchList"
        :key="SongsObj.id"
        :name="SongsObj.al.name"
        :author="SongsObj.ar[0].name"
        :songsId="SongsObj.id"
        >
        </SongItem>
      </van-list>
     </div>

    

  </div>
</template>

<script>
// 铺设关键字
// 铺设搜索结果
// 展示搜索结果
// 搜索触底后，展示下一页数据 van-list 监测触底执行onload事件

import {hotSearchAPI,SearchResultListAPI} from '@/api/index'

import SongItem from '@/components/SongItem.vue'

export default {
  name:'Search',
  data() {
        return {
          value: '',
          hotWords:[], // 热搜关键字
          SearchList:[],  // 搜索结果
          loading: false, // 控制加载状态，触底后才会触发onload方法
          finished: false, // 未加载全部，(如果设置为true，底部就不会执行onload,代表全部加载完成)
          page:1,   // 当前搜索结果的页面
          timer:null
   }
  },
  async created(){
    // 请求热搜关键字
    const res = await hotSearchAPI()
    console.log(res)
    this.hotWords = res.data.result.hots

  },
  methods:{
    async getListFn(){
      // 发起搜索请求，返回结果
      return await SearchResultListAPI({
        keywords:this.value,
        limit:20,
        offset: (this.page - 1) * 20  //接口文档固定公式
      })
    },
    async fn(val){
      this.page = 1  // 点击重新获取第一页数据
      this.finished = false   // 当点击的时候，finished 初始化改为false
      this.value = val  // 把关键词赋予给搜索框
      const res = await this.getListFn()
      console.log(res)
      this.SearchList = res.data.result.songs
      this.loading = false  // 加载完毕改为false
    
    },
    async inputChange(){ // 监测输入框值改变
      // 防抖功能 计时n秒，最后一次执行，如果再次触发，重新计时  解决浏览器频繁发送请求
      // 效果：用户在n秒内不触发这个事件了
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(async ()=>{
        this.page = 1  // 输入框发生改变的时候，获取第一页数据 修复页面bug  network中提示信息
        this.finished = false   // 输入框改变，finished 初始化改为false
        if(this.value.trim().length === 0){
        // 如果搜索关键字为空以及去掉空格，阻止发送网络请，直接return 
        this.SearchList = []
        return 
        }
        const res = await this.getListFn()
        if(res.data.result.songs === undefined) {
          this.SearchList = []
          return
        }
        console.log(res)
        this.SearchList = res.data.result.songs

        this.loading = false  // 加载完毕改为false
      },900)
      
    },
    async onLoad(){// 触底事件，加载下一页数据，内部会自动把loading 改为true
      this.page++;
      const res = await this.getListFn()
      if(res.data.result.songs === undefined) {
        this.finished = true  // 只有一页数据的情况，finished设置为true不会触发onLoad函数
        this.loading = false // 保证数据更新完毕，下一次还能触发onLoad
        return
      }
      this.SearchList = [...this.SearchList,...res.data.result.songs]  // 合并数据
    }
  },
   components:{SongItem},
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>