// store/store.js

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getter from './getter';

Vue.use(Vuex);
const LOCAL_STORAGE_KEY = 'todo-app';

export default new Vuex.Store({
  state: {
    toDos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
    newTodo: null,
    editting: null,
  },
  mutations: mutations,
  getters: getter,
  actions: actions,
});
