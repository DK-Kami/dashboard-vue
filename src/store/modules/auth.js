import AuthService from "../../middleware/services/AuthService";

export const initialState = () => ({
  isSigned: false,
  nickname: '',
  email: '',
});

export const mutations = {
  LOGIN: (state, { nickname, email }) => {
    state.nickname = nickname;
    state.email = email;
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

export const getters = {
  getNickname: state => state.nickname,
  isSigned: state => state.isSigned,
  getEmail: state => state.email,
}
