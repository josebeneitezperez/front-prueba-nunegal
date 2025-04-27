import { createRouter, createWebHistory } from "vue-router";
import { ref } from "vue";
import ProductListPage from "@/components/pages/ProductListPage.vue";
import ProductPage from "@/components/pages/ProductPage.vue";

const breadcrumbHistory = ref([]);
const routes = [
  {
    path: "/",
    name: "ProductListPage",
    component: ProductListPage,
    meta: { breadcrumbText: "Listado de productos" },
  },
  {
    path: "/product/:id",
    name: "ProductPage",
    component: ProductPage,
    meta: { breadcrumbText: "Detalle del producto" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  addFirstPageToBreadcrumbIfNotExist();

  const existingIndex = breadcrumbHistory.value.findIndex(
    (crumb) => crumb.path === to.fullPath
  );

  //Si el historico ya contiene la ruta a la que nos dirigimos, eliminamos de este las páginas posteriores
  existingIndex !== -1
    ? breadcrumbHistory.value.splice(existingIndex + 1)
    : breadcrumbHistory.value.push({
        label: to.meta?.breadcrumbText,
        path: to.fullPath,
      });

  next(); //Continúa a la ruta que acabamos de acceder
});

/**
 * Añade la página inicial al historico si esta no estaba en él.
 * Cubre el caso en el que el usuario recargue una página distinta de la inicial.
 */
function addFirstPageToBreadcrumbIfNotExist() {
  if (!breadcrumbHistory.value.some((crumb) => crumb.path === "/")) {
    breadcrumbHistory.value.unshift({
      label: routes.find((r) => r.path === "/")?.meta?.breadcrumbText,
      path: "/",
    });
  }
}

export { router, breadcrumbHistory };
