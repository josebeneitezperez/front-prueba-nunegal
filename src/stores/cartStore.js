import { defineStore } from "pinia";
import { ref, readonly } from "vue";

export const useCartStore = defineStore("cartStore", () => {
  const _numCartItems = ref(0);
  const numCartItems = readonly(_numCartItems);

  function getNumCartItems() {
    return numCartItems.value;
  }

  function addToCartCount(newCount) {
    _numCartItems.value = newCount;
  }

  return { getNumCartItems, addToCartCount };
});
