<template>
  <header class="app-header">
    <div class="header-content">
      <h1 class="app-title">
        <a href="#" @click.prevent="clickGoToHomePage">Título borrame</a>
      </h1>
      <button
        class="cart-button"
        @click="clickGoToCart"
        aria-label="Carrito de la compra"
      >
        <i class="fas fa-shopping-cart"></i>
      </button>
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

function clickGoToProductListPage() {
  router.push({ name: "ProductListPage" });
}

//borrame mejorar esta función
function updateBreadcrumbs() {
  if (route.name === "ProductListPage") {
    breadcrumbs.value = [{ label: "Listado de productos", path: "/" }];
  } else if (route.name === "ProductPage") {
    breadcrumbs.value = [
      { label: "Listado de productos", path: "/" },
      { label: "Detalles del producto", path: route.fullPath },
    ];
  } else {
    breadcrumbs.value = [
      { label: "Listado de productos", path: "/" },
      { label: "Página desconocida", path: route.fullPath },
    ];
  }
}

updateBreadcrumbs();

watch(route, () => {
  updateBreadcrumbs();
});
</script>

<style scoped>
.app-header {
  background: #fff;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title a {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

.cart-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.breadcrumbs ul {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.breadcrumbs li::after {
  content: "/";
  margin-left: 0.5rem;
}

.breadcrumbs li:last-child::after {
  content: "";
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
