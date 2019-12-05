import Vue from 'vue';
import App from './App.vue';
import store from './store';
import initRouter from './router';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import RStore from './helper/RStore';

Vue.config.productionTip = false;

const router = initRouter(store);

RStore.subscribe('afterUpdate', state => {
  store.dispatch(state ? 'auth/loginFromState' : 'unsetUserData', state);
  return router.push('/');
});

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
