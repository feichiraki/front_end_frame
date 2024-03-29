import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  // state
  const selectedAddress = ref<AddressItem>()

  //action
  const changeAddress = (address: AddressItem) => {
    selectedAddress.value = address
  }
  //returns
  return {
    selectedAddress,
    changeAddress,
  }
})
