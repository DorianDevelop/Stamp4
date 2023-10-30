import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import WaveUI from 'wave-ui';
import 'wave-ui/dist/wave-ui.css';

import '@/assets/global.css';
//import 'vue-select/dist/vue-select.css';

createApp(App).use(WaveUI).use(router).mount('#app');
