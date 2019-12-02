import UserService from "../../middleware/services/UserService";

export const initialState = () => ({
  isSigned: false,
  nickname: '',
  email: '',
  token: '',
  url: '',
});

export const mutations = {
  LOGIN: (state, { nickname, email, token, url }) => {
    state.nickname = nickname;
    state.email = email;
    state.token = token;
    state.url = url;
    state.isSigned = true;
  },
  CHANGE_PROFILE_DATA: (state, { nickname, email }) => {
    state.nickname = nickname;
    state.email = email;
  },
  SET_URL: (state, url) => state.url = url,
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
  registration({ commit }, { password, nickname, email }) {
    return new Promise(res => {
      UserService.register({password, nickname, email})
        .then(user => {
          res({ error: false, data: user });
          dispatch('notification/set', {
            message: 'Пользователь зарегистрирован',
            type: 'success',
          }, { root: true });
        })
        .catch(err => {
          res({ error: true, data: err });
        });
    });
  },
  changeProfileData({ commit }, user) {
    commit('CHANGE_PROFILE_DATA', user);
  },
  async regenerateUrl({ commit, dispatch }) {
    const { url } = (await UserService.regenerateUrl()).data.user;
    commit('SET_URL', url);

    dispatch('notification/set', {
      message: 'Новая ссылка была сгенерирована',
      type: 'success',
    }, { root: true });
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
  getUrl: state => state.url,
};
