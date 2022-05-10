<template>
  <div>
      <p class="title">推荐歌单456</p>
      <van-row gutter="6">
        <van-col span="8" v-for="obj in reList" :key="obj.id">
          <van-image
            width="100%"
            height="3rem"
            fit="cover"
            :src="obj.picUrl"
          />
          <p class="song_name">{{obj.name}}</p>
        </van-col>
      </van-row>
      <p class="title">最新音乐</p>
      <SongItem 
      v-for="MusicObj in newMusicList"
      :key="MusicObj.id"
      :name="MusicObj.name"
      :author="MusicObj.song.artists[0].name"
      :songsId="MusicObj.id"
      >
      </SongItem>
      
  </div>
</template>

<script>
// 使用van-row 和 van-col 搭建外框布局
// 获取推荐歌单
import {recommendMusicAPI,newMusicAPI} from '@/api/index'
// 引入公共组件
import SongItem from '@/components/SongItem.vue'

export default {
    name:'Home',
    data(){
      return {
        reList:[], // 推荐歌单的数据
        newMusicList:[] // 最新歌单数据
      }
    },
    components:{SongItem},
    async created() {
      const res = await recommendMusicAPI({
        limit:6
      })
      console.log(res)
      this.reList = res.data.result

      const res2 = await newMusicAPI({
        limit:10
      })
      console.log(res2)
      this.newMusicList = res2.data.result
    }
}
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: .3467rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}

</style>