<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <router-view />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
