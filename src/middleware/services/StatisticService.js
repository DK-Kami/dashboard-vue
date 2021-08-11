import webClient from '../WebClient';

export default {
  loadStatistic() {
    return webClient.get('statistic/');
  },
  loadDashboard() {
    return webClient.get('statistic/dashboard');
  },
  refreshStatistic() {
    return webClient.get('statistic/refresh');
  },
  saveStatistic(id) {
    return webClient.post('statistic/save', { id });
  },
  deleteStatistic(id) {
    return webClient.post('statistic/delete', { id });
  },
  loadUserDashboard(token) {
    return webClient.get('statistic/user-dashboard', { token });
  },
};
