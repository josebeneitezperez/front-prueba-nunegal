import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "@/assets/js/config/router";
import vuetify from "@/plugins/vuetify";

import App from "@/App.vue";
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);

app.use(vuetify); //borrame si no lo uso
app.use(router);

app.use(createPinia());
app.mount("#app");
