import services from '@/middleware';
const { UserService } = services

export const initialState = () => ({
  isSigned: false,
  token: '',
  user: {
    nickname: '',
    avatar: '',
    email: '',
    url: '',
  }
});

export const mutations = {
  LOGIN: (state, { token, user }) => {
    state.isSigned = true;
    state.token = token;
    state.user = user;
  },
  CHANGE_PROFILE_DATA: (state, { nickname, email }) => {
    state.nickname = nickname;
    state.email = email;
  },
  SET_URL: (state, url) => state.user.url = url,
};

export const actions = {
  loginFromState: ({ commit }, data) => commit('LOGIN', data),

  login({ commit, dispatch }, { login, password }) {
    return new Promise(res => {
      UserService.login({ login, password })
        .then(response => {
          const token = response.token;
          const user = {
            nickname: response.nickname,
            avatar: response.avatar,
            email: response.email,
            url: response.url,
          }

          commit('LOGIN', { token, user });
          dispatch('saveToLocaleStorage', { token, user }, { root: true });
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
  getNickname: state => state.user.nickname,
  getAvatar: state => state.user.avatar,
  getEmail: state => state.user.email,
  isSigned: state => state.isSigned,
  getToken: state => state.token,

  getUser: (_, getters) => ({
    nickname: getters.getNickname,
    avatar: getters.getAvatar,
    email: getters.getEmail,
  }),
  getUrl: state => state.user.url,
};
