<template>
    <el-dialog v-model="show" title="新增角色" width="60%" @close="close">
        <template #default>
            <el-form :model="deform" label-width="100px" :rules="formRules">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="deform.roleName" placeholder="请输入角色名称"/>
                </el-form-item>
                <el-form-item label="权限编码" prop="rolePerm">
                    <el-input v-model="deform.rolePerm" placeholder="权限编码"/>
                </el-form-item>
                <el-form-item label="状态" prop="enable">
                    <el-radio-group v-model="deform.enable">
                        <el-radio 
                            :label="deform.enable == item.v?deform.enable:item.v" 
                            v-for="item in dicts.system_global_status" 
                            :key="item.id"
                        >{{ item.k }}</el-radio>
                        <!-- <el-radio label="2">禁用</el-radio> -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="菜单权限">
                    <div class="item-menu">
                        <el-checkbox v-model="permission.openAll" label="展开/折叠" @change="toggleTreeCollapse"/>
                        <el-checkbox v-model="permission.selectAll" label="全选/全不选" @change="toggleTreeChecked"/>
                        <el-checkbox v-model="permission.linkage" label="父子(联动/不联动)"/>
                        <el-tree
                            ref="treeRef"
                            class="tree"
                            :data="permission.treeList"
                            node-key="id"
                            :props="permission.treeProps"
                            :check-strictly="!permission.linkage"
                            :default-expand-all="permission.openAll"
                            show-checkbox
                        />
                    </div>
                </el-form-item>
                <el-form-item label="备注" prop="descript">
                    <el-input 
                        type="textarea" 
                        placeholder="请输入备注"
                        v-model="deform.descript"
                        show-word-limit
                        :maxlength="100"
                    />
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger">取消</el-button>
                <el-button type="primary" @click="onSubmit">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref,reactive,onBeforeMount,getCurrentInstance } from 'vue'
import { menuTree,roleAdd } from './api/role'
const emit = defineEmits()
const props = defineProps({
    show:Boolean
})


const show = ref(props.show)

//关闭dialog
const close = () => {
    console.log('5555')
    emit('update:show',false)
}

//定义表单数据
const deform = reactive({
    id:'',
    roleName:'',//角色名称
    rolePerm:'',//权限编码
    enable:'1',//状态
    descript:'',//备注信息
})

//表单校验规则
const formRules = reactive({
    roleName:[
        { required: true, message: '请输入角色名称', trigger: 'blur' }
    ],
    rolePerm:[
        { required: true, message: '请输入权限编码', trigger: 'blur' }
    ]
})

//const
const permission = reactive({
    treeList:[],
    treeProps:{
        label:'name'
    },
    openAll:false,//是否展开所有菜单
    selectAll:false,//全选/全不选
    linkage:false //父子联动
})
const treeRef = ref()

const { proxy } = getCurrentInstance()
onBeforeMount(
    async () => {
        proxy.sendDicts(['system_global_status'])
        //获取菜单权限树
        let res = await menuTree()
        permission.treeList = res.data
    }
)

//展开折叠
const toggleTreeCollapse = (e) => {
    const nodeMap = treeRef.value.store.nodesMap
    console.log( nodeMap,'折叠' )
    Object.keys(nodeMap).forEach(key => {
        nodeMap[key].expanded = e
    })
}

//全选/全不选
const toggleTreeChecked = (e) => {
    const nodeMap = treeRef.value.store.nodesMap
    console.log( nodeMap,'全选' )

    Object.keys(nodeMap).forEach(key => {
        nodeMap[key].checked = e
    })
}

//确认按钮事件
const onSubmit =async () => {
    let {roleName,rolePerm,enable,descript} = deform
    let params = {
        roleName,
        rolePerm,
        enable,
        descript,
        permissionIds:treeRef.value.getCheckedKeys()
    }
    //请求接口
    let res = await roleAdd(params)
    if(  res.code == '200' ){
        ElMessage({
            type:'success',
            message:'新增角色成功'
        })
    }
    //关闭对话框
    show.value = false
    //更新列表
    emit('change')
}
</script>