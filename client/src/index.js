import "./App.css";
import React, { Fragment } from 'react';
import { render } from "react-dom";
import App from './components/App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'
import NavBar from './components/NavBar'


const store = createStore(rootReducer, {}, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router>
    <Fragment>
        <NavBar />
        <App>
          <Switch>
            <Route exact path="/" component={MovieList} />
            <Route exact path="/:id" component={MovieDetail} />
          </Switch>
        </App>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);