// api 文件下的各个请求模块js，都统一来到index.js 再向往导出
import { recommendMusic, newMusic } from './Home'

import { hotSearch, SearchResultList } from './Search'

import { getSongById, getLyricById } from './Play'

export const recommendMusicAPI = recommendMusic // 请求推荐歌单的方法导出

export const newMusicAPI = newMusic // 请求最新歌单的方法导出

export const hotSearchAPI = hotSearch // 请求热搜关键字列表

export const SearchResultListAPI = SearchResultList // 搜索请求

export const getSongByIdAPI = getSongById // 歌曲--播放地址

export const getLyricByIdAPI = getLyricById // 歌曲--歌词数据