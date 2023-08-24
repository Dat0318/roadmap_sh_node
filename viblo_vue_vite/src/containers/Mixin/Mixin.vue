<script>
import mixin from './mixin.js';
export default {
  mixins: [mixin],

  data() {
    return {
      name: 'Day la ten sau khi da thay doi!',
    };
  },

  created() {
    console.log(this.name);
  },
};
</script>
