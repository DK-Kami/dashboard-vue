import UserService from "../../middleware/services/UserService";

export const initialState = () => ({
  userEdit: {
    accounts: [],
    nickname: '',
    avatar: '',
    email: '',
    info: [],
  },
  accounts: [],
  info: [],
});

export const mutations = {
  LOAD_PROFILE: (state, data) => {
    state.accounts = state.userEdit.accounts = data.accounts;
    state.info = state.userEdit.info = data.info;

    state.userEdit.nickname = data.nickname;
    state.userEdit.email = data.email;
  },
  SET_ACCOUNTS: (state, accounts) => state.accounts = accounts,
  SET_USER_INFO: (state, info) => state.info = info,

  ADD_ACCOUNT: (state, account) => {
    const accounts = state.accounts.filter(a => a.name !== account.name).slice(0);
    accounts.push(account);
    state.accounts = accounts;
  },
};

export const actions = {
  async loadProfile({ commit, dispatch }) {
    const user = await UserService.loadProfile();
    dispatch('auth/changeProfileData', user, { root: true });
    commit('LOAD_PROFILE', user);
    return {
      error: false,
      data: user,
    };
  },

  uploadAvatar({ commit }, file) {
    return UserService.uploadAvatar(file);
  },

  setCurrentUserAccount({ commit, dispatch }, data = { account, token }) {
    commit('ADD_ACCOUNT', {
      ...data.account,
      value: data.token,
    });

    return new Promise(res => {
      UserService
        .setCurrentUserAccount(data)
        .then(() => {
          dispatch('notification/set', {
            message: 'Аккаунт привзан',
            type: 'success',
          }, { root: true });
          res({ error: false });
        })
        .catch(err => {
          console.error(err);
          dispatch('notification/set', {
            message: 'Произошла ошибка',
            type: 'error',
          }, { root: true });
          res({ error: true });
        })
    })
  },

  saveProfile({ state, commit, dispatch }, { info = [], accounts = []}) {
    return new Promise(res => {
      const user = state.userEdit;
      dispatch('auth/changeProfileData', user, { root: true });

      if (info) {
        user.info = info.filter(i => !!i.value).slice(0);
        commit('SET_USER_INFO', user.info.slice(0));
        user.info = JSON.stringify(user.info);
      }

      if (accounts) {
        user.accounts = accounts.filter(i => !!i.value).slice(0);
        commit('SET_ACCOUNTS', user.accounts.slice(0));
        user.accounts = JSON.stringify(user.accounts);
      }

      UserService.saveProfile(user)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Изменения профиля сохранены',
            type: 'success',
          }, { root: true });
        })
        .catch(error => {
          res({ error: true })
          console.error(error);
          dispatch('notification/set', {
            message: 'Произошла ошибка при сохранение',
            type: 'error',
          }, { root: true });
        });
    });
  },
};

export const getters = {
  getUserAccounts: state => state.accounts,
  getUserForEdit: state => state.userEdit,
  getUserInfo: state => state.info,
};
