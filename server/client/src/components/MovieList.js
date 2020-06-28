import React, { Component } from "react";
import styled from "styled-components";
import Movie from "./Movie";
import { connect } from "react-redux";
import * as actions from '../actions';
import _ from "lodash";
import InfiniteScroll from 'react-infinite-scroller';
import SearchBar from './Searchbar';


class MovieList extends Component {  

  componentDidMount () {
    //loads the most recent search or all movies
    this.props.search.query === '' ? this.props.fetchAllMovies() : this.props.fetchSearch(this.props.search.type, this.props.search.query, 1) 
  }


  render() {
    //loops through the movies and prints each one
    const movies = _.map(this.props.movies, (m) => {
      return <Movie id={m.id} key={m.id} title={m.title} img={m.poster_path} />
    });

  
    return (
      <>
      <SearchBar />
      <InfiniteScroll
        loadMore={()=>{this.props.search.query === '' ? this.props.fetchAllMovies(this.props.currentPage + 1) : this.props.fetchSearch(this.props.search.type, this.props.search.query, this.props.currentPage + 1)}}
        pageStart={0}
        hasMore={this.props.currentPage < this.props.totalPages ? true : false}> 
        <MovieGrid>
          {this.props.totalPages === 0 ? "Sorry, We could not find any movies that matched your search." : movies}
        </MovieGrid>
      </InfiniteScroll>
      </>
    );
  }
}

function mapStateToProps (state) {
  console.log(state)
  return { 
    movies: state.movies, 
    totalPages: state.total_pages, 
    search: state.search,
    currentPage: state.current_page }
};

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