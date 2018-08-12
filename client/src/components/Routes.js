import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from '../hoc/Layout/Layout';
import Auth from '../hoc/Auth/Auth';

import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';
import Events from './Events/Events';
import RulesList from './Rules/RulesList/RulesList';
import RulesNew from './Rules/RulesNew/RulesNew';
import RulesDetail from './Rules/RulesDetail/RulesDetail';
import Settings from './Setting/Setting';
import Help from './Help/Help';

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
            <Route path="/" component={Auth(Landing, false)} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
