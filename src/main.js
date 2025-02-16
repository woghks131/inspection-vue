import { createApp } from 'vue'
import App from './App.vue'

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import router from './router'
import mixins from './mixins';



createApp(App).use(router).use(BootstrapVue3).component('VueDatePicker', VueDatePicker).mixin(mixins).mount('#app')
