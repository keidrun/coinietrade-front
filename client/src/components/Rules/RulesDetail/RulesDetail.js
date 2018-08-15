import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRule, deleteRule } from '../../../actions';

import styles from './RulesDetail.css';
import CircularProgress from 'material-ui/CircularProgress';

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
        <Link to="/rules">
          <button> &lt;&lt; Back</button>
        </Link>
        <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
        <div>
          <h4>ID:</h4>
          <p>{rule.ruleId}</p>
          <h4>Exchange Site A:</h4>
          <p>{rule.oneSiteName}</p>
          <h4>Exchange Site B:</h4>
          <p>{rule.otherSiteName}</p>
          <h4>Pair:</h4>
          <p>{`${rule.coinUnit}/${rule.currencyUnit}`}</p>
          <h4>Strategy:</h4>
          <p>{rule.strategy}</p>
          <h4>Order Type:</h4>
          <p>{rule.orderType}</p>
          <h4>Asset Range:</h4>
          <p>{rule.assetRange}</p>
          <h4>Asset Minimum Limit:</h4>
          <p>{rule.assetMinLimit}</p>
          <h4>Buy Weight Rate:</h4>
          <p>{rule.buyWeightRate}</p>
          <h4>Sell Weight Rate:</h4>
          <p>{rule.sellWeightRate}</p>
          <h4>Profit:</h4>
          <p>{rule.totalProfit}</p>
          <h4>Status:</h4>
          <p>{rule.status}</p>
          <h4>Modified At:</h4>
          <p>{rule.modifiedAt}</p>
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
