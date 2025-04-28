import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "@/assets/js/config/router";
import vuetify from "@/plugins/vuetify";
import App from "@/App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import { initCachedResponsesHandler } from "@/assets/js/common/cachedResponsesHandler";

const app = createApp(App);
app.use(createPinia());

app.use(vuetify);
app.use(router);
app.mount("#app");
initCachedResponsesHandler(); //Inicia el manejador del cacheo de las llamadas a la API
