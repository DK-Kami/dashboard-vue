export default {
  loadStatistic() {
    return this.apiClient.get('statistic/');
  },
  refreshStatistic() {
    return this.apiClient.get('statistic/refresh');
  },
  saveStatistic(id) {
    return this.apiClient.post('statistic/save', { id });
  },
};
