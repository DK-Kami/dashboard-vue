import VuexModule from "../VuexModule";

const NotificationModule = new VuexModule({
  initialState: () => ({
    show: false,
    message: '',
    type: '',
  }),
  
  mutations: {
    SET(state, { type, message }) {
      state.type = type;
      state.message = message;
    },
    CHANGE_SHOW: (state, show) => state.show = show,
  },

  actions: {
    set({ commit }, notification) {
      commit('SET', notification);
      commit('CHANGE_SHOW', true);
    },
  },
});

export default NotificationModule;
