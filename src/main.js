import Vue from 'vue';
import './style.scss';

import MovieItemList from './components/MovieItemList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';

Vue.use(VueResource);

import moment from 'moment-timezone';
// moment.

Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });
const bus = new Vue();

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment()
  },
  methods: {
    checkFilter(category, title, checked) {
      if(checked){
        this[category].push(title);
      } else {
        let index = this[category].indexOf(title);
        if (index > -1) {
          this[category].splice(index, 1)
        }
      }
    }
  },
  components: {
    movieList: MovieItemList,
    MovieFilter,
  },
  created(){
  this.$http.get('api').then(response => {
      this.movies = response.data;
    });
  }
});
