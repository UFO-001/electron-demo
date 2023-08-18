import { createApp } from 'vue'
import App from './App.vue'

//路由
import router from '@router'
//状态管理
import { createPinia } from 'pinia'

//引入切换语言的文件
import i18n from './locals/index.js'

let app = createApp(App);
app.use( router );
app.use( createPinia() );
app.use(i18n)
app.mount('#app');
