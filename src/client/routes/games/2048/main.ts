import '../../../shared/scss/main.scss';
import { createApp } from 'vue';
import App from './components/App.vue';
import store, { key } from './store';

const app = createApp(App);

app.use(store, key);
app.mount('#app');
