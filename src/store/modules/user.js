import UserService from "../../middleware/services/UserService";

export const initialState = () => ({
  contacts: [],
  info: [],
});

export const mutations = {
  SET_CONTACTS: (state, contacts) => state.contacts = contacts,
  SET_USER_INFO: (state, info) => state.info = info,
};

export const actions = {
  async loadProfile({ commit }) {
    const { contacts, info } = await UserService.loadProfile();

    commit('SET_CONTACTS', contacts);
    commit('SET_USER_INFO', info);
  },
};

export const getters = {
  getUserContacts: state => state.contacts,
  getUserInfo: state => state.info,
};
