// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style.css';

const app = createApp(App);

// Use plugins
app.use(store);
app.use(router);

app.mount('#app');