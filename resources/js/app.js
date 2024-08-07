import './bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './Components/app.vue';
import router from './router';
import Home from './Components/Home.vue';
import CreateNews from './Components/News/CreateNews.vue';
import EditNewsModal from './Components/News/EditNewsModal.vue';
import axios from 'axios';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

const app = createApp(App);
const pinia = createPinia()

app
  .component('Home', Home)
  .component('CreateNews', CreateNews)
  .component('EditNewsModal', EditNewsModal)
  .use(pinia)
  .use(ToastPlugin)
  .use(router);

  app.mount('#app');