import { defineStore } from 'pinia'

//学生状态
import { useSxx } from '@store/s'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
       useS:useSxx()
    }
  }
})

