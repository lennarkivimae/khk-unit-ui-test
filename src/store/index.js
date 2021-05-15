import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    loggedin : false,
  },
  getters: {
    loggedin: (state) => {
      return state.loggedin;
    }
  },
  mutations: {
    login: (state) => {
      state.loggedin = true
    }
  },
  actions: {
    login: (state) => {
      this.commit('login', state);
    }
  },
  modules: {},
});
