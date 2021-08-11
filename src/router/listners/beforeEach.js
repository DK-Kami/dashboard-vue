import webClient from '../../middleware/WebClient';

const lastRoute = {};

function isEmpty(object) {
  return !Object.keys(object).length;
};

/**
 * Хук роутера, вызывается перед переходом на страницу 
 * @param {VueX.Store} store Хранилище приложения
 */
export default function (store) {
  return (to, from, next) => {
    const token = store.getters['auth/getToken'];
    const isSigned = store.getters['auth/isSigned'];

    if (token) {
      webClient.login(token);
    }

    const isPing = !!(to.path === '/ping' && lastRoute);
    const { name, meta, path } = isPing ? lastRoute : to;
    const { access } = meta;

    if ((isEmpty(lastRoute) && to.name === 'login') || to.name !== 'login') Object.assign(lastRoute, to);
    if (!isSigned) {
      if (access && name) return next((isPing && path) || true);
      return next('/login');
    }
    if (!to.meta.access) {
      return next((isPing && path) || true);
    }
    return next({ name: 'dashboard' });
  }
};
