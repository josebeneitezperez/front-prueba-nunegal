<template>
  <header class="app-header">
    <div class="header-top">
      <div class="header-left">
        <a href="#" @click.prevent="clickGoToHomePage" class="logo-link">
          <img
            src="/src/assets/img/logo-with-name.png"
            alt="Logo"
            class="logo-image"
          />
        </a>
      </div>
      <div class="header-right">
        <button
          class="cart-button"
          @click="clickGoToCart"
          aria-label="Carrito de la compra"
        >
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
    <nav class="breadcrumbs">
      <ul>
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <router-link v-if="index !== breadcrumbs.length - 1" :to="crumb.path">
            {{ crumb.label }}
          </router-link>
          <span v-else>
            {{ crumb.label }}
          </span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import "@fortawesome/fontawesome-free/css/all.css";

const router = useRouter();
const route = useRoute();

const breadcrumbs = ref([]);

function clickGoToCart() {
  router.push({ name: "Cart" });
}

function clickGoToHomePage() {
  router.push({ name: "ProductListPage" });
}

function updateBreadcrumbs() {
  if (route.name === "ProductListPage") {
    breadcrumbs.value = [{ label: "Home", path: "/" }];
  } else if (route.name === "ProductPage") {
    breadcrumbs.value = [
      { label: "Home", path: "/" },
      { label: "Detalles del producto", path: route.fullPath },
    ];
  } else {
    breadcrumbs.value = [
      { label: "Home", path: "/" },
      { label: "Página desconocida", path: route.fullPath },
    ];
  }
}

updateBreadcrumbs();
watch(route, updateBreadcrumbs);
</script>

<style scoped>
.app-header {
  background: #fff;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-image {
  height: 40px;
  max-width: 180px;
  object-fit: contain;
}

.cart-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.breadcrumbs ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  gap: 0.5rem;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
}

.breadcrumbs li::after {
  content: "/";
  margin: 0 0.5rem;
  color: #ccc;
}

.breadcrumbs li:last-child::after {
  content: "";
}

.breadcrumbs a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumbs a:hover {
  color: #0056b3;
}

@media (max-width: 768px) {
  .header-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .logo-image {
    height: 30px;
    max-width: 140px;
  }

  .header-right {
    align-self: flex-end;
  }
}
</style>
