import UserService from "../../middleware/services/UserService";

export const initialState = () => ({
  userEdit: {
    contacts: [],
    nickname: '',
    avatar: '',
    email: '',
    info: [],
  },
  contacts: [],
  info: [],
});

export const mutations = {
  LOAD_PROFILE: (state, data) => {
    state.contacts = state.userEdit.contacts = data.contacts;
    state.info = state.userEdit.info = data.info;

    state.userEdit.nickname = data.nickname;
    state.userEdit.email = data.email;
  },
  SET_CONTACTS: (state, contacts) => state.contacts = contacts,
  SET_USER_INFO: (state, info) => state.info = info,
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

  saveProfile({ state, commit, dispatch }, info) {
    return new Promise(res => {
      const user = state.userEdit;
      user.info = info.filter(i => !!i.value).slice(0);
      dispatch('auth/changeProfileData', user, { root: true });
      commit('SET_USER_INFO', user.info.slice(0));
      user.info = JSON.stringify(user.info);

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
  getUserContacts: state => state.contacts,
  getUserForEdit: state => state.userEdit,
  getUserInfo: state => state.info,
};
