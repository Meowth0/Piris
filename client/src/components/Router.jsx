import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import ClientsScreen from '../modules/clients-table';
import ClientForm from '../modules/clients-form';
import Navbar from './Navbar';

function RouterComponent() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ClientsScreen} />
        <Route exact path="/client-form/new" component={ClientForm} />
        <Route exact path="/client-form/:id" component={ClientForm} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default RouterComponent;
