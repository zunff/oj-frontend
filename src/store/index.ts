import { createStore } from "vuex";
import user from "@/store/user";

export default createStore({
  state: {
    loading: false,
  },
  getters: {},
  actions: {
    setLoading({ commit }, payload) {
      commit("SET_LOADING", payload);
    },
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  modules: {
    user,
  },
});
