import Vue from "vue";
import Vuex from "vuex";

// MODULOS
import game from "./modules/game";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { game },
});
