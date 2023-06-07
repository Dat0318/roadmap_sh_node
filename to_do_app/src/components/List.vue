<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <li v-for="i in dataToShow" :key="i.id" class="list-item">{{ `Bài ${i.id}: ${i.body}` }}</li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="noMore">No more</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      dataToShow: [],
      loading: false,
      index: 0,
      limit: 3,
      noMore: false,
    }
  },
  computed: {

    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        if (this.data.length > 0) {
          this.dataToShow = this.dataToShow.concat(this.data.splice(this.index, this.limit))
          this.loading = false
        } else {
          this.loading = false
          this.noMore = true;
        }

      }, 500)
    }
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.data = data;
        this.dataToShow = data.splice(this.index, this.limit); //init
      })
  }
}
</script>
