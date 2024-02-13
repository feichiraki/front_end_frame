import { useState, useEffect } from 'react'
import type { ChannelItem } from '@/api/list'
import { fetchChannelAPI } from '@/api/list'

function useTabs() {
    const [channels, setChannels] = useState<ChannelItem[]>([])
    useEffect(() => {
        const getChannels = async () => {
            try {
                const res = await fetchChannelAPI()
                setChannels(res.data.data.channels)
            } catch (error) {
                throw new Error('fetch channel error!')
            }
        }
        getChannels()
    }, [])

    return {
        channels
    }
}

export {useTabs}