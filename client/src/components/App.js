import React from 'react';
import styled from "styled-components";

class App extends React.Component {

  render() {
    return (
      <AppContainer>
        {this.props.children}
      </AppContainer>
    )
  }
}

export default App

const AppContainer = styled.div`
  padding-top: 90px;
`;
