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
      title: 'График',
      component: 'ColumnChart',
      name: 'columnChart',
      data: [],
    },
  ],
});

export const mutations = {
  SET_STATISTIC: ({ statistic }, data) => {
    statistic.forEach(s => s.data = []);

    data.forEach(item => {
      statistic.find(s => s.name === 'columnChart').data = item.chartsWithData;
      statistic.find(s => s.name === 'counter').data = item.counters;
    });
  },
};

export const actions = {
  async loadStatistic({ commit }) {
    const { url, data } = (await StatisticService.loadStatistic()).data;
    commit('SET_STATISTIC', data);
    commit('auth/SET_URL', url, { root: true });
  },

  async refreshStatistic({ commit }) {
    const data = (await StatisticService.refreshStatistic()).data;
    commit('SET_STATISTIC', data);
  }
};

export const getters = {
  getStatistics: state => state.statistic,
};
