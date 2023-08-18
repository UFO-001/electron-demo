import http from '@utils/request'

interface irolePage{
    current:String,
    size:String
}

interface iroleAdd{
    roleName: String,//角色名称
    rolePerm: String,//角色权限编码
    enabled: String,//是否启用（0：禁用；1：启用）
    descript: String,//描述
    permissionIds: String[]//菜单ID
}

//角色列表
export const rolePage = (data:irolePage)=>{
    return http.get('/system/role/page',data,{})
}

//菜单权限树
export const menuTree = ()=>{
    return http.get('/system/menu/tree',{},{})
}

//添加角色
export const roleAdd = (data:iroleAdd)=>{
    return http.post('/system/role/add',data,{})
}

//删除角色
export const roleDelete = (data:String)=>{
    return http.get(`/system/role/delete/${data}`,{},{})
}