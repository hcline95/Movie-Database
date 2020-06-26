import { SAVE_SEARCH } from '../actions/types';

//saving search history in local storage
const initialState = JSON.parse(localStorage.getItem('savedSearch')) || {type:'movie', query:''};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_SEARCH:
      localStorage.setItem( 'savedSearch', JSON.stringify(action.payload) );
      return action.payload;
    default:
      return state;
  }
}