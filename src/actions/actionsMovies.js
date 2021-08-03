import {MOVIES_SUCCESS} from '../reducers/movies';

export const FETCHING_MOVIES = 'FETCHING_MOVIES';
export const fetchingMovies = () => ({type: 'FETCHING_MOVIES'});
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const MOVIE_DETAILS_FETCHED = 'MOVIE_DETAILS_FETCHED';

export const setMoviesSuccess = data => ({type: MOVIES_SUCCESS, payload: data});

