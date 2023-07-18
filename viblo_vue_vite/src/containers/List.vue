<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <div class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <div v-for="i in dataToShow" :key="i.id" class="item">
        <div class="ttl">{{ `Bài ${i.id}: ${i.title}` }}</div>
        <div class="desc">{{ i.body }}</div>
      </div>
    </div>
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
      limit: 50,
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
