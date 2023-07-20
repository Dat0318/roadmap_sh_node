<template>
  <div>
    <h1>About</h1>
    <p>This is an about page used to illustrate mapping a view to a router with Vue Router.</p>

    <button class="Block__element--modifier" @click="redirectTo('/homepage')">Click me to redirect!</button>

    <div class="home">
      <div class="spacing">
        <DropdownMenu id="dropdownmenu1" :arrays="arrays">
          DropdownMenu 1
        </DropdownMenu>
      </div>
      <div class="spacing">
        <DropdownMenu id="dropdownmenu2" :arrays="arrays">
          DropdownMenu 2
        </DropdownMenu>
      </div>
    </div>

    <div class="home spacing">
      <div>Dữ liệu localStorage hiện tại: {{ store }}</div>
      <button @click="setValue">Update value</button>
    </div>
  </div>
</template>

<script>
import DropdownMenu from '@components/DropdownMenu/index.vue';
import localStorage from "@data/localStorage";

export default {
  name: 'About',
  components: {
    DropdownMenu,
  },
  data() {
    return {
      arrays: [
        {
          text: 'Link 1',
          link: '/about',
        },
        {
          text: 'Link 2',
          link: '/about',
        },
        {
          text: 'Link 3',
          link: '/about',
        },
        {
          text: 'Link 4',
          link: '/about',
        },
        {
          text: 'Link 5',
          link: '/about',
        },
      ],
      store: localStorage.get()
    };
  },
  watch: {
    store() {
      localStorage.set(this.store);
    }
  },
  methods: {
    redirectTo(path = '', params = '') {
      this.$router.push({ path, params });
    },
    setValue() {
      return (this.store += 1);
    }
  },
};
</script>