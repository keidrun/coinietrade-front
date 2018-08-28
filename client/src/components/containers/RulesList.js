import _ from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRules, fetchPolicy } from '../../actions/';
import { renderErrors, rulesUtils } from '../../utils';
import Loading from '../common/Loading';
import Button from '../common/Button';

const {
  getPair,
  showExchangeSite,
  showPair,
  showStrategy,
  showOrderType,
  showAssetMinLimit,
  showProfit,
  showStatus,
  showAsPercentage,
} = rulesUtils;

const RulesListWrapper = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 40px;
  height: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: 'wrap';
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
`;

const StyledTable = styled.table`
  margin-top: 20px;
  padding: 5px;
  border: dashed 5px #000;
  background-color: white;
  width: 1000px;
  font-size: 7rem;
  text-align: center;

  td {
    padding: 5px;
  }
`;

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
              <Link to={`/rules/${rule.ruleId}`}>
                <Button btnType="table">Detail</Button>
              </Link>
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
      <Link to="/rules/new">
        <Button btnType="back">Create a new rule</Button>
      </Link>
    ) : (
      ''
    );
  }

  render() {
    const { rules, policy, error } = this.props;

    if (!rules || !policy) {
      return <Loading />;
    }

    return (
      <div>
        {error ? renderErrors(error) : null}
        <RulesListWrapper>
          <h2>
            Trade Rules <div>Expired At: {policy.expiredAt}</div>
          </h2>
          <div>{this.renderCreateButton()}</div>
          <FlexWrapper>
            <StyledTable>
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
            </StyledTable>
          </FlexWrapper>
        </RulesListWrapper>
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
