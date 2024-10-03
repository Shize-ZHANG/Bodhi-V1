import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AboutUs from '../components/AboutUs.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/welcome',
    name: 'HelloWorld',
    component: HelloWorld
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
