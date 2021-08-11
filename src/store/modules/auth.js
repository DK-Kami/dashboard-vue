import AuthService from '@services/AuthService'
import VuexModule from '../VuexModule';

const AuthModule = new VuexModule({
  initialState: () => ({
    isSigned: false,
    token: '',
    user: {
      nickname: '',
      avatar: '',
      email: '',
      url: '',
    }
  }),

  mutations: {
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
  },

  actions: {
    loginFromState: ({ commit }, data) => commit('LOGIN', data),
  
    async login({ commit, dispatch }, { login, password }) {
      const user = (await AuthService.login({ login, password }));
      const token = user.token;

      commit('LOGIN', { token, user });
      dispatch('saveToLocaleStorage', { token, user }, { root: true });
    },

    async registration({ commit }, { password, nickname, email }) {
      try {
        const user = (await AuthService.register({password, nickname, email}));
        dispatch('notification/set', {
          message: 'Пользователь зарегистрирован',
          type: 'success',
        }, { root: true });
      }
      catch(err) {
        let message = 'Произошла ошибка сервера, попробуйте позже';
        if (err.nickname) {
          message = 'Пользователь с таким именем уже существует';
        }
        if (err.email) {
          message = 'Данный email уже используется';
        }

        return { error: true, data: message };
      }
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
  },
  
  getters: {
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
  },
});

export default AuthModule;
