<template>
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="0" size="large">
        <!--用户名-->
        <el-form-item prop="username">
            <el-input v-model="form.username" prefix-icon="el-icon-user" clearable placeholder="用户名"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
            <el-input v-model="form.password" prefix-icon="el-icon-lock" clearable show-password
                placeholder="密码"></el-input>
        </el-form-item>

        <!--验证码  -->
        <el-form-item>
            <div class="boxCode">
                <el-input v-model="form.captcha" prefix-icon="el-icon-CircleCheck" clearable
                    placeholder="请输入验证码"></el-input>
                <el-image :src="captchas.url" @click="getCodeApi" class="code"></el-image>
            </div>
        </el-form-item>
        <!--记住密码-->
        <el-form-item style="margin-bottom: 10px;">
            <el-checkbox v-model="checked" label="记住密码" size="small" @change="onMemoPassword"/>
        </el-form-item>
        <!--登录  -->
        <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="login(ruleFormRef)">登录</el-button>
        </el-form-item>

    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'

//定义表单数据
const form = reactive({
    username:'',
    password:'',
    captcha:''
})

//定义验证码数据
const captchas = reactive({
    url:'',
    key:''
})

//定义表单规则
const rules = reactive({
    username:[
        {required: true, message: '请正确输入用户名/账号！', trigger: 'blur'}
    ],
    password:[
        {required: true, message: '密码不能为空！', trigger: 'blur'}
    ]
})

//加载前生命周期
onBeforeMount(() => {
    //获取本地账号密码，进行渲染
    const userPwd = localStorage.getItem('user-pwd')
    if( userPwd ){
        let {username,password} = JSON.parse(userPwd)
        form.username = Decrypt(username)
        form.password = Decrypt(password)
    }
    //获取登录验证码
    getCodeApi()
})

//引入请求验证码
import { imageCode,loginByJson } from '@api/login'
//获取登录验证码
const ruleFormRef = ref(null)
const getCodeApi = async () => {
    captchas.key = new Date().getTime().toString()
    let res = await imageCode({key:captchas.key})
    // console.log( res )
    let blob = new Blob( [res], {type:'application/vnd.ms-excel;charset=utf-8'} );
    let imgUrl = URL.createObjectURL(blob)
    // console.log( imgUrl,'6666' )
    captchas.url = imgUrl
}

import { Encrypt,Decrypt } from '@utils/aes.js'
import { useRouter } from 'vue-router';
import { useGlobalUserStore } from '@store/UseGlobalStore'
let userStore = useGlobalUserStore()
let router = useRouter()
//账号密码登录
const login = async (formEl) => {
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let { username,password,captcha } = form
            let res = await loginByJson({
                password:Encrypt(password),
                username:Encrypt(username),
                key:captchas.key,
                captcha:captcha
            })
            console.log( res,'6666' )
            //判断是否登录成功
            if( res.code != '200' ) return
            //登录成功后保存token
            localStorage.setItem('Token',res.data)
            //获取用户信息
            userStore.initUerinfoAndConfig()
            //记住密码
            setMemoPassword()
            //跳转页面
            router.push('/')
        } else {
            console.log('error submit!', fields)
        }
    })
}

//记住密码
import useMemoPassword from '@hooks/useMemoPassword'
let { memoValue,onMemoPassword } = useMemoPassword()
const checked = ref(memoValue)
//是否记住密码
const setMemoPassword = () => {
    checked.value ? localStorage.setItem('user-pwd',
    JSON.stringify({
        password:Encrypt(form.password),
        username:Encrypt(form.username)
    })):localStorage.removeItem('user-pwd')
}
</script>


<style lang="scss">
.boxCode {
    display: flex;
    align-items: center;
    width: 100%;
}

.code {
    margin-left: 10px;
    height: 40px;
    cursor: pointer;
}
</style>

