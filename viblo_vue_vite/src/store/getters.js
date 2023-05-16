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
};
