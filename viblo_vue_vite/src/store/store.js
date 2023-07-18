import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import Vuex from 'vuex';

const LOCAL_STORAGE_KEY = 'todo-app';

export default new Vuex.Store({
  state: {
    tasks: [],
    newTask: '',
    toDos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
    newTodo: null,
    editting: null,
  },
  getters,
  mutations,
  actions,
});
