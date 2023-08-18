import { defineStore } from 'pinia'
import { getRouters } from '@api/login'
import { useGlobalUserStore } from './UseGlobalStore'

export const useGlobalMenuStore = defineStore('global-menu', {
  // other options...
  state:()=>{
    return {
       MenuList:[],
       menuMap:null
    }
  },
  actions:{
    //获取用户的路由表
    async loadAuthRouters(){
        const userStore = useGlobalUserStore()
        //请求用户的路由
        const res = await getRouters(userStore.currentRolePerm)
        // console.log( res,'用户路由表' )
        if( res.code == '200' ){
            const menu = noemalizeMenu(res.data)
            this.MenuList = menu.routers
            this.menuMap = menu.authMenuMap
            // console.log( this.MenuList,'0000' )
            // console.log( this.menuMap,'11111' )
        }
    }
  }
})

//Map结构扁平化格式
function noemalizeMenu(routers){
    //创建Map对象，映射用户权限
    const authMap = new Map()
    //调用  函数，返回Map对象
    const authMenuMap = normalizeMenuItem( routers,authMap )
    return {
        routers,
        authMenuMap
    }
}

function normalizeMenuItem( routers,map ){
    //用forEach便利routers里的每一项，每一项就是item
    routers.forEach( item =>{
        //把item里的path作为key，item作为value，保存到map对象中
        map.set(item.path,item)
        //判断item是否有children属性
        if(item.children){
            return normalizeMenuItem( item.children,map )
        }
    } )
    return map
}