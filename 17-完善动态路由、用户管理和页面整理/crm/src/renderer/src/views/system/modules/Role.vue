<template>
    <el-button type="primary" size="small" v-add="'system:role:adds'" @click="add">新增</el-button>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" width="180" />
        <el-table-column prop="rolePerm" label="权限编码" width="180" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="enabled" label="是否启用" width="180" />

        <el-table-column fixed="right" label="操作">
            <template #default="scope">
                <el-button type="primary" size="small">修改</el-button>
                <el-button type="danger" size="small" @click="deletes(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 新增/修改的组件 -->
    <Addrole
    v-if="roleDialog.show"
    v-model:show="roleDialog.show"
    @change="getRolePage"
    ></Addrole>
</template>

<script setup lang="ts">

import { rolePage,roleDelete } from './api/role'
import { onBeforeMount,reactive,ref } from 'vue';
import Addrole from './Addrole.vue'

onBeforeMount(async () => {
    getRolePage()
})

//查询角色列表
let tableData = ref([])
const getRolePage = async () => {
    let res = await rolePage({
        current:'1',
        size:'10'
    })
    // console.log( res,'角色列表' )
    tableData.value = res.data.records
}

let roleDialog = reactive({
    show:false
})
//新增按钮的操作
const add = ( ) => {
    roleDialog.show = true
}

//删除的操作
const deletes = async (row)=>{
    console.log( row )
    let res = await roleDelete(row.id)
    if( res.code == '200' ){
        ElMessage({
            type:'success',
            message:'删除角色成功'
        })
    }
    getRolePage()
}
</script>