<template>
  <div v-if="airport">
    <p>{{ airport.name }} ({{ airport.abbreviation }})</p>
    <p>Located in {{ airport.city }}, {{ airport.state }}</p>
    <router-view />
    <HelloWord :value="value" @update=update />

    <div id="watch-example">
      <p>
        Ask a yes/no question:
        <input v-model="question">
      </p>
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import airports from '@/data/airports.js'
import HelloWord from '@components/HelloWorld.vue'
import _ from 'lodash'

export default {
  data() {
    const route = useRoute()
    const airport = computed(() => {
      return airports.filter(a => a.abbreviation === route.params.code.toUpperCase())[0]
    })

    return {
      airport,
      value: 'props',
      question: '',
      answer: 'I cannot give you an answer until you ask a question!'
    }
  },
  beforeMount() {
    if (!this?.airport?.name) {
      // Navigate to 404 page here
      this.$router.push({ name: 'NotFound' })
    }
  },
  created() {
    const route = useRoute()
    this.getPost(route.params.code);
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  watch: {
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  methods: {
    getPost(postId) {
      // code get post here
    },
    update(value) {
      console.log(value)
      this.value = value
    },
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  },
  components: {
    HelloWord,
  }
}
</script>