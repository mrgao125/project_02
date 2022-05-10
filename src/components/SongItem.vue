<template>
  <div>
      <van-cell 
        :title="name" 
        :label="author + ' - '+ name" 
        center
      >
        <template #right-icon>
          <van-icon name="play-circle-o" size="0.5rem" @click="playFn"/>
        </template>
      </van-cell>
  </div>
</template>

<script>
 export default {
    name:'SongItem',
    props:{
      name:String ,// 歌名
      author:String,  // 作者
      songsId:Number   // 标记这首歌曲，为将来跳转播放页作准备
    },
    methods:{
        playFn(){
            this.$router.push({
                path:'/play',
                query:{
                    id:this.songsId  // 歌曲id ,通过路由跳转传递过去
                }
            })
        }
    }

 }
</script>

<style scoped>
/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>