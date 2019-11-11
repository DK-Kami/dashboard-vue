import TypeServices from "../../middleware/services/TypeService";

export const initialState = () => ({
  accounts: [],
  infoTypes: [],
});

export const mutations = {
  SET_ACCOUNTS: (state, types) => state.accounts = types,
  SET_INFO_TYPES: (state, types) => state.infoTypes = types,
};

export const actions = {
  async loadaccounts({ commit }) {
    const types = (await TypeServices.loadaccounts()).data;
    commit('SET_ACCOUNTS', types);
  },
  async loadInfoTypes({ commit }) {
    const types = (await TypeServices.loadInfoTypes()).data;
    commit('SET_INFO_TYPES', types);
  },
};

export const getters = {
  getaccounts: state => state.accounts,
  getInfoTypes: state => state.infoTypes,
};
