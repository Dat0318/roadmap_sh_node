import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default new Vuex.Store({
  state: {
    tasks: [],
    newTask: '',
  },
  getters,
  mutations,
  actions,
});
