<template>
    <div>
        <el-menu 
            class="el-menu-vertical-demo" 
            :default-active="activePath" 
            :unique-opened = 'true'
            router
            >
            <MenuItem
                v-for="item in authMenuList"
                :key="item.id"
                :data="item"
            ></MenuItem>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import { ref,nextTick,watch } from 'vue'
import { useRouter } from 'vue-router'
let router = useRouter()

import { useGlobalMenuStore } from '@store/MenuGlobalStore'
let store = useGlobalMenuStore()
let authMenuList = ref([])

let activePath = ref('/home')

watch(()=>router.currentRoute.value.path,(newVal) => {
    activePath.value = newVal
},{immediate:true})

nextTick(() => {
    let menuList = store.MenuList
    authMenuList.value = menuList
    // console.log( authMenuList,'路由表' )
})

</script>