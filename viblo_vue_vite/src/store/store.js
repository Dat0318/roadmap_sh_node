import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import localStorage from '@data/localStorage';

const LOCAL_STORAGE_KEY = 'todo-app';

const KEY = 'vue-demo',
  vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    key: KEY, // key của localStorage
    modules: ['localStorage'],
  });

export default new Vuex.Store({
  namespaced: true,
  state: {
    tasks: [],
    newTask: '',
    toDos: JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
    newTodo: null,
    editting: null,
  },
  getters,
  mutations,
  actions,
  modules: { localStorage },
  plugins: [vuexLocal.plugin],
});
