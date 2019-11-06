export default function (store) {
  return (to, _, next) => {
    if (store.getters['auth/isSigned'] && to.name === 'login') {
      next({ name: 'dashboard' });
    }
    else if (!store.getters['auth/isSigned'] && !to.meta.access) {
      next({ name: 'login' });
    }
  }
};
