<template>
  <div v-if="product" class="product-detail-page">
    <div class="product-content">
      <img :src="product.imgUrl" :alt="product.model" class="product-image" />
      <div class="product-data">
        <h1 class="product-title">
          {{ drawValueOrDefault(product.model, constants.NOT_SPECIFIED) }}
        </h1>
        <p class="product-brand">
          {{ drawValueOrDefault(product.brand, constants.NOT_SPECIFIED) }}
        </p>
        <p class="product-price">
          {{
            drawValueOrDefault(
              product.price,
              constants.PRICE_NOT_SPECIFIED,
              "€"
            )
          }}
        </p>

        <h2 class="specifications-title">Especificaciones:</h2>
        <table class="product-specs">
          <tbody>
            <tr>
              <td>CPU:</td>
              <td>
                {{ drawValueOrDefault(product.cpu, constants.NOT_SPECIFIED) }}
              </td>
            </tr>
            <tr>
              <td>RAM:</td>
              <td>
                {{ drawValueOrDefault(product.ram, constants.NOT_SPECIFIED) }}
              </td>
            </tr>
            <tr>
              <td>Operating System:</td>
              <td>
                {{ drawValueOrDefault(product.os, constants.NOT_SPECIFIED) }}
              </td>
            </tr>
            <tr>
              <td>Display Resolution:</td>
              <td>
                {{
                  drawValueOrDefault(
                    product.displaySize,
                    constants.NOT_SPECIFIED
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>Battery:</td>
              <td>
                {{
                  drawValueOrDefault(product.battery, constants.NOT_SPECIFIED)
                }}
              </td>
            </tr>
            <tr>
              <td>Camera:</td>
              <td>
                {{ drawValueOrDefault(primaryCamera, constants.NOT_SPECIFIED) }}
              </td>
            </tr>
            <tr>
              <td>Dimensions:</td>
              <td>
                {{
                  drawValueOrDefault(
                    product.dimentions,
                    constants.NOT_SPECIFIED
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>Weight:</td>
              <td>
                {{
                  drawValueOrDefault(
                    product.weight,
                    constants.NOT_SPECIFIED,
                    " g"
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="product-options">
          <div class="option-section">
            <label>Almacenamiento:</label>
            <div class="option-buttons">
              <button
                v-for="option in storageOptions"
                :key="option.code"
                :class="{ active: selectedStorage === option.name }"
                @click="selectedStorage = option.name"
              >
                {{ option.name }}
              </button>
            </div>
          </div>

          <div class="option-section">
            <label>Color:</label>
            <div class="option-buttons">
              <button
                v-for="option in colorOptions"
                :key="option.code"
                :class="{ active: selectedColor === option.name }"
                @click="selectedColor = option.name"
              >
                {{ option.name }}
              </button>
            </div>
          </div>

          <button class="add-to-cart">Añadir a la cesta</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import * as constants from "@/assets/js/common/constants";
import { drawValueOrDefault } from "@/assets/js/common/utils";
import * as productService from "@/services/productService";

const route = useRoute();
const product = ref(null);
const primaryCamera = ref("");

const storageOptions = ref([]);
const colorOptions = ref([]);
const selectedStorage = ref("");
const selectedColor = ref("");

async function fetchProductDetail() {
  try {
    const id = route.params.id;
    const response = await productService.getProductDetail(id);
    product.value = response.data;

    primaryCamera.value =
      product.value.primaryCamera?.join(", ") || "Not specified";
    storageOptions.value = product.value.options?.storages || [];
    colorOptions.value = product.value.options?.colors || [];
    selectedStorage.value = storageOptions.value.length
      ? storageOptions.value[0].name
      : "";
    selectedColor.value = colorOptions.value.length
      ? colorOptions.value[0].name
      : "";
  } catch (error) {
    console.error("Error fetching product detail:", error);
  }
}

onMounted(fetchProductDetail);
</script>

<style scoped>
.product-detail-page {
  padding: 1.5rem;
  display: flex;
  justify-content: center;
}

.product-content {
  display: flex;
  gap: 2rem;
  max-width: 1000px;
  flex-wrap: wrap;
}

.product-image {
  width: 400px;
  height: 530px;
  object-fit: cover;
  border-radius: 8px;
}

.product-data {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 2rem;
}

.product-brand {
  font-size: 1.1rem;
  color: #555;
}

.product-price {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.specifications-title {
  font-size: 1.4rem;
  font-weight: bold;
}

.product-specs {
  width: 100%;
  border-collapse: collapse;
}

.product-specs td {
  padding: 0.5rem;
  vertical-align: top;
}

.product-specs td:first-child {
  font-weight: bold;
  text-align: left;
  white-space: nowrap;
  padding-right: 1rem;
}

.product-options {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-section {
  display: flex;
  flex-direction: column;
}

.option-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.option-buttons button {
  padding: 0.5rem 1rem;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.option-buttons button.active {
  border-color: #000;
  font-weight: bold;
}

.add-to-cart {
  margin-top: 1rem;
  padding: 0.8rem;
  background: #2c3e50;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
}

.add-to-cart:hover {
  background: #1a252f;
}

.loading {
  padding: 2rem;
  text-align: center;
}

@media (max-width: 768px) {
  .product-content {
    flex-direction: column;
    align-items: center;
  }
  .product-image {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
}
</style>
