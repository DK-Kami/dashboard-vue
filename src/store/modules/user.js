import UserService from '@services/UserService';
import VuexModule from '../VuexModule';

const UserModule = new VuexModule({
  initialState: () => ({
    userEdit: {
      accounts: [],
      nickname: '',
      avatar: '',
      email: '',
      info: [],
    },
    accounts: [],
    info: [],
  }),
  
  mutations: {
    LOAD_PROFILE: (state, data) => {
      state.accounts = state.userEdit.accounts = data.accounts;
      state.info = state.userEdit.info = data.info;
  
      state.userEdit.nickname = data.nickname;
      state.userEdit.avatar = data.avatar;
      state.userEdit.email = data.email;
    },
    SET_ACCOUNTS: (state, accounts) => state.accounts = accounts,
    SET_USER_INFO: (state, info) => state.info = info,
  
    ADD_ACCOUNT: (state, account) => {
      const accounts = state.accounts.filter(a => a.name !== account.name).slice(0);
      accounts.push(account);
      state.accounts = accounts;
    },
  },
  
  actions: {
    async loadProfile({ commit, dispatch }) {
      const user = await UserService.loadProfile();
      dispatch('auth/changeProfileData', user, { root: true });
      commit('LOAD_PROFILE', user);
      return {
        error: false,
        data: user,
      };
    },
  
    uploadAvatar(_, file) {
      return UserService.uploadAvatar(file);
    },
  
    async setCurrentUserAccount({ commit, dispatch }, data = { account, token }) {
      commit('ADD_ACCOUNT', {
        ...data.account,
        value: data.token,
      });
  
      try {
        await UserService.setCurrentUserAccount(data)
        dispatch('notification/set', {
          message: 'Аккаунт привзан',
          type: 'success',
        }, { root: true });
        return { error: false };
      }
      catch(err) {
        console.error(err);
        dispatch('notification/set', {
          message: 'Произошла ошибка',
          type: 'error',
        }, { root: true });
        return { error: true };
      };
    },
  
    async saveProfile({ state, commit, dispatch }, { info = [], accounts = []}) {
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

      try {
        await UserService.saveProfile(user)
        dispatch('notification/set', {
          message: 'Изменения профиля сохранены',
          type: 'success',
        }, { root: true });
        return { error: false };
      }
      catch(error) {
        console.error(error);
        dispatch('notification/set', {
          message: 'Произошла ошибка при сохранение',
          type: 'error',
        }, { root: true });
        return { error: true };
      };
    },
  },
  
  getters: {
    getUserAccounts: state => state.accounts,
    getUserForEdit: state => state.userEdit,
    getUserInfo: state => state.info,
  },
});

export default UserModule;
