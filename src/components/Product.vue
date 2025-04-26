<template>
  <div
    class="product-card"
    :title="`${product.brand} - ${product.model}`"
    @click="clickProduct"
  >
    <img :src="product.imgUrl" :alt="product.model" class="product-image" />
    <div class="product-info">
      <p class="product-name">
        <strong>{{ product.brand }}</strong> - {{ product.model }}
      </p>
      <p class="product-price">{{ formattedPrice }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const formattedPrice = computed(() => {
  return `$${props.product.price}`;
});

function clickProduct() {
  router.push({ name: "ProductPage", params: { id: props.product.id } });
}
</script>

<style scoped>
.product-card {
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 160px;
  height: 212px;
  object-fit: cover;
  margin: 0 auto;
}

.product-info {
  padding: 1rem;
  text-align: center;
}

.product-name {
  font-size: 1rem;
  margin: 0;
}

.product-price {
  font-size: 1rem;
  color: #333;
  font-weight: bold;
  margin-top: 0.5rem;
}
</style>
