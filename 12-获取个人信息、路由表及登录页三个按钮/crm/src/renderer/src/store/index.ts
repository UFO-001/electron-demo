import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  // other options...
  state:()=>{
    return {
      num:123
    }
  }
})