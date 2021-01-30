import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import Router from './components/Router';

const MainContainer = styled(Grid)`
  margin: 0;
  box-sizing: border-box;
  width: 100vw;
`;

class App extends React.PureComponent {
  render() {
    return (
      <MainContainer>
        <Router />
      </MainContainer>
    );
  }
}

export default App;
