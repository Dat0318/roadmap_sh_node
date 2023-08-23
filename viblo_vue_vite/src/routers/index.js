import * as VueRouter from 'vue-router';
import Home from '@containers/Home.vue';
import About from '@containers/About.vue';
import List from '@containers/List.vue';
import Main from '@containers/Main/index.vue';
import TodoList from '@containers/TodoList.vue';
import AirportDetail from '@containers/AirportDetail.vue';
import AirportDestinations from '@containers/AirportDestinations.vue';
import NotFound from '@containers/NotFound.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/list', component: List },
  { path: '/todo-list', component: TodoList },
  {
    path: '/airport/:code',
    name: 'AirportDetail',
    component: AirportDetail,
    children: [
      {
        path: 'destinations',
        name: 'AirportDestinations',
        component: AirportDestinations,
      },
    ],
  },
  { path: '/:catchAll(.*)*', name: 'NotFound', component: NotFound },
];

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
