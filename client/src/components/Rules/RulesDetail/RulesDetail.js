import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRule, deleteRule } from '../../../actions';
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

import styles from './RulesDetail.css';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from '../../Landing/Landing';

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

  render() {
    const { rule, error } = this.props;

    if (!rule) {
      return <Loading style={styles.loading} />;
    }

    return (
      <div>
        {error ? renderErrors(error) : null}
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
      </div>
    );
  }
}

function mapStateToProps({ rules, error }, ownProps) {
  return { rule: rules[ownProps.match.params.id], error };
}

export default connect(
  mapStateToProps,
  { fetchRule, deleteRule },
)(RulesDetail);
