import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRules, fetchPolicy } from '../../../actions';
import { muiStyles } from '../../../utils';
import {
  getPair,
  showExchangeSite,
  showPair,
  showStrategy,
  showOrderType,
  showProfit,
  showStatus,
} from '../rulesUtils';

import styles from './RulesList.css';
import RaisedButton from 'material-ui/RaisedButton';

class RulesList extends Component {
  componentDidMount() {
    this.props.fetchRules();
    this.props.fetchPolicy();
  }

  renderRules() {
    return _.map(this.props.rules, rule => (
      <tr key={rule.ruleId}>
        <td>{rule.ruleId.substr(0, 8)}</td>
        <td>{showExchangeSite(rule.oneSiteName)}</td>
        <td>{showExchangeSite(rule.otherSiteName)}</td>
        <td>{showPair(getPair(rule.coinUnit, rule.currencyUnit))}</td>
        <td>{showStrategy(rule.strategy)}</td>
        <td>{showOrderType(rule.orderType)}</td>
        <td>{rule.assetRange}</td>
        <td>{rule.assetMinLimit}</td>
        <td>{rule.buyWeightRate}</td>
        <td>{rule.sellWeightRate}</td>
        <td>{showProfit(rule.totalProfit, rule.currencyUnit)}</td>
        <td>{showStatus(rule.status)}</td>
        <td>
          <span className={styles.button_area}>
            <Link to={`/rules/${rule.ruleId}`}>
              <RaisedButton secondary={true} style={muiStyles.tableButton}>
                Detail
              </RaisedButton>
            </Link>
          </span>
        </td>
      </tr>
    ));
  }

  renderCreateButton() {
    const rulesNum = _.keys(this.props.rules).length;
    const ruleLimit = this.props.policy.ruleLimit;

    return isFinite(rulesNum) && isFinite(ruleLimit) && rulesNum < ruleLimit ? (
      <div className={styles.button_area}>
        <Link to="/rules/new">
          <RaisedButton secondary={true} style={muiStyles.backButton}>
            Create a new rule
          </RaisedButton>
        </Link>
      </div>
    ) : (
      ''
    );
  }

  render() {
    return (
      <div className={styles.rules_list}>
        <h2>Trade Rules</h2>
        <div>{this.renderCreateButton()}</div>
        <div className={styles.flex_wrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Site A</th>
                <th>Site B</th>
                <th>Pair</th>
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
