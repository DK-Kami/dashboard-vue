import AuthService from "../../middleware/services/AuthService";

export const initialState = () => ({
  isSigned: false,
  nickname: '',
  login: '',
});

export const mutations = {
  LOGIN: (state, { nickname, login }) => {
    state.nickname = nickname;
    state.login = login;
    state.isSigned = true;
  },
};

export const actions = {
  login({ commit }, { login, password }) {
    return new Promise(res => {
      AuthService.login({login, password})
        .then(user => {
          commit('LOGIN', user);
          res({ error: false, data: user });
        })
        .catch(err => {
          res({ error: true, data: err });
        });
    });
  },
};
