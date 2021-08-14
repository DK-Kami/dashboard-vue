import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from 'vuetify/lib/locale/ru';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#070924',
        secondary: '#44476D',
        accent: '#D500F9',
        error: '#D32F2F',
        info: '#00ACC1',
        success: '#00E676',
        warning: '#FFC107'
      },
    },
  },
    lang: {
      locales: { ru },
      current: 'ru',
    },
});
