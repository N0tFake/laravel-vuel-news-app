import { createRouter, createWebHistory } from "vue-router";
import Home from "../Components/Home.vue";
import CreateNews from '../Components/News/CreateNews.vue';

const routes = [
  { path: "/", component: Home },
  { path: "/news/create", component: CreateNews }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;