/**
 * Модуль хранилища
 */

import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import RStore from '../helper/RStore';
import WebClient from '../middleware/WebClient';

Vue.use(Vuex);

/**
 * Первичное состояние.
 * Вынесено в отдельную функцию, для быстрого возврата в начальное состояние
 */
const initialState = () => ({
  // Правила для валидации полей формы
  rules: {
    required: v => {
      const value = (typeof v === 'number') ? v.toString() : v;
      return (!!value && !!value.length) || 'Обязательно для заполнения';
    },
    range: ({ min, max }) => {
      return value => {
        if (!Number.isInteger(+value)) return 'Значение должно быть числом';
        if (value < min) return 'Значение должно быть больше ' + min;
        return value <= max || 'Значение не должно превышать ' + max;
      }
    },
    email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Неправильный e-mail.'
    },
    min: type => {
      const message = 'Недостаточно символов';
      switch(type) {
        case 'phone':
          return v => (v + '').length === 18 || message;

        case 'name':
          return v => v.length > 3 || 'Имя должно содержать больше символов';

        case 'password':
          return v => v.length > 8 || 'Пароль должен быть больше 8 символов';

        default:
          return true;
      };
    }
  },

  perPages: {
    table: [10, 25, 50, 100],
    card: [6, 12, 24, 36, 60]
  },
});

const vuex = new Vuex.Store({
  state: initialState(),

  mutations: {
    UNSET_DATA: state => state = initialState(),
  },

  actions: {
    saveToLocaleStorage(_, data) {
      RStore.initState(data);
    },
    unsetUserData({ commit, dispatch }) {
      Object.keys(modules).forEach(module => {
        commit(`${module}/UNSET_DATA`);
      });
      commit('UNSET_DATA');
      dispatch('saveToLocaleStorage');
			WebClient.logout();
		},
  },

  getters: {
    getPerPages: state => state.perPages,
		getRules: state => state.rules,
  },

  modules,
});

export default vuex;
