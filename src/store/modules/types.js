import TypeServices from "../../middleware/services/TypeService";

export const initialState = () => ({
  contactTypes: [],
  infoTypes: [],
});

export const mutations = {
  SET_CONTACT_TYPES: (state, types) => state.contactTypes = types,
  SET_INFO_TYPES: (state, types) => state.infoTypes = types,
};

export const actions = {
  async loadContactTypes({ commit }) {
    const types = (await TypeServices.loadContactTypes()).data;
    commit('SET_CONTACT_TYPES', types);
  },
  async loadInfoTypes({ commit }) {
    const types = (await TypeServices.loadInfoTypes()).data;
    commit('SET_INFO_TYPES', types);
  },
};

export const getters = {
  getContactTypes: state => state.contactTypes,
  getInfoTypes: state => state.infoTypes,
};
