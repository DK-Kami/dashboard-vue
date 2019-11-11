export default {
  loadInfoTypes() {
    return this.apiClient.get('/info-types');
  },
  loadaccounts() {
    return this.apiClient.get('/contact-types');
  },
};
