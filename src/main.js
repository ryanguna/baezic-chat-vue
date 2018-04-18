// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import Vuetify from 'vuetify'

import {store} from './store.js'

/*
Import CSS section
 */
import('../node_modules/vuetify/dist/vuetify.min.css');
import('../node_modules/font-awesome/css/font-awesome.min.css');
import('../node_modules/material-design-icons/iconfont/material-icons.css');


Vue.use(VueSocketIO, socketio('http://192.168.110.130:8081'), store);
Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#0a72d8',
    error: '#ef3434',
    info: '#2196F3',
    success: '#06be0d',
    warning: '#ffa507'
  }
});


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

