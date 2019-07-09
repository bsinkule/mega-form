import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import Form from './Form';
import NoMatch from './NoMatch';

const AppRouter = () => {

    return (
      <Switch>
        <Route exact path="/" component={Form} />
        <Route path="/form" component={Form} />
        <Route component={NoMatch} />
      </Switch>
    );
}

const mapStateToProps = (state) => ({
    router: state.router,
});

export default withRouter(connect(mapStateToProps)(AppRouter));
