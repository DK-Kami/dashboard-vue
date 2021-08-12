import TypeServices from '@services/TypeService';
import VuexModule from '../VuexModule';

const TypeModule = new VuexModule({
  initialState: () => ({
    accounts: [],
    infoTypes: [],
  }),
  
  mutations: {
    SET_ACCOUNTS: (state, accounts) => state.accounts = accounts,
    SET_INFO_TYPES: (state, types) => state.infoTypes = types,
  },

  actions: {
    async loadAccounts({ commit }) {
      const accounts = (await TypeServices.loadAccounts()).data;
      commit('SET_ACCOUNTS', accounts);
    },
    async loadInfoTypes({ commit }) {
      const types = (await TypeServices.loadInfoTypes()).data;
      commit('SET_INFO_TYPES', types);
    },
  },
  
  getters: {
    getAccounts: state => state.accounts,
    getInfoTypes: state => state.infoTypes,
  },
});

export default TypeModule;
