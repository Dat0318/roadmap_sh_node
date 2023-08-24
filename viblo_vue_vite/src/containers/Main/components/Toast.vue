<script lang="ts" setup>
import './styles.scss';
</script>

<template>
  <div :class="['wrapper', isShow ? 'show' : 'hide']">
    <ClientOnly>
      <div :class="[{ offline: !isOnline }, isShow ? 'show' : 'hide', 'toast']">
        <div class="content">
          <div class="icon">
            <i :class="['uil', isOnline ? 'uil-wifi' : ' uil-wifi-slash']"></i>
          </div>
          <div class="details" v-if="isOnline">
            <span>You're online now</span>
            <p>Hurray! Internet is connected.</p>
          </div>

          <div class="details" v-else>
            <span>You're offline now</span>
            <p>Opps! Internet is disconnected.</p>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<!-- <script lang="ts" setup> -->
<script lang="ts">
import useNetwork from '@hooks/useNetWork';

const { isOnline, isShow } = useNetwork(3000);

export default {
  data() {
    return { isOnline: isOnline.value, isShow: isShow.value };
  },
};
</script>
