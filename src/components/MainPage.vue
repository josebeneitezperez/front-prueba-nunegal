<template>
  <Header :breadcrumbs="breadcrumbs"></Header>
  <ProductListPage></ProductListPage>
</template>

<script setup>
import { useLoginStore } from "@/stores/login";
import Header from "@/components/Header.vue";
import ProductListPage from "@/components/ProductListPage.vue";

import { ref } from "vue";

const loginStore = useLoginStore();

const breadcrumbs = ref([
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Current Page", path: "/current" },
]);

function toggleLogin() {
  console.log("isLoginSuccess actual:", loginStore.isLoginSuccess);
  loginStore.setLoginSuccess(!loginStore.isLoginSuccess);
}
</script>
