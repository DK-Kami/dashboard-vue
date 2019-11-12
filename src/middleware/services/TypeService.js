export default {
  loadInfoTypes() {
    return this.apiClient.get('/info-types');
  },
  loadAccounts() {
    return this.apiClient.get('/accounts');
  },
};
