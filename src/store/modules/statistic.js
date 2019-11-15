import StatisticService from "../../middleware/services/StatisticService";

export const initialState = () => ({
  statistic: [
    // {
    //   title: 'Статистические данные',
    //   component: 'Counter',
    //   name: 'Counter',
    //   data: [{
    //     title: 'Baka',
    //     value: 2,
    //   },
    //   {
    //     title: 'Baka',
    //     value: 2,
    //   },
    //   {
    //     title: 'Baka',
    //     value: 2,
    //   },
    //   {
    //     title: 'Baka',
    //     value: 2,
    //   }],
    // },
  ],
});

export const mutations = {
  SET_STATISTIC: (state, data) => state.statistic = data,
};

export const actions = {
  async loadStatistic({ commit }) {
    const { url, data } = (await StatisticService.loadStatistic()).data;
    commit('SET_STATISTIC', data);
    commit('auth/SET_URL', url, { root: true });
  },
};

export const getters = {
  getStatistics: state => state.statistic,
};
