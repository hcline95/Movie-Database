import React, { Component } from "react";
import * as actions from '../actions';
import { connect } from "react-redux";
import styled from "styled-components";



class Credits extends Component {
    

  render() {
    if (this.props.cast == undefined){
        return(
          <>
          <br/>
          <p>Sorry. We could not find that cast & crew.</p>
          </>
        )
      }

    //Declaring the variables for the profile pictures
    const PICTURE_PATH = "http://image.tmdb.org/t/p/w185";
    let profilePic

    const renderCastMember = (castMember) => {
        
        //if no profile pic is avaliable gives default 
        if (castMember.profile_path == null){
            profilePic = 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/medium/name-2135195744._CB466677935_.png'
        }else{
            profilePic =`${PICTURE_PATH}${castMember.profile_path}`
        }
        return (
          <div>
            <Poster
              src={profilePic}
              alt="profile"
              style={{ boxShadow: "0 5px 30px black" }}
              id={castMember.cast_id} />
              <Name>
              {castMember.character}
              </Name>
              <NameSmall>
             {castMember.name}
              </NameSmall>
          </div>
        );
    }


    const renderCrewMember = (crewMember) => {
        //if no profile pic is avaliable gives default 
        if (crewMember.profile_path == null){
            profilePic = 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/medium/name-2135195744._CB466677935_.png'
        }else{
            profilePic =`${PICTURE_PATH}${crewMember.profile_path}`
        }
        return (
            <Poster
              src={profilePic}
              alt="profile"
              style={{ boxShadow: "0 5px 30px black" }}
              id={crewMember.crew_id}
            />
        );
    }
    
    
    return (
     <>
        <h1>Cast</h1>
            <Grid>
                {this.props.cast.map(renderCastMember)}
            </Grid>
        <h1>Crew</h1>
            <Grid>
                {this.props.crew.map(renderCrewMember)}
            </Grid>
     </>
    );
  }
}

function mapStateToProps(state) {
  return {
    cast: state.credits.cast,
    crew: state.credits.crew
  };
}

export default connect(
  mapStateToProps,
  actions
)(Credits);

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2em;
  margin: 0 auto;
`;

const Name = styled.h2`
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
width:185px;
padding-right:10px;
padding-left:10px;
`;

const NameSmall = styled.h4`
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
width:185px;
padding-right:10px;
padding-left:10px;
`;

const Poster = styled.img`
  box-shadow: 0 0 30px white;
  width:185px;
  height:277px;
  &:hover {
    transform: scale(1.06);
    transition-duration: 300ms;
  }
`;
