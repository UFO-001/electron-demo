import { createApp } from 'vue'
import App from './App.vue'

//路由
import router from '@router'
//状态管理
import { createPinia } from 'pinia'

//引入切换语言的文件
import i18n from './locals/index.js'

//引入全局自定义指令
import { AuthDic } from '@mixins/DicMixins'

let app = createApp(App);
app.use( router );
app.use( createPinia() );
app.use(i18n)
app.directive(AuthDic.name,AuthDic)
app.mount('#app');
