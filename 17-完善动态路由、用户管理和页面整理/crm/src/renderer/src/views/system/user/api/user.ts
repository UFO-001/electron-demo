import http from '@utils/request'

interface irolePage{
    current:String,
    size:String
}

interface ipostPage{
    current:String,
    size:String
}

interface iuserAdd{
    username: String,//用户名
    password: String,//密码
    realName: String,//真实姓名
    email: String,//邮箱
    gender: String,//用户性别（1：男；2：女；0：未知）
    avatar: String,//头像
    remark: String,//备注
    phone: String,//手机号
    enabled: String,//帐号状态（0：禁用；1：正常）
    roleIds: String[],//角色(角色中包含的是每一个权限的id)
    postIds: String[],//岗位
    unitId: String//机构ID
}

//用户列表
export const userPage= (data:irolePage)=>{
    return http.get('/system/user/page',data,{})
}

//机构列表
export const unitList= ( )=>{
    return http.get('/system/unit/list', { } ,{})
}

//岗位列表
export const postPage= ( data:ipostPage )=>{
    return http.get('/system/post/page',data,{})
}

//岗位列表
export const rolePage= ( data:ipostPage )=>{
    return http.get('/system/role/page',data,{})
}

//添加用户
export const userAdd= ( data:iuserAdd )=>{
    return http.post('/system/user/add',data,{})
}