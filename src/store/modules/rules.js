/**
 * Example
 * const validateRule = (rule, value, callback) => ({ callback() });
 */

const loginRule = (_, value, callback) => {
  if (value.length < 3) callback(new Error('Login must be more than 2 symbols'))
  else callback();
};

export default {
  namespaced: true,

  state: {
    rules: {
      login: [{ validator: loginRule, trigger: 'blur' }],
    },
  },

  getters: {
    getRules: state => state.rules,
  },
};
