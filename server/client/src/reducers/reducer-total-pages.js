import { FETCH_MOVIES } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return action.payload.data.total_pages
    default:
      return state;
  }
}
