import { createApp } from "vue";
import { createPinia } from "pinia";
import vuetify from "@/plugins/vuetify";
import App from "@/App.vue";
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());
app.mount("#app");
