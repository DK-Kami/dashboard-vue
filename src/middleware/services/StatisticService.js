export default {
  regenerateUrl() {
    return this.apiClient.get('statistic/regenerate');
  },
  loadStatistic() {
    return this.apiClient.get('statistic');
  },
};
