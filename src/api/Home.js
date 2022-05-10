// 文件名尽量和模块页面统一，方便查找
import request from '@/utils/request'

// 首页 --推荐歌单
export const recommendMusic = params => request({
    url: '/personalized',
    params: params

    // 将来外面传入的params的值可能是对象 {limit:20}
})

// 首页-- 推荐最新音乐

export const newMusic = params => request({
    url: '/personalized/newsong',
    params
})