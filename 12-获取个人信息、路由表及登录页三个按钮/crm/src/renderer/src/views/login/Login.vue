<template>
    <div class="login">
        <div class="login-left"></div>
        <div class="login-right">
            <div>顶部状态栏</div>
            <button @click="configDark">切换主题</button>
            <el-dropdown @command="configLang">
                <span class="el-dropdown-link">
                    切换
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="item in lang" :key="item.name" :command="item"> {{ item.name }} </el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
            <button @click="windowClose">关闭</button>
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane :label="$t('login.accountLogin')" name="user">
                    <Password></Password>
                </el-tab-pane>
                <el-tab-pane :label="$t('login.mobileLogin')" name="phone">
                    手机号登录
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref,reactive,getCurrentInstance } from 'vue'

//tab切换
const activeName = ref('user')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

//账号密码登录
import Password from './Password.vue';

//切换主题色
const configDark = () => {
    // console.log('主题')
    if( document.querySelector('html').className == 'dark' ){
        document.querySelector('html').className = ''
    }else{
        document.querySelector('html').className = 'dark'
    }
}

//切换语言
const lang = reactive([
    {name:'中文',value:'zh-cn'},
    {name:'英文',value:'en'}
])

//获取当前组件的实例
const instance = getCurrentInstance()
let { proxy } = instance

const configLang = (e) => {
    console.log( e,'eeee' )
    console.log( proxy )
    proxy.$i18n.locale = e.value
}

//关闭窗口
const windowClose = () => {
    window.electron.ipcRenderer.invoke('renderer-to-main',{
        name:'new-window',
        event:'event',
        data:'null'
    })
}
</script>

<style scoped>
.login{
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
.login-left{
    width: 35%;
    background-color: rgba(0, 0, 0, .4);
}

.login-right{
    flex: 1;
}
</style>