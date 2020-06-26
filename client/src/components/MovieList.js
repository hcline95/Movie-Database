import React, { Component } from "react";
import styled from "styled-components";
import Movie from "./Movie";
import SearchBar from "./Searchbar"
import _ from "lodash";
import * as actions from '../actions';
import { connect } from 'react-redux';


class MovieList extends Component {  

  componentDidMount () {
    //checks local storage value to know which call to fetch
    if (this.props.search.query == ''){
      this.props.fetchAllMovies(this.props.search.type)
    }else {
      this.props.fetchSearch(this.props.search.type, this.props.search.query)
    }
  }


  render() {

    const renderMovieList = () => {
      if (this.props.movies == undefined){
        return(
          <p>Loading...</p>
        )
      } else if (this.props.movies.length==0){
        return(
          <p>We could not find any movies to match your search. Please try again.</p>
        )
      } else if (this.props.movies== 'error'){
        return(
          <p>Please enter a valid search request.</p>
        )
      }else{
      const movies = _.map(this.props.movies, (m) => {
        return <Movie id={m.id} key={m.id} title={m.title} img={m.poster_path} />
      });
  
      return (
          <MovieGrid>
            {movies}
          </MovieGrid>
      );
      }
    }

    return(
      <>
      <SearchBar />
      {renderMovieList()}
      </>
    )

  }
}

function mapStateToProps (state) {
  console.log(state)
  return ({ 
    movies: state.movies.results,
    search: state.search
  }
  )};

export default connect(
  mapStateToProps,
  actions
)(MovieList);

const MovieGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2em;
  margin: 0 auto;
`;
