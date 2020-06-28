import { FETCH_MOVIES } from '../actions/types';

export default function(state = 0, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return action.payload.data.page
    default:
      return state;
  }
}
