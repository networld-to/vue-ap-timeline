import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import VueApTimeline from '@networld-to/vue-ap-timeline';
import '@networld-to/vue-ap-timeline/dist/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(VueApTimeline);
app.mount('#app');
