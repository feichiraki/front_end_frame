import type { PageParams, PageResult, GoodsItem } from './global'

/** 推荐模块-请求参数类型 */
export type HotParams = PageParams & {
  /**Tab 项的 id，默认查询全部 Tab 项的第 1 页数据 */
  subType?: string
}

/** 推荐模块-返回数据类型 */
export interface HotResult {
  /**
   * id信息
   */
  id: string
  /**
   * 活动标题
   */
  title: string
  /**
   * 活动图片
   */
  bannerPicture: string
  /**
   * 子类选项集合
   */
  subTypes: SubType[]
}

/** 子类选项集合类型 */
interface SubType {
  /** 子类id */
  id: string
  /** 子类标题 */
  title: string
  /** 子类对应的商品集合 */
  goodsItems: PageResult<GoodsItem>
}
