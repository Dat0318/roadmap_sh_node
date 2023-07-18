<script setup>
import { getBooks } from '../models/books';
import './styles.scss'
</script>

<template>
  <div class="container">
    <div class="wrapper mt-5 mb-5">
      <!-- :to="{ path: `/airport/${airport.abbreviation}` }" -->
      <router-link :to="{ name: 'AirportDetail', params: { code: airport.abbreviation } }" v-for="airport in airports"
        :key="airport.abbreviation" class="airport">
        <p>{{ airport.abbreviation }}</p>
        <p>{{ airport.name }}</p>
        <p>{{ airport.city }}, {{ airport.state }}</p>
      </router-link>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 class="text-center">Time table ({{ tasks.length }})</h1>
        <hr />
        <br /><br />
      </div>
    </div>
    <form @submit="addTask">
      <div class="form-group">
        <input v-model="newTask" class="form-control" placeholder="Tôi muốn..." />
      </div>
    </form>
    <div class="group-btn">
      <button class="btn btn-danger" @click="shuffle">Đổi chỗ</button>
      <div v-for="(check, index) in checks" v-bind:key="index" class="item-check">
        <input type="checkbox" v-model="checked" v-bind:value="check" />
        {{ check }}
      </div>
    </div>
    <div class="check-label">Checked: {{ checked }}</div>
    <div class="row">
      <div class="form-group">
        <div class="searchable-container row">
          <transition-group name="list-complete" tag="div">
            <div class="tasks col-xs-5 col-sm-5 col-md-2 col-lg-2" v-for="(task, index) in filteredTasks"
              v-bind:key="index">
              <div class="info-block block-info clearfix">
                <div data-toggle="buttons" class="btn-group bizmoduleselect">
                  <label class="btn btn-default" id="check" @click="checkBox(index)">
                    <div class="bizcontent">
                      <input type="checkbox" autocomplete="off" />
                      <span class="glyphicon glyphicon-ok glyphicon-lg"></span>
                      <h5>{{ task.body }}</h5>
                    </div>
                  </label>
                </div>
                <div class="square-box">
                  <span class="glyphicon glyphicon-tags glyphicon-lg"></span>
                  <span class="glyphicon glyphicon-trash glyphicon-lg" @click="removeTask(index)"></span>
                </div>
              </div>
              <br />
            </div>
          </transition-group>
        </div>
      </div>
    </div>

    <div class="panel-body">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" v-bind:key="book['.key']">
            <td><a v-bind:href="book.url">{{ book.title }}</a></td>
            <td>{{ book.author }}</td>
            <td><span class="glyphicon glyphicon-trash" aria-hidden="true" v-on:click="removeBook(book)"></span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="todo-apps">
      <img src="http://lazi.vn/files/large/5a64450874df215" alt="" width="100">
      <span class="logo-title">Tết Tết Tết đến rồi!!!</span>
      <br>
      <div class="row">
        <div class="col-md-6">
          <ListTask></ListTask>
        </div>
        <div class="col-md-6">
          <CompletedTask></CompletedTask>
        </div>
      </div>
      <GetTask></GetTask>
    </div>

  </div>
</template>

<script>
import GetTask from '../components/GetTask.vue'
import ListTask from '../components/ListTask.vue'
import CompletedTask from '../components/CompletedTask.vue'
import { ref } from 'vue'
import allAirports from '@data/airports.js'

export default {
  data() {
    const airports = ref(allAirports);

    return {
      tasks: [
        { body: 'Ăn cơm', check: 'Unchecked', completed: false },
        { body: 'Tán gái', check: 'Unchecked', completed: false },
        { body: 'Lướt face', check: 'Unchecked', completed: false },
        { body: 'Học Vue', check: 'Unchecked', completed: false },
        { body: 'Ngắm gái', check: 'Unchecked', completed: false },
        { body: 'Nhậu', check: 'Unchecked', completed: false },
        { body: 'Học Laravel', check: 'Unchecked', completed: false },
        { body: 'Ngủ', check: 'Unchecked', completed: false },
        { body: 'Play game', check: 'Unchecked', completed: false },
        { body: 'Play girl', check: 'Unchecked', completed: false },
      ],
      checks: ['Checked', 'Unchecked'],
      newTask: '',
      checked: [],
      books: [], airports
    };
  },
  beforeMount() {
    this.fetchData();
  },
  computed: {
    filteredTasks() {
      let filterTasks = this.tasks;
      $.each(this.checked, function (value, key) {
        filterTasks = filterTasks.filter(function (task) {
          return task.check == key;
        });
      });
      return filterTasks;
    },
  },
  methods: {
    async fetchData() {
      this.books = await getBooks();
    },
    checkBox(indexTask) {
      this.tasks[indexTask].check = 'Checked';
    },
    addTask(e) {
      e.preventDefault();
      this.tasks.push({
        body: this.newTask,
        check: 'Unchecked',
        completed: false,
      });

      this.newTask = '';
    },
    removeTask(index) {
      Vue.delete(this.tasks, index);
    },

    shuffle() {
      this.tasks = _.shuffle(this.tasks);
    },
  },
  components: {
    GetTask,
    ListTask,
    CompletedTask
  }
};
</script>


<style scoped></style>