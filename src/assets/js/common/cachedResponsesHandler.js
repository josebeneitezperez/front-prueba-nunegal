import { watch } from "vue";
import { useProductStore } from "@/stores/productStore";
import * as productService from "@/services/productService";
import { MILISECONDS_CACHED } from "@/assets/js/common/constants";

export function initCachedResponsesHandler() {
  const productStore = useProductStore();

  /**
   * Si se añade un nuevo detalle de producto al map, iniciamos su timeout
   */
  watch(
    () => productStore.getMapCachedProductDetail(),
    () => {
      refreshProductDetailCache();
    },
    { deep: true }
  );

  /**
   * Si se añade un nuevo listado de productos al array, iniciamos su timeout
   */
  watch(
    () => productStore.getCachedListProduct(),
    () => {
      refreshListProductCache();
    },
    { deep: true }
  );

  /**
   * Crea el timeout que consultará el detalle del producto contra la API pasados MILISECONDS_CACHED.
   */
  function refreshProductDetailCache() {
    const mapCached = productStore.getMapCachedProductDetail();

    Object.entries(mapCached).forEach(([productId, productData]) => {
      if (!productData.isTimeoutCreated) {
        productData.isTimeoutCreated = true;
        setTimeout(async () => {
          try {
            const response = await productService.getProductDetail(productId);
            productData.response = response.data;
            productData.isTimeoutCreated = false;
          } catch (error) {
            console.error(
              `No fue posible refrescar el detalle del producto con id ${productId}. La próxima vez que se requiera, deberá ser consultado a la API.`
            );
            delete mapCached[productId];
          }
        }, MILISECONDS_CACHED);
      }
    });
  }

  /**
   * Crea el timeout que consultará el detalle del producto contra la API pasados MILISECONDS_CACHED.
   */
  function refreshListProductCache() {
    setTimeout(async () => {
      try {
        const response = await productService.getListProduct();
        productStore.setCachedListProduct(response.data);
      } catch (error) {
        console.error(
          "No fue posible refrescar el listado de productos. La próxima vez que se requiera, deberá ser consultado a la API."
        );
        productStore.setCachedListProduct([]);
      }
    }, MILISECONDS_CACHED);
  }
}
