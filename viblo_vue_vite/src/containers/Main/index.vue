<script setup>
import { useI18n } from 'vue-i18n-lite';
import './styles.scss';
</script>

<template>
  <div class="page full">
    <toast />
    <button @click="count++">Count is: {{ count }}</button>
    <div :id="`list-${id}`">{{ message }} - {{ message.split('').reverse().join('') }}</div>

    <p v-if="seen">Now you see me</p>

    <a :href="url"> ... </a>

    <div>
      <select v-model="selected">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>

    <div>Selected: {{ selected }} - {{ human }}</div>

    <img class="item" :src="image?.src?.tiny" />

    <form @submit.prevent="createPost">
      <input placeholder="name" v-model="post.name" />
      <input placeholder="title" v-model="post.title" />
      <br />
      <button type="submit">Create</button>
    </form>

    <div class="item">
      <pre class="format_json">{{ image }}</pre>
    </div>

    <div class="conditional-rendering">
      <div class="block-1" v-if="isActive == false">This is block 1</div>
      <div class="block-2" v-if="isActive == true">This is block 2</div>

      <div class="block-1" v-if="isActive == false">This is block 1</div>
      <div class="block-2" v-else>This is block 2</div>
      <div>
        <button @click="toggleActive">Button</button>
      </div>
    </div>

    <div class="list-rendering">
      <ul>
        <li v-for="food in foods">{{ food.name }}</li>
      </ul>
    </div>

    <button v-on:click="handleSubmit"></button>

    <Suspense>
      <template #default>
        <div v-for="item in articleList" :key="item.id">
          <article>
            <h2>{{ item.title }}</h2>
            <p>{{ item.body }}</p>
          </article>
        </div>
      </template>
      <template #fallback> Articles loading... </template>
    </Suspense>
  </div>
</template>

<script>
import Toast from './components/Toast.vue';
import axios from 'axios';
import { ref } from 'vue';

export default {
  data() {
    return {
      id: 10,
      count: ref(0),
      message: ref('Hello Vue!'),
      options: ref([
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' },
      ]),
      human: null,
      post: {},
      image: {},
      isActive: true,
      foods: [{ name: 'Hamburger' }, { name: 'Sandwich' }, { name: 'Chicken chop' }],
      weather: {
        currentTemp: '',
        minTemp: '',
        maxTemp: '',
        sunrise: '',
        sunset: '',
        pressure: '',
        humidity: '',
        wind: '',
        overcast: '',
        icon: '',
      },
      articleList: [],
    };
  },
  beforeMount() {
    this.getName();
    this.getArticle();
    // this.getPhoto();
  },
  computed: {},
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
    handleSubmit(event) {
      event.preventDefault();
      console.log(`The button was clicked at ${event.timeStamp}.`, event);
    },
    async getName() {
      const res = await fetch('https://api.agify.io/?name=michael'),
        human = await res.json();

      this.human = human;
    },
    async getArticle() {
      let articleList = await axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          console.log(response);
          return response.data;
        });
      this.articleList = articleList;
    },
    async getPhoto() {
      try {
        const headers = new Headers();
        headers.append('Authorization', 'WQbppIHmGm36XAMT93ENEuJ5mnmEyRHp7byAQnViFgGVBQEETFRuhJ5x');
        const request = new Request('https://api.pexels.com/v1/curated?per_page=11&page=1', {
          method: 'GET',
          headers,
          mode: 'cors',
          cache: 'default',
        });
        const res = await fetch(request),
          { photos } = await res.json();

        this.image = photos[0];
      } catch (err) {}
    },
    async createPost() {
      const request = new Request('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(this.post),
      });
      const res = await fetch(request),
        data = await res.json();

      this.data = data;
    },
    getWeather() {
      let url =
        'http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID={Your API Key}';
      axios
        .get(url)
        .then((res) => {
          const { main, wind, weather, sys } = res.data;

          this.weather = {
            currentTemp: main.temp,
            minTemp: main.temp_min,
            maxTemp: main.temp_max,
            pressure: main.pressure,
            humidity: main.humidity + '%',
            wind: wind.speed + 'm/s',
            overcast: weather[0].description,
            icon: 'images/' + weather[0].icon.slice(0, 2) + '.svg',
            sunrise: new Date(sys.sunrise * 1000).toLocaleTimeString('en-GB').slice(0, 4),
            sunset: new Date(sys.sunset * 1000).toLocaleTimeString('en-GB').slice(0, 4),
          };
        })
        .catch((error) => console.log(error));
    },
  },
  components: {
    Toast,
  },
};
</script>

<style scoped></style>
