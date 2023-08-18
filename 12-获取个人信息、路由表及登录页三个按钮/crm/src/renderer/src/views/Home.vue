<template>
    <div>首页</div>
    <button @click="login">Login</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
let router = useRouter()
const login = () => {
    router.push('login')
}
</script>