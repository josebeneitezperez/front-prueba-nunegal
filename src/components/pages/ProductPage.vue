<template>
  <div v-if="productStore.getProduct()" class="product-detail-page">
    <div class="product-content">
      <img
        :src="productStore.getProduct().imgUrl"
        :alt="productStore.getProduct().model"
        class="product-image"
      />
      <div class="product-data">
        <h1 class="product-title">
          {{
            drawValueOrDefault(
              productStore.getProduct().model,
              constants.NOT_SPECIFIED
            )
          }}
        </h1>
        <p class="product-brand">
          {{
            drawValueOrDefault(
              productStore.getProduct().brand,
              constants.NOT_SPECIFIED
            )
          }}
        </p>
        <p class="product-price">
          {{
            drawValueOrDefault(
              productStore.getProduct().price,
              constants.PRICE_NOT_SPECIFIED,
              "€"
            )
          }}
        </p>

        <h2 class="specifications-title">Specifications:</h2>
        <table class="product-specs">
          <tbody>
            <tr>
              <td>CPU:</td>
              <td>
                {{
                  drawValueOrDefault(
                    productStore.getProduct().cpu,
                    constants.NOT_SPECIFIED
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>RAM:</td>
              <td>
                {{
                  drawValueOrDefault(
                    productStore.getProduct().ram,
                    constants.NOT_SPECIFIED
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>Operating System:</td>
              <td>
                {{
                  drawValueOrDefault(
                    productStore.getProduct().os,
                    constants.NOT_SPECIFIED
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>Display Resolution:</td>
              <td>
                {{
                  drawValueOrDefault(
                    productStore.getProduct().displaySize,
                    constants.NOT_SPECIFIED
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>Battery:</td>
              <td>
                {{
                  drawValueOrDefault(
                    productStore.getProduct().battery,
                    constants.NOT_SPECIFIED
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>Camera:</td>
              <td>
                {{
                  drawValueOrDefault(
                    productStore.getProduct().primaryCamera,
                    constants.NOT_SPECIFIED
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>Secondary Camera:</td>
              <td>
                {{
                  drawValueOrDefault(
                    productStore.getProduct().secondaryCmera,
                    constants.NOT_SPECIFIED
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>Dimensions:</td>
              <td>
                {{
                  drawValueOrDefault(
                    productStore.getProduct().dimentions,
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
                    productStore.getProduct().weight,
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
            <label>Storage:</label>
            <div class="option-buttons">
              <button
                v-for="storage in productStore.getProduct().options.storages"
                :key="storage.code"
                :class="{
                  active:
                    productStore.getSelectedStorage().code === storage.code,
                }"
                @click="productStore.setSelectedStorage(storage)"
              >
                {{ storage.name }}
              </button>
            </div>
          </div>

          <div class="option-section">
            <label>Colour:</label>
            <div class="option-buttons">
              <button
                v-for="color in productStore.getProduct().options.colors"
                :key="color.code"
                :class="{
                  active: productStore.getSelectedColour().code === color.code,
                }"
                @click="productStore.setSelectedColour(color)"
              >
                {{ color.name }}
              </button>
            </div>
          </div>

          <button class="add-to-cart" @click="clickAddProductToCart">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import * as constants from "@/assets/js/common/constants";
import { drawValueOrDefault } from "@/assets/js/common/utils";
import * as productService from "@/services/productService";
import { useCartStore } from "@/stores/cartStore";
import { postAddProductToCart } from "@/services/productService";
import { useProductStore } from "@/stores/productStore";

const route = useRoute();
const cartStore = useCartStore();
const productStore = useProductStore();

onMounted(fetchProductDetail);

async function fetchProductDetail() {
  try {
    let cachedProductDetail =
      productStore.getMapCachedProductDetail()[route.params.id];

    //Comprobamos si ya hemos consultado este producto anteriormente, si no es así o ha expirado, lo solicitamos a la API
    if (cachedProductDetail == undefined) {
      const response = await productService.getProductDetail(route.params.id);
      productStore.setProduct(response.data);
      productStore.addCachedProductDetail(response.data);
    } else {
      productStore.setProduct(cachedProductDetail.response);
    }
  } catch (error) {
    console.error(
      "Ocurrió un error durante la obtención de los detalles del producto:",
      error
    );
  }
}

async function clickAddProductToCart() {
  try {
    const body = {
      id: productStore.getProduct().id,
      colorCode: productStore.getSelectedColour().code,
      storageCode: productStore.getSelectedStorage().code,
    };

    const response = await postAddProductToCart(body);
    cartStore.addToCartCount(response.data.count);
  } catch (error) {
    console.error(
      "Ocurrió un error tratando de añadir el producto al carrito:",
      error
    );
  }
}
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
  max-width: 1035px;
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
