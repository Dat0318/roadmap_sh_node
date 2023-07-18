export default {
  getTask(state, task) {
    state.newTask = task;
  },
  addTask(state) {
    state.tasks.push({
      body: state.newTask,
      completed: false,
    });
  },
  editTask(state, task) {
    var tasks = state.tasks;
    tasks.splice(tasks.indexOf(task), 1);
    state.tasks = tasks;
    state.newTask = task.body;
  },
  removeTask(state, task) {
    var tasks = state.tasks;
    tasks.splice(tasks.indexOf(task), 1);
  },
  completeTask(state, task) {
    task.completed = !task.completed;
  },
  clearTask(state) {
    state.newTask = '';
  },

  addTaskItem(state, newToDo) {
    console.log('========================================');
    console.log('state, newToDo: ', state, newToDo);
    console.log('========================================');
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
