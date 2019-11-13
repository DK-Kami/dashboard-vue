import StatisticService from "../../middleware/services/StatisticService";

export const initialState = () => ({
  statistic: [],
  url: '',
});

export const mutations = {
  SET_STATISTIC: (state, data) => state.statistic = data,
  SET_URL: (state, url) => state.url = url,
};

export const actions = {
  async loadStatistic({ commit }) {
    const { url, data } = (await StatisticService.loadStatistic()).data;
    commit('SET_STATISTIC', data);
    commit('SET_URL', url);
  },
  async regenerateUrl({ commit, dispatch }) {
    const url = (await StatisticService.regenerateUrl()).data;
    commit('SET_URL', url);

    dispatch({
      message: 'Новая ссылка была сгенерирована',
      type: 'success',
    })
  }
};

export const getters = {
  getStatistics: state => state.statistic,
  getUrl: state => state.url,
};
