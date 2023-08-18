import http from '@utils/request'

export const agreement = (data)=>{
    return http.get('/agreement',data,{lodaing:true})
}

