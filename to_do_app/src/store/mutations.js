// store/mutations.js

export default {
  addTask(state, newToDo) {
    if (newToDo.length) {
      state.toDos.push({
        title: newToDo,
        completed: false,
      });
      state.newTodo = null;
    }
  },
  deleteToDo(state, item) {
    const index = state.toDos.indexOf(item);
    state.toDos.splice(index, 1);
  },
  doneEdit(state) {
    state.editting = null;
  },
};
