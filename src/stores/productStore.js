import { defineStore } from "pinia";
import { ref, readonly } from "vue";

export const useProductStore = defineStore("productStore", () => {
  const _listProduct = ref([]);
  const listProduct = readonly(_listProduct);

  function getListProduct() {
    return listProduct.value;
  }

  function setListProduct(products) {
    _listProduct.value = products;
  }

  return { getListProduct, setListProduct };
});
