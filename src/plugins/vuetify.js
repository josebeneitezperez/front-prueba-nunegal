import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { es, en } from 'vuetify/locale'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    locale: {
      locale: 'es',
      fallback: 'en',
      messages: {
        es,
        en,
      },
    },
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi: {
          component: 'mdi', //borrame probar si este sobra
        },
      },
    },
})

export default vuetify
