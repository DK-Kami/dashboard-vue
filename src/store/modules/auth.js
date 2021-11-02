import AuthService from "../../middleware/services/AuthService";

export default {
  namespaced: true,

  state: {},

  actions: {
    async login({ commit }, { login, password }) {
      const { data } = (await AuthService.login(login, password));
      if (data && data.length) {
        return { data: data[0], error: false };
      }
      return { error: true, errorMessage: 'Not correct login/password' };
    },
  },
};
