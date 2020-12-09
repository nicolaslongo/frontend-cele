import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login/Login';

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Redirect to="/login" />
  </Switch>
);

export default Routes;
