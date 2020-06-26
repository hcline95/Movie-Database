import { combineReducers } from "redux";
import MoviesReducer from "./reducer-movies";
import CreditsReducer from "./reducer-credits";
import SearchReducer from "./reducer-search";

const rootReducer = combineReducers({
    movies: MoviesReducer,
    credits: CreditsReducer,
    search: SearchReducer
});

export default rootReducer;