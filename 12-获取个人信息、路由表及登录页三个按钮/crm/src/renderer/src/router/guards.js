//前置导航守卫
export const beforeEach = ( to )=>{
    // console.log('前置导航守卫');
    //当前用户已经处于登录页面
    if( to.path == '/login' ){
        return
    }
    //若本地没有Token，则让用户进入登录页面
    if( !localStorage.getItem('Token') ){
        return '/login'
    }
    return true
}

//后置导航守卫
export const afterEach = ( to ,from  )=>{
    console.log('后置导航守卫');
}
