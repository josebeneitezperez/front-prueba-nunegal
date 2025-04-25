<template>
  <div class="product-list-page">
    <div class="header">
      <input
        type="text"
        v-model="filterText"
        placeholder="Filter products"
        title="borrame filtro"
        class="filter-input"
      />
    </div>
    <div class="products-container">
      <Product
        v-for="product in listProduct"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import Product from "@/components/Product.vue";
import { ref } from "vue";

const listProduct = ref([
  { id: 1, name: "iPhone 14 Pro" },
  { id: 2, name: "Samsung Galaxy S23" },
  { id: 3, name: "Google Pixel 8" },
  { id: 4, name: "OnePlus 11" },
  { id: 5, name: "Xiaomi 13 Pro" },
  { id: 6, name: "Sony Xperia 1 V" },
  { id: 7, name: "Huawei P60 Pro" },
  { id: 8, name: "Motorola Edge 40" },
  { id: 9, name: "Realme GT Neo 5" },
  { id: 10, name: "Asus ROG Phone 7" },
  { id: 11, name: "Nokia XR21" },
  { id: 12, name: "Oppo Find X6" },
  { id: 13, name: "Vivo X90 Pro" },
  { id: 14, name: "Honor Magic5 Pro" },
  { id: 15, name: "iPhone SE 2022" },
  { id: 16, name: "Samsung Galaxy Z Fold 5" },
  { id: 17, name: "Pixel Fold" },
  { id: 18, name: "OnePlus Nord 3" },
  { id: 19, name: "Redmi Note 12" },
  { id: 20, name: "Sony Xperia 10 V" },
  { id: 21, name: "Motorola Razr 2023" },
]);

const filterText = ref("");
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
  gap: 1rem;
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
