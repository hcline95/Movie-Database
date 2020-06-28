import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions';
import styled from "styled-components";


class SearchBar extends Component {

    constructor (props) {
        super(props)
        
        this.state = {
            type: 'movie',
            query: ''
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
      }

//called when a form is submitted
onFormSubmit(event) {
    //Makes sure the user enters a search before sending the fetch
    if (this.state.query !== ''){
        this.props.fetchSearch(this.state.type, this.state.query)
    }
    //prevent the page from reloading
    event.preventDefault();
}

render(){
      return (
        <SearchContainer>
            <form id="search" onSubmit={this.onFormSubmit}>
                <select type='text' id='selector' onChange={event => this.setState({ type: event.target.value})}>
                    <option value="movie">Movies</option>
                    <option value="person">People</option>
                </select>
                <input id='bar' onChange={event => this.setState({ query: event.target.value})} type="text" placeholder="Search"></input>
                <button id='search-btn' type='button' onClick={this.onFormSubmit}>
                Go!
                </button>
            </form>
        </SearchContainer>
      )
    }
}

    function mapStateToProps (state) {
      return ({ 
        search: state.search 
      }
      )};

    export default connect(
        mapStateToProps,
        actions
      )(SearchBar);


      const SearchContainer = styled.div`
      display:relative;
      margin-top:40px;
      text-align: center;
      #selector {
        width:10%;
        font-size: 16px;
        border: solid 1px #dbdbdb;
        border-radius: 3px;
        color: #262626;
        padding: 7px 33px;
        border-radius: 3px;
        color: #999;
        cursor: text;
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        background: #fafafa;
        &:active,
        &:focus {
          text-align: left;
        }
      }
      #bar{
        background-color: transparent;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        margin-left: 4px;
        max-width: 30%;
        text-align: left;
        box-sizing: border-box;
        border-width:.5px;
        width: 100%;
      }
      #search-btn{
        display: inline-block;
        text-align: center;
        align-items: flex-start;
        cursor: default;
        box-sizing: border-box;
        margin: 0em;
        font-size: 16px;
        padding: 1px 7px 2px;
        border-width: 1px;
        border-style: solid;
        border-image: initial;
    }
      }
    `;