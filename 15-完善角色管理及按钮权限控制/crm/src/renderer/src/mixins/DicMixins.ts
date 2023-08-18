//处理自定义指令的文件
import { useGlobalUserStore } from '@store/UseGlobalStore'
export const AuthDic = {
    name:'add',
    mounted(el,binding){
        let permissions = useGlobalUserStore().permissions;
        let val = binding.value; //'add_add'
        console.log( val,'value' )
        if( !val ) {
            throw '该字段必须传值'
        }

        //判断当前用户是否时超管 这两类用户都是有权限
        // if( permissions.includes("*:*:*") ) return
        if( permissions.includes(val) ) return

        //没有权限
        const parent = el.parentElement
        parent && parent.removeChild(el)
    }
}