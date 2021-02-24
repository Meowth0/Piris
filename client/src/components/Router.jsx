import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import ClientsScreen from '../modules/clients-table';
import ClientForm from '../modules/clients-form';
import Accounts from '../modules/accounts';
import DepositForm from '../modules/deposit-form';
import ClientDeposits from '../modules/client-deposits';
import Navbar from './Navbar';

function RouterComponent() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ClientsScreen} />
        <Route exact path="/client-form/new" component={ClientForm} />
        <Route exact path="/client-form/:id" component={ClientForm} />
        <Route exact path="/accounts" component={Accounts} />
        <Route exact path="/client-form/:id/deposits" component={ClientDeposits} />
        <Route exact path="/client-form/:id/deposits/new" component={DepositForm} />
        <Route exact path="/client-form/:id/deposits/:depositId" component={DepositForm} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default RouterComponent;
