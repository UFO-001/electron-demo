//路由表
import { markRaw } from 'vue'

export const AppRoutes = markRaw([
    { 
        path: "/",
        redirect:'/dashboard' ,
        name:'layout',
        component: ()=>import('@layout/index.vue')
    },
    { 
        path: "/login", 
        component: ()=>import('@views/login/Login.vue')
    },
    // { 
    //     path: "/system", 
    //     component: ()=>import('@views/system/System.vue'),
    //     children:[
    //         { 
    //             path: "role", 
    //             component: ()=>import('@views/system/modules/Role.vue')
    //         }
    //     ]
    // }

    // {
    //     path:''
    //     name:''
    //     component:
    //     children:[
    //         {
    //             path:''
    //         }
    //     ]
    // }
])
