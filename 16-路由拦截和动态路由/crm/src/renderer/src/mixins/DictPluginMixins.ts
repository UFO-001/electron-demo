import { queryBatch } from '@api/dicts'

//全局使用mixin
export default function(app){
    app.mixin({
        data(){
            return {
                dicts:{}
            }
        },
        methods:{
            async sendDicts(params:string[]){
                if(params){
                   let res = await queryBatch(params)
                   console.log( res.data,'字典查询的数据' )
                    this.dicts = res.data
                }
            }
        }
    })
}