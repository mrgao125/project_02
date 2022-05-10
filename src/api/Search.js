import request from '@/utils/request'

// 热搜关键字请求
export const hotSearch = params => request({
    url: '/search/hot',
    params
})

// 搜索请求
export const SearchResultList = params => request({
    url: '/cloudsearch',
    params
})