import http from '@utils/request'

//查询字典（批量查询）文档有误，请求方式位POST
export const queryBatch = (data:string[])=>{
    return http.post('/system/dict/item/queryBatch',data,{})
}
