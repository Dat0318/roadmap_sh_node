<template>
  <div id="completed-tasks">
    <div class="panel panel-default">
      <div class="panel-heading my-completed">
        <h3 class="panel-title">Completed<span class="completed-length" v-if="completed.length > 0">{{ completed.length
        }}</span></h3>
      </div>
      <div class="panel-body">
        <ul class="list-group" name="slide-fade" is="transition-group">
          <li class="list-group-item complete-list" v-for="(task, index) in completed" v-bind:key="index">
            <img src="http://lazi.vn/files/large/5a64450874df215" alt="" width="53">
            {{ task.body }}
            <button type="button" @click="remove(task)" class="btn btn-danger btn-sm remove-completed">
              <span class="glyphicon glyphicon-remove-circle"></span> Remove
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    remove(task) {
      this.$store.dispatch('removeTask', task)
    }
  },
  computed: {
    completed() {
      return this.$store.getters.completedTask;
    }
  }
}
</script>

