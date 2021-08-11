import webClient from '../WebClient';

export default {
  loadInfoTypes() {
    return webClient.get('/info-types');
  },
  loadAccounts() {
    return webClient.get('/accounts');
  },
};
