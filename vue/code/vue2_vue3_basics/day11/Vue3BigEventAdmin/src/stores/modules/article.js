import { defineStore } from 'pinia'
import { ref } from 'vue'
import { artGetChannelService } from '@/api/article'
import { artAddChannelService } from '@/api/article'

export const useArticleStore = defineStore('article', () => {
  const channelList = ref([])
  const getChannel = async () => {
    const res = await artGetChannelService()
    channelList.value = res.data.data
  }

  const addChannel = async () => {
    await artAddChannelService()
  }

  return {
    channelList,
    getChannel,
    addChannel
  }
})
