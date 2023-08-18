//图形验证码
export interface ImageCode{
    key:String
}

//用户登录
export interface LoginByJson{
    password: String,//密码（需要使用AES加密）
    username: String,//用户名（需要使用AES加密）
    key: String,//图形验证码中随机UUID
    captcha: String
}