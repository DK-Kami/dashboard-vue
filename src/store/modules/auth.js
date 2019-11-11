import UserService from "../../middleware/services/UserService";

export const initialState = () => ({
  isSigned: false,
  nickname: '',
  token: '',
});

export const mutations = {
  LOGIN: (state, { nickname, email, token }) => {
    state.nickname = nickname;
    state.email = email;
    state.token = token;
    state.isSigned = true;
  },
  CHANGE_PROFILE_DATA: (state, { nickname, email }) => {
    state.nickname = nickname;
    state.email = email;
  },
};

export const actions = {
  login({ commit }, { login, password }) {
    return new Promise(res => {
      UserService.login({login, password})
        .then(user => {
          commit('LOGIN', user);
          res({ error: false, data: user });
        })
        .catch(err => {
          res({ error: true, data: err });
        });
    });
  },
  changeProfileData({ commit }, user) {
    commit('CHANGE_PROFILE_DATA', user);
  },
};

export const getters = {
  getNickname: state => state.nickname,
  getAvatar: state => state.nickname.charAt(0),
  isSigned: state => state.isSigned,
  getEmail: state => state.email,
  getToken: state => state.token,

  getUser: (_, getters) => ({
    nickname: getters.getNickname,
    avatar: getters.getAvatar,
    email: getters.getEmail,
  }),
}
