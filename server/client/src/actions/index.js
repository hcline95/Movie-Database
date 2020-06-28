import axios from "axios";
import { FETCH_MOVIES, FETCH_CREDITS, ERROR_MESSAGE} from './types';

//Asks for list of all movies
export const fetchAllMovies =  (page = 1) => dispatch => {
  axios.get(`http://localhost:5000?page=${page}`
  ).then(function (response) {
    dispatch({ type: FETCH_MOVIES, payload: {data: response.data, search : { type : 'movie', query: '' }}});
  })
  .catch(function (error) {
    dispatch({ type: ERROR_MESSAGE, payload: error });
  });
};

//Asks for specific search of person or movie
  export const fetchSearch = (type, query, page) => dispatch => {
    axios.get(`/search?type=${type}&search=${query}&page=${page}`
    ).then(function (response) {
      console.log('response from fetchSearch', response)
      dispatch({ type: FETCH_MOVIES, payload: { data: response.data, search : {type: type, query: query }}});
    })
    .catch(function (error) {
      dispatch({ type: ERROR_MESSAGE, payload: error });
    });
  };

//Request Movie details
export const fetchCredits = (movieId) => dispatch => {
  console.log('fetch credits action')
  axios.get(`/${movieId}`
  ).then(function (response) {
    console.log('fetchcredits', response)
    dispatch({ type: FETCH_CREDITS, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};




