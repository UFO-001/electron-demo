<template>
    <div class="login">
        <!-- 登录页头部三个按钮 -->
        <div class="login-t">
            <div class="login-t-bar">
                <!--黑白模式-->
                <el-button circle @click='configDark'>
                    <el-icon v-if="config.dark=='dark'"><Sunny /></el-icon>
                    <el-icon v-else><Moon /></el-icon>
                </el-button>

                <!--切换语言-->
                <el-dropdown @command="configLang" trigger="click">
                    <el-button circle>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M478.33 433.6l-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4zM334.83 362L368 281.65L401.17 362z" fill="currentColor"></path><path d="M267.84 342.92a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73c39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36c-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93c.92 1.19 1.83 2.35 2.74 3.51c-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59c22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9z" fill="currentColor"></path></svg>
                    </el-button>
                    <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item 
                            v-for="item in lang"
                            :key="item.name"
                            :command="item"
                       login-l >{{ item.name }}</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <!--关闭-->
                <el-button circle @click="windowClose">
                    <el-icon><Close /></el-icon>
                </el-button>
            </div>
        </div>


        <div class="login-left">
            <div class="login_adv__title">
				<h2>鹿线开源</h2>
				<h4>{{ $t('login.slogan') }}</h4>
				<p>{{ $t('login.slogan') }}</p>
			</div>
			<div class="login_adv__mask"></div>
			<div class="login_adv__bottom">
				© 鹿线开源
			</div>
        </div>
        <div class="login-right">
            <div class="login-form">
                <div class="login-header">
                    <div class="logo">
                        <img src="/images/logo.png">
                    </div>
                </div>
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

//icons
const config = reactive({
    dark:localStorage.getItem('APP_dark')||false
})

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
        name:'open-window',
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
    display: flex;
}
.login-t{
    position: absolute;
    top:0;
    right:0;
    width:100%;
    height: 80px;
    z-index: 999;
}
.login-t-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    float: right;
    width:120px;
    margin:10px 10px 0 0;
}

.login_adv__title {color: #fff;padding: 40px;position: absolute;top:0px;left:0px;right: 0px;z-index: 2;}
.login_adv__title h2 {font-size: 40px;}
.login_adv__title h4 {font-size: 18px;margin-top: 10px;font-weight: normal;}
.login_adv__title p {font-size: 14px;margin-top:10px;line-height: 1.8;color: rgba(255,255,255,0.6);}
.login_adv__title div {margin-top: 10px;display: flex;align-items: center;}
.login_adv__title div span {margin-right: 15px;}
.login_adv__bottom {position: absolute;left:0px;right: 0px;bottom: 0px;color: #fff;padding: 40px;background-image:linear-gradient(transparent, #000);z-index: 3;}

.login-form {width: 400px;margin: auto;}
.login-header {margin-bottom: 40px;}
.login-header .logo {display: flex;align-items: center;justify-content: center}
.login-header .logo img {width: 40px;height: 40px;vertical-align: bottom;margin-right: 10px;}
.login-header .logo label {font-size: 26px;font-weight: bold;}
.login-oauth {display: flex;justify-content:space-around;}
.login-form .el-divider {margin-top:40px;}
</style>