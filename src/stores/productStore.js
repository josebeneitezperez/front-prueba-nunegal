import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("productStore", () => {
  const listProduct = ref([]);
  const product = ref(null);
  const selectedStorage = ref(null);
  const selectedColour = ref(null);

  /**
   * Los "cached" almacenan datos consultados al API para no tener que repetir dichas llamadas.
   * Tendrán una duración de 1h, tras la cual, se tratará de consultar de nuevo su valor a la API
   */
  const cachedListProduct = ref([]);
  const mapCachedProductDetail = ref({});

  function getListProduct() {
    return listProduct.value;
  }

  function setListProduct(products) {
    listProduct.value = products;
  }

  function getProduct() {
    return product.value;
  }

  function setProduct(productData) {
    selectedStorage.value = productData.options.storages[0];
    selectedColour.value = productData.options.colors[0];
    product.value = productData;
  }

  function getSelectedStorage() {
    return selectedStorage.value;
  }

  function setSelectedStorage(storage) {
    selectedStorage.value = storage;
  }

  function getSelectedColour() {
    return selectedColour.value;
  }

  function setSelectedColour(color) {
    selectedColour.value = color;
  }

  function getMapCachedProductDetail() {
    return mapCachedProductDetail.value;
  }

  function setCachedListProduct(listProduct) {
    cachedListProduct.value = listProduct;
  }

  function getCachedListProduct() {
    return cachedListProduct.value;
  }

  /**
   * Añade una posición en la caché de detalles de producto identificada con el id del producto.
   * @param {*} productDetail data obtenida en la respuesta del API
   */
  function addCachedProductDetail(productDetail) {
    mapCachedProductDetail.value[productDetail.id] = {
      response: productDetail,
      isTimeoutCreated: false,
    };
  }

  return {
    getListProduct,
    setListProduct,
    getProduct,
    setProduct,
    getSelectedStorage,
    setSelectedStorage,
    getSelectedColour,
    setSelectedColour,
    getMapCachedProductDetail,
    setCachedListProduct,
    getCachedListProduct,
    addCachedProductDetail,
  };
});
