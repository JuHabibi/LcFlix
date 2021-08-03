import axios from 'axios';
import Constant from '../utils/constants';

const apiKey = Constant.api_key;
const baseURL = Constant.api_base_url;

export const getLists = id => axios.get(`${baseURL}/list/${id}?${apiKey}`);
export const getDetailsMovies = movieId =>
  axios.get(`${baseURL}/movie/${movieId}?${apiKey}`);
