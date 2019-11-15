export default {
  loadStatistic() {
    return this.apiClient.get('statistic/');
  },
  refreshStatistic() {
    return this.apiClient.get('statistic/');
  }
};
