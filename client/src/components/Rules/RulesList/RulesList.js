import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRules, fetchPolicy } from '../../../actions';
import { muiStyles, renderErrors } from '../../../utils';
import {
  getPair,
  showExchangeSite,
  showPair,
  showStrategy,
  showOrderType,
  showAssetMinLimit,
  showProfit,
  showStatus,
  showAsPercentage,
} from '../rulesUtils';

import styles from './RulesList.css';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

class RulesList extends Component {
  componentDidMount() {
    this.props.fetchRules();
    this.props.fetchPolicy();
  }

  renderRules() {
    return _.map(
      this.props.rules,
      rule =>
        rule.ruleId ? (
          <tr key={rule.ruleId}>
            <td>{rule.ruleId.substr(0, 8)}</td>
            <td>{showExchangeSite(rule.oneSiteName)}</td>
            <td>{showExchangeSite(rule.otherSiteName)}</td>
            <td>{showPair(getPair(rule.coinUnit, rule.currencyUnit))}</td>
            <td>{showStrategy(rule.strategy)}</td>
            <td>{showOrderType(rule.orderType)}</td>
            <td> {showAssetMinLimit(rule.assetMinLimit, rule.currencyUnit)}</td>
            <td>{showAsPercentage(rule.assetRange)}</td>
            <td>{showAsPercentage(rule.buyWeightRate)}</td>
            <td>{showAsPercentage(rule.sellWeightRate)}</td>
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
        ) : (
          <tr key="0" />
        ),
    );
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

  renderLoading() {
    return (
      <div className={styles.loading}>
        <CircularProgress size={180} thickness={10} color="#000000" />
      </div>
    );
  }

  render() {
    const { rules, policy, error } = this.props;

    if (!rules || !policy) {
      return this.renderLoading();
    }

    return (
      <div>
        {error ? renderErrors(error) : <div />}
        <div className={styles.rules_list}>
          <h2>
            Trade Rules <div>Expired At: {policy.expiredAt}</div>
          </h2>
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
                  <th>Asset Minimum Limit</th>
                  <th>Asset Range</th>
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
      </div>
    );
  }
}

function mapStateToProps({ rules, policy, error }) {
  return { rules, policy, error };
}

export default connect(
  mapStateToProps,
  { fetchRules, fetchPolicy },
)(RulesList);
