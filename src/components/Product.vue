<template>
  <div class="product-card">
    {{ product.name }}
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.product-card {
  width: 200px;
  height: 200px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
