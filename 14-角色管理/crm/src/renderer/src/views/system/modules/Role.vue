<template>
    <el-button type="primary" size="small" @click="add">新增</el-button>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" width="180" />
        <el-table-column prop="rolePerm" label="权限编码" width="180" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="enabled" label="是否启用" width="180" />

        <el-table-column fixed="right" label="操作">
            <template #default>
                <el-button type="primary" size="small">修改</el-button>
                <el-button type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 新增/修改的组件 -->
    <Addrole
    v-if="roleDialog.show"
    v-model:show="roleDialog.show"
    ></Addrole>
</template>

<script setup >

import { rolePage } from './api/role'
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

</script>
