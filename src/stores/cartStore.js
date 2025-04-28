import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cartStore", () => {
  const numCartItems = ref(0);

  function getNumCartItems() {
    return numCartItems.value;
  }

  function addToCartCount(newCount) {
    numCartItems.value = newCount;
  }

  return { getNumCartItems, addToCartCount };
});
