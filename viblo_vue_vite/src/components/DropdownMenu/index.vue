<template>
  <div :id="id" class="dropdown">
    <button @click="isOpen = !isOpen" :class="{ isActive: isOpen }">
      <slot />
    </button>
    <div class="dropdown-list" v-if="isOpen">
      <Item v-for="(item, index) in arrays" :key="index" :item="item" :closeDropdown="callToClose">
        {{ item.text }}
      </Item>
    </div>
  </div>
</template>


<script>
import Item from './Item.vue'
export default {
  name: 'DropdownMenu',
  components: {
    Item,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    arrays: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    window.addEventListener('click', this.checkClickOn);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.checkClickOn);
  },
  methods: {
    callToClose() {
      this.isOpen = false;
    },
    checkClickOn(event) {
      if (!document.getElementById(this.id).contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>