import Vue from 'vue';
import './style.scss';

import Overview from './components/Overview.vue';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import routes from './util/routes'

import moment from 'moment-timezone';
import { checkFilter } from './util/bus';
// moment.

Vue.use(VueResource);
const router = new VueRouter({ routes });
Vue.use(VueRouter);

Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

const bus = new Vue();

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    bus,
    day: moment()
  },
  components: {
    Overview,
  },
  created(){
  this.$http.get('api').then(response => {
      this.movies = response.data;
    });
  const that = checkFilter.bind(this);
  console.log(6, that);
  this.$bus.$on('check-filter', that);
  },
  router
});
