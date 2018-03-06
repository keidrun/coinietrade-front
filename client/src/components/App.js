import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Layout from '../hoc/Layout/Layout';
import Landing from './Landing/Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const Tradeboad = () => <h2>Tradeboad</h2>;
const Settings = () => <h2>Settings</h2>;
const Help = () => <h2>Help</h2>;

class App extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/trade" exact component={Tradeboad} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/help" exact component={Help} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
