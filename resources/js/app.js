import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import app from './Components/app.vue';
import Home from './Components/Home.vue';
import CreateNews from './Components/News/CreateNews.vue';
import axios from 'axios';

const routes = [
  { path: '/news', component: Home },
  { path: '/news/create', component: CreateNews }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

axios.defaults.baseURL = 'http://localhost:8000/api/v1/';
createApp({}).component('Home', Home).use(router).mount('#app');