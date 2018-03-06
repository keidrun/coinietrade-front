import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Layout from '../hoc/Layout/Layout';
import Auth from '../hoc/Auth/Auth';

import Landing from './Landing/Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const Tradeboad = () => <h2>Tradeboad</h2>;
const Settings = () => <h2>Settings</h2>;
const Help = () => <h2>Help</h2>;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Auth(Landing, false)} />
            <Route path="/dashboard" exact component={Auth(Dashboard, true)} />
            <Route path="/trade" exact component={Auth(Tradeboad, true)} />
            <Route path="/settings" exact component={Auth(Settings, true)} />
            <Route path="/help" exact component={Auth(Help, true)} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
