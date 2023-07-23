const apikey : string = '2eb61e5fbb1af08678039810403837a6';
const token : string =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZWI2MWU1ZmJiMWFmMDg2NzgwMzk4MTA0MDM4MzdhNiIsInN1YiI6IjY0Yjc5MTc4ZjI2M2JhMDEzOWY0MGMwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dWTgJ_uugGkM_4BAhoFwV6WuUI44SAsVOhHIYuYh1iw';

  export const nowPlayingMovies : string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
  export const upcomingMovies : string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
  export const popularMovies : string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
  export const searchMovies = (keyword:string) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`
  };

  export const movieDetails = (id:number) => {
        return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`
  }
  export const moviesCastDetails = (id:number) => {
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`
  }
  export const baseImagePath = (size:string,path:string) => {
        return `https://image.tmdb.org/t/p/${size}${path}`
  }