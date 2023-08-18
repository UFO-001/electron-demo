import { defineStore } from 'pinia'
import { getInfo } from '@api/login'
import { useGlobalMenuStore } from './MenuGlobalStore'

export const useGlobalUserStore = defineStore('global-user', {
  // other options...
  state:()=>{
    return {
        userInfo:{},//用户信息
        permissions:[],//权限信息【权限编码】
        roles:[],//角色信息
        currentRolePerm:'', //用户角色编码
    }
  },
  actions:{
    //获取用户个人信息
    async initUerinfoAndConfig(){
        // console.log( '12456' )
        if( this.userInfo ){
          let res = await getInfo()
          // console.log( res,'0000' )
          let {permissions,roles,userInfo } = res.data
          this.permissions = permissions
          this.roles = roles
          this.userInfo = userInfo

          //保存用户编码，后面要通过编码拿到路由信息
          if( !this.currentRolePerm ){
            // console.log( roles[0].rolePerm,'1111' )
            this.togglecurrentRolePerm( roles[0].rolePerm )
          }
        }
        //获取当前登录用户的路由菜单
        await useGlobalMenuStore().loadAuthRouters()
    },
    //用户权限编码
    togglecurrentRolePerm(rolePerm:string){
      this.currentRolePerm = rolePerm
      localStorage.setItem('currentRolePerm',rolePerm)
    }
  }
})