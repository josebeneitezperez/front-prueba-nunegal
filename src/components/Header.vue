<template>
  <header class="app-header">
    <div class="header-content">
      <h1 class="app-title">
        <a href="#" @click.prevent="clicLogo">Título borrame</a>
      </h1>
      <button
        class="cart-button"
        @click="goToCart"
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

<script>
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  name: "AppHeader",
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToCart() {
      this.$router.push({ name: "Cart" });
    },
    clicLogo() {
      console.log("Clic en el logo");
    },
  },
};
</script>

<style scoped>
.app-header {
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.app-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.app-title a {
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
  margin: 1rem 0 0 0;
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

  .cart-button {
    align-self: flex-end;
  }

  .app-title {
    font-size: 1.2rem;
  }
}
</style>
