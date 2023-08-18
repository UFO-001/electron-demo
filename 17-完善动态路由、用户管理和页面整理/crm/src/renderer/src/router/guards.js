import { useGlobalUserStore } from '@store/UseGlobalStore'
import { useGlobalMenuStore } from '@store/MenuGlobalStore'
import CONFIG from '@config'
import { useRouter } from 'vue-router'

var router = null
let isGetRouter = false

//前置导航守卫
export const beforeEach = async ( to )=>{
    router = useRouter()
    // console.log('前置导航守卫');
    //当前用户已经处于登录页面
    if( to.path == '/login' ){
        return
    }
    //若本地没有Token，则让用户进入登录页面
    if( !localStorage.getItem('Token') ){
        return '/login'
    }

    //动态路由
    //每个用户的菜单列表是不一样的，那使用的路由也是不一样的
    //动态路由就可以不用去写路由表，它会自动生成路由

    //用热加载解决菜单丢失问题
    try{
        const userStoer = useGlobalUserStore()
        await userStoer.initUerinfoAndConfig()
        const menuStore = useGlobalMenuStore()

        // console.log( router,'获取的路由' )s
        if( !isGetRouter ){
            // console.log( menuStore.MenuList,'路由表' )
            //初始化路由表
            initRouter(menuStore.MenuList)
            //如果当前路由没有匹配上
            if( to.matched.length == 0 ){
                router.push(to.fullPath)
            }
        }

        //加入是最高权限，则直接通过
        if( userStoer.permissions == CONFIG.PERMISSIONS ){
            return true
        }
        //判断当前用户是否有该路由权限
        if( !menuStore.menuMap.has(to.path) ){
            ElMessage.error('抱歉，您没有这个权限')
            return false
        }


    }catch(e){
        // console.log(e)
        return '/login'
    }

    return true
}

//初始化路由表
const initRouter = (menuList) =>{
    const newMenus = menuList || []
    let menu = [...newMenus]
    // console.log( menu )
    //路由重构
    let menuRouter = filterAsyncRouter(menu)
    menuRouter = flatAsyncRoutes( menuRouter)
    // console.log( menuRouter,'路由表' )
    menuRouter.forEach( item => {
        if( item.path != 'http://www.xuexiluxian.cn' ){
            //把路由表信息添加到touter实例中
            router.addRoute(item.parentView == 'layout' ? 'layout':'',item)
        }
    } )
    isGetRouter = false
}

//扁平化处理
function flatAsyncRoutes(routes,breakcrumb=[]){
    let res = []
    //遍历路由
    routes.forEach( route => {
        const temp = { ...route }
        // console.log( temp,'展开的路由' )
        if( temp.children ){
            //复制面包屑
            let childrenBreadcrumb = [ ...breakcrumb ]
            //把当前路由添加到面包屑里
            childrenBreadcrumb.push(route)
            let temRoute = { ...route }
            temRoute.meta.breadcrumb = childrenBreadcrumb
            delete temRoute.children
            res.push(temRoute)
            let childrenRoutes = flatAsyncRoutes(temp.children,childrenBreadcrumb)
            childrenRoutes.map( item => {
                res.push(item)
            } )
        }else{
            let childrenBreadcrumb = [ ...breakcrumb ]
            childrenBreadcrumb.push(temp)
            temp.meta.breadcrumb = childrenBreadcrumb
            res.push(temp)
        }
    } )
    return res
}

//重构路由
const filterAsyncRouter = (routerMap) => {
    const accessedRouters = []
    routerMap.forEach(item => {
        //组织动态路由结构
        let route = {
            path:item.path,
            name:item.name,
            meta:item.meta,
            parentView:item.parentView,
            children:item.children ? filterAsyncRouter(item.children) : null,
            component:loadingComponent(item.component)
        }
        accessedRouters.push(route)
    })
    return accessedRouters
}

//重构路由组件的路径
const loadingComponent = (component) => {
    if( component ) {
        return moduleMap[component]
    }
}

//组织组件的路由路径
//获取views文件下所有.vue结尾的文件路径
const modules = import.meta.glob('@renderer/views/**/*.vue')
// console.log( modules,'vue文件路径' )
const moduleMap = {}
Object.keys(modules).forEach(key => {
    const componentName = key.replace('/src/views','').replace('.vue','').replace('/index','').replace('/','')
    if( key.includes('index') ){
        moduleMap[`${componentName}/index`] = modules[key]
    }
    moduleMap[componentName] = modules[key]
})
// console.log( moduleMap,'整理好的路径' )


//后置导航守卫
export const afterEach = ( to ,from  )=>{
    console.log('后置导航守卫');
}
