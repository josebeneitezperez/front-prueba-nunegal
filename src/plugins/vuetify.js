import "vuetify/styles";
import { createVuetify } from "vuetify";
import { es, en } from "vuetify/locale";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, fa } from "vuetify/iconsets/fa";
import "@fortawesome/fontawesome-free/css/all.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
  locale: {
    locale: "es",
    fallback: "en",
    silent: true,
    messages: {
      es,
      en,
    },
  },
});

export default vuetify;
