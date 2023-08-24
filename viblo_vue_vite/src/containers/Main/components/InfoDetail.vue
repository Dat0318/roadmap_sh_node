<template>
  <div class="children">
    <h2>{{ userName }}</h2>
    <p>This is my profile</p>

    <div class="children">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="body">
        <slot name="body"></slot>
      </div>
      <div class="footer">
        <slot :user="user"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userName'],

  data() {
    return {
      user: {
        firstName: 'Phu',
        lastName: 'Quang',
      },
    };
  },
};
</script>

<style scoped>
div {
  border: 1px solid #ccc;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  padding: 30px;
  margin: 20px auto;
  text-align: center;
}
</style>
