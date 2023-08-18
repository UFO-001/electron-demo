import http from '@utils/request'

import { ImageCode,LoginByJson } from '@type/login'

//图形验证码
export const imageCode = (data:ImageCode)=>{
    return http.get('/captcha/image',data,{responseType:'arraybuffer',loading:true})
}

//用户登录
export const loginByJson = (data:LoginByJson)=>{
    return http.post('/u/loginByJson',data,{loading:true})
}

// //获取个人信息
// export const getInfo = ()=>{
//     return http.get('/personal/getInfo',{},{lodaing:true})
// }

// 用户信息
export const getInfo = () => {
    return http.get('/personal/getInfo', {}, { loading: true })
}

// 用户信息
export const getRouters = (data:String) => {
    return http.get(`/personal/getRouters/${data}`, {}, { loading: true })
}