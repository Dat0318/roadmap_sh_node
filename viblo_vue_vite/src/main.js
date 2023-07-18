import './style.css';
import App from './App.vue';
import { VueFire } from 'vuefire';
import { createApp } from 'vue';
import router from './routers/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import VueLazyload from 'vue-lazyload';

// import Vuex from 'vuex';

import FirebaseApp from './models/books';
import store from './store/store';

if (process.env.NODE_ENV === 'production') {
  import('firebase/analytics')
    .then(({ getAnalytics }) => {
      getAnalytics(FirebaseApp);
    })
    .catch((err) => console.log('Analytics not loaded', err));
}

createApp(App)
  .use(router)
  .use(VueLazyload)
  .use(VueFire, {
    FirebaseApp,
    // add modules like VueFireAuth, ...
    modules: [],
  })
  // .use(Vuex)
  .use(store)
  .mount('#app');
