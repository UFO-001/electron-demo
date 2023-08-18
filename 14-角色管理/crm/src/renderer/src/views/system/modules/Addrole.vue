<template>
    <el-dialog v-model="show" title="新增角色" width="30%" @close="close">
        <template #default>
            我是表单
            <!-- <el-form :model="form" label-width="120px">
                <el-form-item label="Activity name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                    <el-select v-model="form.region" placeholder="please select your zone">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-form> -->
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue'
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


</script>