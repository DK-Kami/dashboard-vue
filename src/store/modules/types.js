import TypeServices from "../../middleware/services/TypeService";

export const initialState = () => ({
  accounts: [],
  infoTypes: [],
});

export const mutations = {
  SET_ACCOUNTS: (state, accounts) => state.accounts = accounts,
  SET_INFO_TYPES: (state, types) => state.infoTypes = types,
};

export const actions = {
  async loadAccounts({ commit }) {
    const accounts = (await TypeServices.loadAccounts()).data;
    commit('SET_ACCOUNTS', accounts);
  },
  async loadInfoTypes({ commit }) {
    const types = (await TypeServices.loadInfoTypes()).data;
    commit('SET_INFO_TYPES', types);
  },
};

export const getters = {
  getAccounts: state => state.accounts,
  getInfoTypes: state => state.infoTypes,
};
