// initial state
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: undefined,
  }),
  mutations: {
    updateUser(state, user) {
      state.loginUser = user;
    },
  },
} as StoreOptions<any>;
