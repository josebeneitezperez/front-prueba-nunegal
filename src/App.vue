<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="app-layout">
    <Header />
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
