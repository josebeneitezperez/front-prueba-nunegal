import { createRouter, createWebHistory } from "vue-router";
import ProductListPage from "@/components/pages/ProductListPage.vue";
import ProductPage from "@/components/pages/ProductPage.vue";

const routes = [
  { path: "/", name: "ProductListPage", component: ProductListPage },
  { path: "/product/:id", name: "ProductPage", component: ProductPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
