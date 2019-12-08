export default {
  loadStatistic() {
    return this.apiClient.get('statistic/');
  },
  loadDashboard() {
    return this.apiClient.get('statistic/dashboard');
  },
  refreshStatistic() {
    return this.apiClient.get('statistic/refresh');
  },
  saveStatistic(id) {
    return this.apiClient.post('statistic/save', { id });
  },
  deleteStatistic(id) {
    return this.apiClient.post('statistic/delete', { id });
  },
  loadUserDashboard(token) {
    return this.apiClient.get('statistic/user-dashboard', { token });
  },
};
