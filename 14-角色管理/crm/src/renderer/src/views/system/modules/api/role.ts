import http from '@utils/request'

interface irolePage{
    current:String,
    size:String
}

//角色列表
export const rolePage = (data:irolePage)=>{
    return http.get('/system/role/page',data,{})
}