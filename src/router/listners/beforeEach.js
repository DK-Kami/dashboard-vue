import webClient from '../../middleware/WebClient';

export default function (store) {
  return (to, from, next) => {
    const token = store.getters['auth/getToken'] ;
    if (token) {
      webClient.login(token);
    }

    if (store.getters['auth/isSigned'] && to.name === 'login') {
      next({ name: 'dashboard' });
    }
    else if (!store.getters['auth/isSigned'] && !to.meta.access) {
      next({ name: 'login' });
    }
    else next();
  }
};
