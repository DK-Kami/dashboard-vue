import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import services from '@/middleware';
import modules from './modules';

import initialModules from './initialModules';

Vue.use(Vuex);

const initialState = () => ({
  rules: {
    required: v => Array.isArray(v)
      ? !!v.length || "Обязательно к заполнению."
      : !!v || "Обязательно к заполнению.",
    email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Неправильный e-mail.'
    },
  },

  perPages: {
    table: [10, 25, 50, 100],
    card: [6, 12, 24, 36, 60]
  }
});

export default new Vuex.Store({
  state: initialState(),
  getters: {
    getRules: state => state.rules,
    getPerPage: state => state.perPages,
  },
  actions: {
    unsetUserData({ commit }) {
      Object.keys(modules).forEach(m => {
        commit(`${m}/UNSET_DATA`)
      });
      commit('UNSET_DATA');
    },
  },
  mutations: {
    UNSET_DATA: state => state = initialState(),
  },
  modules: initialModules(modules),
  plugins: [createPersistedState()],
});