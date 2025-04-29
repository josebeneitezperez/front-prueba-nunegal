<template>
  <header class="app-header">
    <a href="#" @click.prevent="clickGoToHomePage">
      <img src="/src/assets/img/logo-with-name.png" alt="Logo" class="logo-image" />
    </a>
    <button class="cart-button" @click="clickGoToCart" :title="getCartTitle()">
      <i class="fas fa-shopping-cart"></i>
      <span class="cart-count">{{ cartStore.getNumCartItems() }}</span>
    </button>
    <nav class="breadcrumbs">
      <ul>
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <router-link v-if="index !== breadcrumbs.length - 1" :to="crumb.path">
            {{ crumb.label }}
          </router-link>
          <span v-else>{{ crumb.label }}</span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { breadcrumbHistory } from '@/assets/js/config/router'

const cartStore = useCartStore()
const router = useRouter()
const getCartTitle = () =>
  `Your cart contains ${cartStore.getNumCartItems()} ${cartStore.getNumCartItems() === 1 ? 'product' : 'products'}`

function clickGoToCart() {
  router.push({ name: 'Cart' })
}

function clickGoToHomePage() {
  router.push({ name: 'ProductListPage' })
}

const breadcrumbs = computed(() => breadcrumbHistory.value)
</script>

<style scoped>
.app-header {
  background: #fff;
  padding: 0.5rem 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  position: relative;
}

.logo-image {
  max-width: 180px;
  height: auto;
}

.cart-button {
  position: absolute;
  top: 50%;
  right: 1.75rem;
  transform: translateY(-50%);
  font-size: 1.65rem;
  cursor: pointer;
}

.cart-count {
  background: #ff3b3b;
  color: #fff;
  font-size: 0.75rem;
  border-radius: 50%;
  position: absolute;
  top: -0.8rem;
  right: -0.6rem;
  min-width: 18px;
  text-align: center;
}

.breadcrumbs ul {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9rem;
  list-style: none;
}

.breadcrumbs li::after {
  content: '/';
  margin: 0.5rem;
  color: #ccc;
}

.breadcrumbs li:last-child::after {
  content: '';
  margin: 0.5rem;
  color: #ccc;
}

.breadcrumbs li:last-child::after {
  content: '';
  margin: 0.5rem;
  color: #ccc;
}

.breadcrumbs li:last-child::after {
  content: '';
  margin: 0.5rem;
  color: #ccc;
}

.breadcrumbs li:last-child::after {
  content: '';
  margin: 0.5rem;
  color: #ccc;
}

.breadcrumbs li:last-child::after {
  content: '';
  margin: 0.5rem;
  color: #ccc;
}

.breadcrumbs li:last-child::after {
  content: '';

  margin: 0.5rem;
  color: #ccc;
}

.breadcrumbs li:last-child::after {
  content: '';
}

.breadcrumbs a {
  color: #007bff;
}

.breadcrumbs a:hover {
  color: #0056b3;
}

@media (max-width: 768px) {
  .logo-image {
    max-width: 140px;
  }
}
</style>
