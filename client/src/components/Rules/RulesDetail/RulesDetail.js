import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRule, deleteRule } from '../../../actions';
import { muiStyles } from '../../../utils';
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

import styles from './RulesDetail.css';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

class RulesDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRule(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deleteRule(id, () => {
      this.props.history.push('/rules');
    });
  }

  renderLoading() {
    return (
      <div className={styles.loading}>
        <CircularProgress size={180} thickness={10} color="#000000" />
      </div>
    );
  }

  render() {
    const rule = this.props.rule;

    if (!rule) {
      return this.renderLoading();
    }

    return (
      <div className={styles.rules_detail}>
        <h2>Rule Detail</h2>
        <div className={styles.button_area}>
          <Link to="/rules">
            <RaisedButton secondary={true} style={muiStyles.backButton}>
              &lt;&lt; Back
            </RaisedButton>
          </Link>
        </div>
        <div className={styles.flex_wrapper}>
          <div className={styles.content}>
            <div className={styles.field}>
              <h4>ID:</h4>
              <div>{rule.ruleId}</div>
            </div>
            <div className={styles.field}>
              <h4>Exchange Site A:</h4>
              <div>{showExchangeSite(rule.oneSiteName)}</div>
            </div>
            <div className={styles.field}>
              <h4>Exchange Site B:</h4>
              <div>{showExchangeSite(rule.otherSiteName)}</div>
            </div>
            <div className={styles.field}>
              <h4>Pair:</h4>
              <div>{showPair(getPair(rule.coinUnit, rule.currencyUnit))}</div>
            </div>
            <div className={styles.field}>
              <h4>Strategy:</h4>
              <div>{showStrategy(rule.strategy)}</div>
            </div>
            <div className={styles.field}>
              <h4>Order Type:</h4>
              <div>{showOrderType(rule.orderType)}</div>
            </div>
            <div className={styles.field}>
              <h4>Asset Minimum Limit:</h4>
              <div>
                {showAssetMinLimit(rule.assetMinLimit, rule.currencyUnit)}
              </div>
            </div>
            <div className={styles.field}>
              <h4>Asset Range:</h4>
              <div>{showAsPercentage(rule.assetRange)}</div>
            </div>
            <div className={styles.field}>
              <h4>Buy Weight Rate:</h4>
              <div>{showAsPercentage(rule.buyWeightRate)}</div>
            </div>
            <div className={styles.field}>
              <h4>Sell Weight Rate:</h4>
              <div>{showAsPercentage(rule.sellWeightRate)}</div>
            </div>
            <div className={styles.field}>
              <h4>Profit:</h4>
              <div>{showProfit(rule.totalProfit, rule.currencyUnit)}</div>
            </div>
            <div className={styles.field}>
              <h4>Status:</h4>
              <div>{showStatus(rule.status)}</div>
            </div>
            <div className={styles.field}>
              <h4>Modified At:</h4>
              <div>{rule.modifiedAt}</div>
            </div>
            <div className={styles.button_area}>
              <RaisedButton
                secondary={true}
                style={muiStyles.button}
                onClick={this.onDeleteClick.bind(this)}
              >
                Delete
              </RaisedButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ rules }, ownProps) {
  return { rule: rules[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  { fetchRule, deleteRule },
)(RulesDetail);
