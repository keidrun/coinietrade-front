import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from '../hoc/Layout';
import Auth from '../hoc/Auth';

import Landing from './containers/Landing';
import Dashboard from './containers/Dashboard';
import Events from './containers/Events';
import RulesList from './containers/RulesList';
import RulesNew from './containers/RulesNew';
import RulesDetail from './containers/RulesDetail';
import Settings from './containers/Setting';

import Help from './pages/Help';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/dashboard" exact component={Auth(Dashboard, true)} />
            <Route path="/rules/new" exact component={Auth(RulesNew, true)} />
            <Route path="/rules" exact component={Auth(RulesList, true)} />
            <Route
              path="/rules/:id"
              exact
              component={Auth(RulesDetail, true)}
            />
            <Route path="/meetup" exact component={Auth(Events, true)} />
            <Route path="/settings" exact component={Auth(Settings, true)} />
            <Route path="/help" exact component={Auth(Help, true)} />
            <Route path="/privacy" exact component={PrivacyPolicy} />
            <Route path="/terms" exact component={TermsOfService} />
            <Route path="/" component={Auth(Landing, false)} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
