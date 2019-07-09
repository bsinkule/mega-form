import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

class App extends Component {
  render() {
    return (
      <MainWrapper >
        {this.props.children}
      </MainWrapper>
    )
  }
}

const bindActions = (dispatch) => ({
});

const mapStateToProps = (state) => ({
  router: state.router,
});

export default withRouter(connect(mapStateToProps, bindActions)(App));

const MainWrapper = styled.div`

`;