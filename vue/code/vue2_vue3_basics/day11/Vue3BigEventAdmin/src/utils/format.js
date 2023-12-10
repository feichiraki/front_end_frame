import { dayjs } from 'element-plus'
import axios from 'axios'

// 格式化日期
export const formatDate = (date) =>
  dayjs(date).format('YYYY年MM月DD日 hh:mm:ss')

// 格式化图片： img网络地址 => file对象
// 将网络图片地址转换为File对象
export const imageUrlToFile = async (url, fileName) => {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
