// import Vue from 'vue';
// import App from './App.vue';

// new Vue({
//   render: (h) => h(App),
// }).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import store from './store/store.js'; // file này mình tạo ở cuối bài nhé
import VueSweetalert2 from 'vue-sweetalert2';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import ElementUI from 'element-ui';

import 'bootstrap/dist/css/bootstrap.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Vuex);

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
