
import initialState from '../State';
import * as A from '../Action';

function movies(state = initialState.movies, action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case A.GET_CONFIG:
      return {
        ...state,
        images: action.config.images,
      };
    case A.FETCHING_MOVIES:
      newState.isFetching = true;
      return newState;
    case A.TOGGLE_FAVORITE:
      const favoriteFilmIndex = state.favoritesFilm.findIndex(
        item => item.id === action.value.id,
      );
      if (favoriteFilmIndex !== -1) {
        newState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter(
            (item, index) => index !== favoriteFilmIndex,
          ),
        };
      } else {
        newState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value],
        };
      }
      return newState || state;
    default:
      return state;
  }
}

export default movies;
