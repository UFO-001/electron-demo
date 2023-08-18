const CONFIG = {
    APP_URL:import.meta.env.MODE == 'development' ? '/api' : import.meta.env.RENDERER_APP_URL,
    //AES密钥
    AES_KEY:'bGvnMc62sh5RV6zP',
    //AES偏移量
    AES_OFF:'1eZ43DLcYtV2xb3Y',
    //admin的权限编码
    PERMISSIONS:"*:*:*"
}

export default CONFIG