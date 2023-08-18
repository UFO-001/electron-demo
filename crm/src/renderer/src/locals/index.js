import { createI18n } from 'vue-i18n'

// import el_zh_cn from 'element-plus/lib/locale/lang/zh-cn'
// import el_en from 'element-plus/lib/locale/lang/en'

import zh from './lang/zh-cn'
import en from './lang/en'

const messages = {
  // 'zh-cn':{
  //   el:el_zh_cn,
  //   ...zh
  // },
  // 'en':{
  //   el:el_en,
  //   ...en
  // }
  en,
  zh
}

const language = (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言

const i18n = createI18n({
  locale: localStorage.getItem('lang') || language.split('-')[0] || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'zh-cn',
  messages, 
})

export default i18n