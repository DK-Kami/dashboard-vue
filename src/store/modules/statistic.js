import StatisticService from "../../middleware/services/StatisticService";

export const initialState = () => ({
  statistic: [
    {
      title: 'Статистические данные',
      component: 'Counter',
      name: 'counter',
      data: [],
    },
    {
      title: 'Гистограмма',
      component: 'ColumnChart',
      name: 'columnChart',
      data: [],
    },
    {
      title: 'Круговая диаграмма',
      component: 'PieChart',
      name: 'pieChart',
      data: [],
    },
  ],
});

export const mutations = {
  SET_STATISTIC: (state, data) => {
    state.statistic.forEach(s => s.data = []);

    const stats = state.statistic.map(stat => {
      const currentStatistic = data.filter(d => d.type.type === stat.name);
      return {
        ...stat,
        data: currentStatistic.slice(),
      };
    });
    state.statistic = stats.slice();
  },
};

export const actions = {
  async loadStatistic({ commit }) {
    const { url, data } = (await StatisticService.loadStatistic()).data;
    commit('SET_STATISTIC', data);
    commit('auth/SET_URL', url, { root: true });
  },
  async loadDashboard({ state }) {

    const statistic = state.statistic.slice();
    const data = (await StatisticService.loadDashboard()).data;

    statistic.forEach(stat => {
      const currentStatistic = data.filter(d => d.type.type === stat.name);
      stat.data = currentStatistic;
    });
    return statistic;
  },
  async loadUserDashboard({ state }, token) {
    const statistic = state.statistic.slice();
    const data = (await StatisticService.loadUserDashboard(token)).data;

    statistic.forEach(stat => {
      const currentStatistic = data.filter(d => d.type.type === stat.name);
      stat.data = currentStatistic;
    });
    return statistic;
  },

  async refreshStatistic({ commit }) {
    const data = (await StatisticService.refreshStatistic()).data;
    commit('SET_STATISTIC', data);
  },

  async saveUserStatistic(_, element) {
    console.log(element.item._id);
    await StatisticService.saveStatistic(element.item._id);
  },

  async deleteUserStatistic(_, id) {
    console.log(id);
    await StatisticService.deleteStatistic(id);
  },
};

export const getters = {
  getStatistics: state => state.statistic,
};
