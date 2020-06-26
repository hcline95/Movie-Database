import { FETCH_MOVIES, ERROR_MESSAGE } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return action.payload;
    case ERROR_MESSAGE:
      return {results: 'error'};
    default:
      return state;
  }
}