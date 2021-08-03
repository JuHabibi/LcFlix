import {combineReducers} from 'redux';
import movies from './movies';

const reduceApp = combineReducers({
  movies,
});

export default reduceApp;
