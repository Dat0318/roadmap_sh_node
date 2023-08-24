<template>
  <div class="counter">
    <p>count: {{ count }}</p>
    <p>NewVal (count + 2): {{ countDouble }}</p>
    <button @click="inc">Increment</button>
    <button @click="dec">Decrement</button>
    <p>Message: {{ msg }}</p>
    <button @click="changeMessage()">Change Message</button>
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue';

export default {
  setup() {
    let count = ref(0);
    const countDouble = computed(() => count.value * 2);

    watch(count, (newVal) => {
      console.log('count changed', newVal);
    });

    const inc = () => {
      count.value += 1;
    };

    const dec = () => {
      if (count.value !== 0) {
        count.value -= 1;
      }
    };

    let msg = ref('some text');
    watch(msg, (newVal) => {
      console.log('msg changed', newVal);
    });

    const changeMessage = () => {
      msg.value = 'new Message';
    };

    return {
      count,
      inc,
      dec,
      countDouble,
      msg,
      changeMessage,
    };
  },
};
</script>

<!-- VUE 2
<script>
  export default {
    data() {
      return {
        count: 0,
        msg: 'some message'
      }
    },
    computed: {
      countDouble() {
        return this.count*2
      }
    },
    watch: {
      count(newVal) {
        console.log('count changed', newVal)
      },
      msg(newVal) {
        console.log('msg changed', newVal)
      }
    },
    methods: {
      inc() {
        this.count += 1
      },
      dec() {
        if (this.count !== 0) {
          this.count -= 1
        }
      },
      changeMessage() {
        msg = "new Message"
      }
    }
  }
</script>
-->
