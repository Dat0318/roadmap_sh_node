<template>
  <div class="item" @click="doFunc">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true,
    },
    closeDropdown: {
      type: Function,
      default: () => { },
    },
  },
  methods: {
    doFunc() {
      console.log(this.item.link);
      this.closeDropdown();
    }
  }
};
</script>
