<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <InfoDetail card-name="Quang Phu">
          <p slot="header">Đây là header</p>
          <p slot="body">Đây là body</p>
        </InfoDetail>
      </div>

      <div class="row">
        <appCard v-slot:default="{ user }">
          <p>{{ user.firstName }}</p>
        </appCard>
      </div>
    </div>
  </div>
</template>

<script>
import InfoDetail from './InfoDetail.vue';

export default {
  components: {
    InfoDetail,
  },
};
</script>
