<script setup>
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

    <div>Selected: {{ selected }}</div>
  </div>
</template>

<script>
import Toast from './components/Toast.vue';
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
    };
  },
  beforeMount() {},
  computed: {},
  methods: {},
  components: {
    Toast,
  },
};
</script>

<style scoped></style>
