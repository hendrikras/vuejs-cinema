<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies"
                        v-bind:movie="movie.movie"
                        v-bind:sessions="movie.sessions"
                        v-bind:time="time"
                        v-bind:day="day">

            </movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results"> {{ noResults }}</div>
        <div v-else class="no-results"> loading </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import times from '../util/times';
  import MovieItem from './MovieItem.vue';

  export default {
    props: [ 'genre', 'time', 'movies', 'day' ],
    methods: {
      moviePassesGenreFilter(movie) {
        if (!this.genre.length) {
          return true;
        } else {
          let movieGenres = movie.movie.Genre.split(", ");
          let matched = true;
          this.genre.forEach(genre => {
            if (movieGenres.indexOf(genre) === -1) {
              matched = false;
            }
          });
          return matched;
        }
      },
      sessionsPassesTimeFilter(session){
        if(this.day._d && !this.day._d.isSame(this.$moment(session.time), 'day')) {
          return false;
        } else if (this.time.length === 0 || this.time.length === 2){
          return true;
        } else if (this.time[0] === times.AFTER_6PM) {
          return this.$moment(session.time).hour() >= 18;
        } else {
          return this.$moment(session.time).hour() < 18;
        }
      }
    },
    computed: {
      noResults(){
        let times = this.time.join(', ');
        let genres = this.genre.join(', ');
        return `no results for ${times}${times.length && genres.length ? ',': ''}${genres}`;
      },
      filteredMovies() {
        return this.movies
          .filter(this.moviePassesGenreFilter)
          .filter(movie => movie.sessions.find(this.sessionsPassesTimeFilter));
      }
    },
    components: {
      MovieItem
    },
    created(){
      console.log(9, this.$moment);
    }
  }
</script>
