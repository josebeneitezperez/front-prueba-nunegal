<template>
  <div class="product-list-page">
    <div class="header">
      <input
        type="text"
        v-model="filterText"
        placeholder="Filter products"
        class="filter-input"
        @keyup="filterListProduct"
      />
    </div>
    <div class="products-container">
      <Product
        v-for="product in listProductFiltered"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Product from "@/components/Product.vue";
import * as productService from "@/services/productService";

const listAllProduct = ref([]);
const listProductFiltered = ref([]);
const filterText = ref("");

onMounted(fetchListProduct);

async function fetchListProduct() {
  try {
    const response = await productService.getListProduct();
    listAllProduct.value = response.data;
    listProductFiltered.value = response.data;
  } catch (error) {
    console.error(
      "Ocurrió un error tratando de obtener el listado de productos:",
      error
    );
  }
}

function filterListProduct() {
  const search = filterText.value.toUpperCase();
  listProductFiltered.value = listAllProduct.value.filter(
    (product) =>
      product.brand.toUpperCase().includes(search) ||
      product.model.toUpperCase().includes(search)
  );
}
</script>

<style scoped>
.product-list-page {
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.filter-input {
  padding: 0.5rem;
  font-size: 1rem;
  width: 250px;
  max-width: 100%;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1200px) {
  .products-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-container {
    grid-template-columns: 1fr;
  }
}
</style>
