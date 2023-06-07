<template>
  <div class="hello">
    {{ count }}
    <div class="box p-4">
      <div class="form-group ml-5 mr-5 row">
        <div class="col-10">
          <input class="form-control" autofocus v-model.trim="newTodo" @keyup.enter="Add"
            placeholder="Nhập việc cần làm và ấn Enter để thêm">
        </div>
        <div class="col-2">
          <button @click="Add" class="btn btn-primary">
            Add task
          </button>
        </div>
      </div>
      <div>
        <table class="mt-3 listTodo">
          <p v-if="toDos.length <= 0">
            Danh sách trống
          </p>
          <tr v-for="item in toDos" :key="item.id" :class="{ completed: item.completed }">
            <td>
              <input class="mark" type="checkbox" v-model="item.completed">
              <span class="checkmark">
              </span>
            </td>
            <td>
              <div class="ok">
                <label @click="edit(item)">
                  {{ item.title | capitalize }}
                </label>
                <input v-if="editting == item && item.completed != true" v-model="item.title" :class="{}"
                  @keyup.escape="doneEdit" @keyup.enter="doneEdit">
              </div>
            </td>
            <td width="20%">
              <a @click="Delete(item)" title="Xóa" class="delete badge badge-danger">
                x
              </a>
            </td>
          </tr>
        </table>
        <div class="m-5 text-left">
          <b> Bạn có {{ allTasks }} task </b>
          <span class="badge badge-warning">
            Task còn lại: {{ notDone }}
          </span>
          <span class="badge badge-success">
            Task đã xong: {{ Done }}
          </span>
        </div>
      </div>
    </div>
    <br>
    <span> Click vào task để sửa, ấn Enter để submit </span>
  </div>
</template>

<script>
const LOCAL_STORAGE_KEY = 'todo-app'

export default {
  name: 'ToDoList',
  data: function () {
    return {
      toDos: this.$store.state.toDos,
      newTodo: this.$store.state.newToDo,
      editting: this.$store.state.editting
    }
  },
  methods: {
    Add() {
      this.$store.dispatch('addTask', this.newTodo)
    },
    Delete(item) {
      this.$swal.fire({
        title: 'are you sure?',
        icon: 'warning',
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteToDo', item)
          this.$swal('Done it')
        }
      })
    },
    edit(item) {
      this.editting = item;
    },
    doneEdit() {
      this.$swal('Done')
      this.editting = null;
    }
  },
  computed: {
    notDone() {
      return this.$store.getters.notDone
    },
    Done() {
      return this.$store.getters.Done
    },
    allTasks() {
      return this.$store.getters.allTasks
    },
    count() {
      return this.$store.getters.count
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  watch: {
    toDos: {
      deep: true,
      handler(newValue) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue))
      }
    }
  }
}
