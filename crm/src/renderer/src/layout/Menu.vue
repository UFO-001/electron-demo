<template>
    <div>
        <el-menu 
            default-active="1" 
            class="el-menu-vertical-demo" 
            >
            <MenuItem

            ></MenuItem>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import { ref,nextTick } from 'vue'
import { useRouter } from 'vue-router'
let router = useRouter()

import { useGlobalMenuStore } from '@store/MenuGlobalStore'
let store = useGlobalMenuStore()
let authMenuList = ref([])

nextTick(() => {
    let menuList = store.MenuList
    authMenuList.value = menuList
    console.log( authMenuList,'路由表' )
})

</script>