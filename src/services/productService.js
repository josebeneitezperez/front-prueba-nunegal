import { apiService } from "@/services/apiService";

export function getListProduct() {
  return apiService.get("/api/product");
}

export function getProductDetail(productId) {
  return apiService.get(`/api/product/${productId}`);
}

export function postProductToCart(cartData) {
  return apiService.post("/api/cart", cartData);
}
