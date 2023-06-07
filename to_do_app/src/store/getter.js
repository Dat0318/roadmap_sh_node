// store/getter.js

export default {
  notDone: (state) => {
    return state.toDos.filter((m) => m.completed == false).length;
  },
  Done: (state) => {
    return state.toDos.filter((m) => m.completed == true).length;
  },
  allTasks: (state) => {
    return state.toDos.length;
  },
  count: (state) => {
    return state.count;
  },
};
