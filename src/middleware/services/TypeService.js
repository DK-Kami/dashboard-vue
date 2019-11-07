export default {
  loadInfoTypes() {
    return this.apiClient.get('/info-types');
  },
  loadContactTypes() {
    return this.apiClient.get('/contact-types');
  },
};
