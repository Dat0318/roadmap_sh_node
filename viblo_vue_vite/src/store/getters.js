export default {
  newTask: (state) => state.newTask,
  tasks: (state) =>
    state.tasks.filter((task) => {
      return !task.completed;
    }),
  completedTask: (state) =>
    state.tasks.filter((task) => {
      return task.completed;
    }),
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
