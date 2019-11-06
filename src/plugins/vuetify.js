import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#142748',
        accent: '#7030a0',
        secondary: '#00b0f0',
        success: '#92d050',
        warning: '#ffc000',
        error: '#f44336',
        info: '#009688',
      },
    },
  },
  lang: {
    locales: { ru },
    current: 'ru',
  },
  icons: {
    iconfont: 'fa4',
  },
});
