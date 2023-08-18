<template>
    <el-button type="primary" size="small" @click="add">新增</el-button>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名称" width="180" />
        <el-table-column prop="realName" label="真实姓名" width="180" />
        <el-table-column prop="userType" label="用户类型" width="180" />
        <el-table-column prop="phone" label="手机号" width="180" />
        <el-table-column prop="gender" label="用户性别" width="180" />
        <el-table-column prop="enabled" label="是否启用" width="180" />
        <el-table-column fixed="right" label="操作">
            <template #default="scope">
                <el-button type="primary" size="small">修改</el-button>
                <el-button type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 新增/修改的组件 -->
    <AddUser
    v-if="userDialog.show"
    v-model:show="userDialog.show"
   @change="getUserPage"
    ></AddUser>
</template>

<script setup lang="ts">

import { userPage } from './api/user'
import { onBeforeMount,reactive,ref } from 'vue';
import AddUser from './AddUser.vue'

onBeforeMount(async () => {
    getUserPage()
})

//查询用户列表
let tableData = ref([])
const getUserPage = async () => {
    let res = await userPage({
        current:'1',
        size:'10'
    })
    console.log( res,'用户列表' )
    tableData.value = res.data.records
}

let userDialog = reactive({
    show:false
})
//新增按钮的操作
const add = ( ) => {
    userDialog.show = true
}

//删除的操作
// const deletes = async (row)=>{
//     console.log( row )
//     let res = await roleDelete(row.id)
//     if( res.code == '200' ){
//         ElMessage({
//             type:'success',
//             message:'删除角色成功'
//         })
//     }
//     getRolePage()
// }
</script>