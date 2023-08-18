<template>
    <div class="container">
        <div class="container-l">
            <Menu></Menu>
        </div>
        <div class="container-r">
            <slot></slot>
        </div>

    </div>
</template>

<script setup>
import Menu from './Menu.vue'
</script>

<style scoped>
.container{
    display: flex;
    width: 100vw;
    height: 100vh;
}
.container .container-l{
    width: 260px;
    height: 100%;
    background-color: #555;
}
</style>