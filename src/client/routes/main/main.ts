import '../../shared/scss/main.scss';
import { createApp } from 'vue';
import App from './components/App.vue';
import TransitionInViewport from '../../shared/ts/directives/TransitionInViewport';

const app = createApp(App);
app.directive('transition-in-viewport', TransitionInViewport);
app.mount('#app');