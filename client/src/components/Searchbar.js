import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import * as actions from '../actions';
import styled from "styled-components";
import { Link } from "react-router-dom";

//controls the search bar
function SearchBar(props) {

//using hooks to save the search term as it is changed. 
const [query, setSearchQuery] = useState(props.search.query)

//using hooks to save the term type when it changes. 
const [type, setSearchType] = useState(props.search.type)

  //called when a Go butto is clicked
  const onFormSubmit = function (event) {
    //sends the search to the actions
    props.fetchSearch(type, query)
  }

      return (
        <SearchContainer>
            <form id="search">
                <select type='text' id='selector' onChange={event => setSearchType(event.target.value)}>
                    <option value="movie">Movies</option>
                    <option value="person">People</option>
                </select>
                <input id='bar' onChange={event => setSearchQuery(event.target.value)} type="text" placeholder="Search"></input>
                <button id='search-btn' type='button' onClick={onFormSubmit}>
                Go!
                </button>
            </form>
          </SearchContainer>
          
      )
    }

    function mapStateToProps (state) {
      console.log(state)
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

