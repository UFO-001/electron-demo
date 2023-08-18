<template>
    <SystemLayout>
        <button>按钮</button>
        <div>
            <router-view v-slot="{Component}">
                <component :is="Component"></component>
            </router-view>
        </div>
    </SystemLayout>
</template>

<script setup lang="ts">
import SystemLayout from '@layout/SystemLayout.vue'
</script>