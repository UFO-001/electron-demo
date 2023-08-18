<template>
    <!-- 有子级路由 -->
    <el-sub-menu :index="data.path" v-if="hasChildren">
        <template #title>
            <span>{{ data.name }}</span>
        </template>
        <MenuItem
            v-for="item in data.children"
            :key="item.id"
            :data="item"
        ></MenuItem>
    </el-sub-menu>
    <!-- 没有子机路由 -->
    <el-menu-item :index="data.path" v-else>
        <span>{{ data.name }}</span>
    </el-menu-item>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue'
const props = defineProps({
    data:Object
})

const data = ref(props.data)

const hasChildren = computed(() => {
    return Array.isArray(data.value.children) && data.value.children.length > 0
})
</script>