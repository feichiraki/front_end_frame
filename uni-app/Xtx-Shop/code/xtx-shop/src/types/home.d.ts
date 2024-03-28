import { GoodsItem } from './global'
// types/home.d.ts
/** 首页-广告区域数据类型 */
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}

/** 首页-前台分类区域数据类型 */
export interface CategroyItem {
  /** 分类id */
  id: string
  /** 图标链接 */
  icon: string
  /** 分类名称 */
  name: string
}

/** 首页-热门推荐区域数据类型 */
export interface HotItem {
  /** id */
  id: string
  /** 图片集合 */
  pictures: string[]
  /** 标题 */
  title: string
  /** 推荐说明  */
  alt: string
  /** 跳转地址 */
  target: string
  /** 推荐类型 */
  type: number
}

/** 猜你喜欢-商品类型 */
export type GuessItem = GoodsItem
