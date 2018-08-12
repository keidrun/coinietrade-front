import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRules, fetchPolicy } from '../../../actions';

import styles from './RulesList.css';

class RulesList extends Component {
  componentDidMount() {
    this.props.fetchRules();
    this.props.fetchPolicy();
  }

  renderRules() {
    return _.map(this.props.rules, rule => (
      <tr key={rule.ruleId}>
        <td>{rule.ruleId.substr(0, 8)}</td>
        <td>{`${rule.coinUnit}/${rule.currencyUnit}`}</td>
        <td>{rule.oneSiteName}</td>
        <td>{rule.otherSiteName}</td>
        <td>{rule.strategy}</td>
        <td>{rule.orderType}</td>
        <td>{rule.assetRange}</td>
        <td>{rule.assetMinLimit}</td>
        <td>{rule.buyWeightRate}</td>
        <td>{rule.sellWeightRate}</td>
        <td>{rule.totalProfit}</td>
        <td>{rule.status}</td>
        <td>
          <button>
            <Link to={`/rules/${rule.ruleId}`}>Detail</Link>
          </button>
        </td>
      </tr>
    ));
  }

  renderCreateButton() {
    const rulesNum = _.keys(this.props.rules).length;
    const ruleLimit = this.props.policy.ruleLimit;

    return isFinite(rulesNum) && isFinite(ruleLimit) && rulesNum < ruleLimit ? (
      <button>
        <Link to="/rules/new">Create a new rule</Link>
      </button>
    ) : (
      ''
    );
  }

  render() {
    return (
      <div className={styles.rules_list}>
        <h2>Rules</h2>
        <div>{this.renderCreateButton()}</div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pair</th>
              <th>Site A</th>
              <th>Site B</th>
              <th>Strategy</th>
              <th>Order Type</th>
              <th>Asset Range</th>
              <th>Asset Minimum Limit</th>
              <th>Buy Weight Rate</th>
              <th>Sell Weight Rate</th>
              <th>Profit</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>{this.renderRules()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ rules, policy }) {
  return { rules, policy };
}

export default connect(
  mapStateToProps,
  { fetchRules, fetchPolicy },
)(RulesList);
