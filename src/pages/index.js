import React, { Component } from 'react';
import Owner from './Owner';
import Room from './Room';
import Kitchen from './Kitchen';
import Customer from './Customer';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store';
import ROUTES from '../constants/constRoutes';
import Board from './Board';
import Home from './Home';
import Login from './Login';
import EasterEgg from '../components/EasterEgg';

class App extends Component {
  render() {
    return (
      <>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              exact
              strict
              path="/:url*"
              component={(props) => (
                <Redirect to={`${props.location.pathname}/`} />
              )}
            />
            <Route exact strict path={ROUTES.HOME} component={Home} />
            <Route exact strict path={ROUTES.LOGIN} component={Login} />
            <Route exact strict path={ROUTES.BOARD} component={Board} />
            <Route exact strict path={ROUTES.OWNER} component={Owner} />
            <Route exact strict path={ROUTES.KITCHEN} component={Kitchen} />
            <Route exact strict path={ROUTES.CUSTOMER} component={Customer} />
            <Route exact strict path={ROUTES.ROOM} component={Room} />
            <Redirect to={ROUTES.HOME} />
          </Switch>
        </ConnectedRouter>

        <EasterEgg />
      </>
    );
  }
}

export default App;
