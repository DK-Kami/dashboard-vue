import Vue from 'vue';
import App from './App.vue';

import WebClient from './middleware/WebClient';
import routerInit from './router';
import store from './store';
import RStore from './helper/RStore';

import mainMixin from '@/helper/mixins/main';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

const router = routerInit(store);

// Доступ к роутеру и хранилищу из WebClient
WebClient.router = router;
WebClient.store = store;

Vue.mixin(mainMixin);

RStore.subscribe('afterUpdate', state => {
  store.dispatch(state ? 'auth/loginFromState' : 'unsetUserData', state);
  router.replace('/ping').catch(e => console.log(e));
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
