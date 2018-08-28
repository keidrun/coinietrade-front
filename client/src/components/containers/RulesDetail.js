import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRule, deleteRule } from '../../actions';
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

const RulesDetailWrapper = styled.div`
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

const StyledContent = styled.div`
  margin-top: 20px;
  border: dashed 5px #000;
  background-color: white;
  width: 1000px;
`;

const StyledFiledArea = styled.div`
  padding: 15px;

  h4 {
    margin-left: 20px;
    font-size: 3rem;
    display: inline;
  }
  div {
    margin-top: 20px;
    font-size: 3rem;
    text-align: center;
  }
`;

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
      return <Loading />;
    }

    return (
      <div>
        {error ? renderErrors(error) : null}
        <RulesDetailWrapper>
          <h2>Rule Detail</h2>
          <Link to="/rules">
            <Button btnType="back">&lt;&lt; Back</Button>
          </Link>
          <FlexWrapper>
            <StyledContent>
              <StyledFiledArea>
                <h4>ID:</h4>
                <div>{rule.ruleId}</div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Exchange Site A:</h4>
                <div>{showExchangeSite(rule.oneSiteName)}</div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Exchange Site B:</h4>
                <div>{showExchangeSite(rule.otherSiteName)}</div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Pair:</h4>
                <div>{showPair(getPair(rule.coinUnit, rule.currencyUnit))}</div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Strategy:</h4>
                <div>{showStrategy(rule.strategy)}</div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Order Type:</h4>
                <div>{showOrderType(rule.orderType)}</div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Asset Minimum Limit:</h4>
                <div>
                  {showAssetMinLimit(rule.assetMinLimit, rule.currencyUnit)}
                </div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Asset Range:</h4>
                <div>{showAsPercentage(rule.assetRange)}</div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Buy Weight Rate:</h4>
                <div>{showAsPercentage(rule.buyWeightRate)}</div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Sell Weight Rate:</h4>
                <div>{showAsPercentage(rule.sellWeightRate)}</div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Profit:</h4>
                <div>{showProfit(rule.totalProfit, rule.currencyUnit)}</div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Status:</h4>
                <div>{showStatus(rule.status)}</div>
              </StyledFiledArea>
              <StyledFiledArea>
                <h4>Modified At:</h4>
                <div>{rule.modifiedAt}</div>
              </StyledFiledArea>
              <Button onClick={this.onDeleteClick.bind(this)}>Delete</Button>
            </StyledContent>
          </FlexWrapper>
        </RulesDetailWrapper>
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
