// store/actions.js

export default {
  addTask({ commit }, newToDo) {
    commit('addTask', newToDo);
  },
  deleteToDo({ commit }, item) {
    commit('deleteToDo', item);
  },
  doneEdit({ commit }, item) {
    commit('doneEdit', item);
  },
};
