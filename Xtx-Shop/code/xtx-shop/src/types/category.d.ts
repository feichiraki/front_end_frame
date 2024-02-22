// 商品分类类型声明
import { GoodsItem } from './global'
/**
 * 一级分类项
 */
export interface CategoryTopItem {
  /**
   * 二级分类集合
   */
  children: CategoryChildItem[]
  /**
   * 一级分类id
   */
  id: string
  /**
   * 一级分类图片集
   */
  imageBanners: string[]
  /**
   * 一级分类名称
   */
  name: string
  /**
   * 一级分类图片
   */
  picture: string
}

/**
 * 二级分类项
 */
export interface CategoryChildItem {
  /**
   * 商品集合
   */
  goods: GoodsItem[]
  /**
   * 二级分类id
   */
  id: string
  /**
   * 二级分类名称
   */
  name: string
  /**
   * 二级分类图片
   */
  picture: string
}
