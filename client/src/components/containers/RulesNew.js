import React, { Component } from 'react';
import styled from 'styled-components';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRule } from '../../actions';
import { validateRulesNewForm as validate } from '../../validates';
import { renderErrors, rulesUtils } from '../../utils';

import MenuItem from 'material-ui/MenuItem';
import Form from '../common/Form';
import Button from '../common/Button';
import ReduxFormTextField from '../common/ReduxFormTextField';
import ReduxFormSelectField from '../common/ReduxFormSelectField';

const {
  STRATEGIES,
  ORDER_TYPES,
  COINS_PAIR,
  getUnits,
  EXCHANGE_SITES,
} = rulesUtils;

const RuleNewWrapper = styled.div`
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

const StyledTextFieldArea = styled.div`
  margin: 20px auto;

  h4 {
    margin-left: 20px;
    font-size: 3rem;
    display: inline;
  }
  h5 {
    margin-left: 40px;
    font-size: 2.5rem;
    display: inline;
  }
  input {
    font-size: 4rem;
    text-align: center;
  }
`;

const StyledSelectFieldArea = styled.div`
  margin: 20px;

  h4 {
    font-size: 3rem;
    display: inline;
  }
  div {
    font-size: 3rem;
    text-align: center;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  div {
    font-size: 2rem;
    text-align: center;
  }
`;

class RulesNew extends Component {
  onSubmit(values) {
    const rule = values;
    const units = getUnits(rule.coinsPair);
    rule.coinUnit = units.coinUnit;
    rule.currencyUnit = units.currencyUnit;

    rule.assetRange = rule.assetRangePercentage / 100;
    rule.buyWeightRate = rule.buyWeightRatePercentage / 100;
    rule.sellWeightRate = rule.sellWeightRatePercentage / 100;

    this.props.createRule(rule, () => {
      this.props.history.push('/rules');
    });
  }

  render() {
    const { error, handleSubmit, pristine, submitting } = this.props;

    return (
      <div>
        {error ? renderErrors(error) : null}
        <RuleNewWrapper>
          <h3>New Rule</h3>
          <Link to="/rules">
            <Button btnType="back">&lt;&lt; Back</Button>
          </Link>

          <FlexWrapper>
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <StyledSelectFieldArea>
                <h4>Exchange Site A</h4>
                <br />
                <ReduxFormSelectField name="oneSiteName">
                  <StyledMenuItem
                    value={EXCHANGE_SITES.BITFLYER}
                    primaryText="Bitflyer"
                  />
                  <StyledMenuItem
                    value={EXCHANGE_SITES.ZAIF}
                    primaryText="Zaif"
                  />
                </ReduxFormSelectField>
              </StyledSelectFieldArea>

              <StyledSelectFieldArea>
                <h4>Exchange Site B</h4>
                <br />
                <ReduxFormSelectField name="otherSiteName">
                  <StyledMenuItem
                    value={EXCHANGE_SITES.BITFLYER}
                    primaryText="Bitflyer"
                  />
                  <StyledMenuItem
                    value={EXCHANGE_SITES.ZAIF}
                    primaryText="Zaif"
                  />
                </ReduxFormSelectField>
              </StyledSelectFieldArea>

              <StyledSelectFieldArea>
                <h4>Pair</h4>
                <br />
                <ReduxFormSelectField name="coinsPair">
                  <StyledMenuItem
                    value={COINS_PAIR.BTC_JPY}
                    primaryText="BTC <=> JPY"
                  />
                </ReduxFormSelectField>
              </StyledSelectFieldArea>

              <StyledSelectFieldArea>
                <h4>Strategy</h4>
                <br />
                <ReduxFormSelectField name="strategy">
                  <StyledMenuItem
                    value={STRATEGIES.SIMPLE_ARBITRAGE}
                    primaryText="Simple Arbitrage"
                  />
                </ReduxFormSelectField>
              </StyledSelectFieldArea>

              <StyledSelectFieldArea>
                <h4>Order Type</h4>
                <br />
                <ReduxFormSelectField name="orderType">
                  <StyledMenuItem
                    value={ORDER_TYPES.LIMIT_ORDER}
                    primaryText="Limit Order"
                  />
                </ReduxFormSelectField>
              </StyledSelectFieldArea>

              <StyledTextFieldArea>
                <h4>Asset Minimum Limit</h4>
                <br />
                <ReduxFormTextField
                  name="assetMinLimit"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Enter a number >= 0"
                />
              </StyledTextFieldArea>
              <StyledTextFieldArea>
                <h4>Asset Range [%]</h4>
                <br />
                <ReduxFormTextField
                  name="assetRangePercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  placeholder="Enter 0 [%] to 100 [%]"
                />
              </StyledTextFieldArea>
              <StyledTextFieldArea>
                <h4>Buy Weight Rate [%]</h4>
                <br />
                <ReduxFormTextField
                  name="buyWeightRatePercentage"
                  type="number"
                  min="0.000"
                  max="200.000"
                  step="0.001"
                  placeholder="Enter 0.000 [%] to 200.000 [%]"
                />
              </StyledTextFieldArea>
              <StyledTextFieldArea>
                <h4>Sell Weight Rate [%]</h4>
                <br />
                <ReduxFormTextField
                  name="sellWeightRatePercentage"
                  type="number"
                  min="0.000"
                  max="200.000"
                  step="0.001"
                  placeholder="Enter 0.000 [%] to 200.000 [%]"
                />
              </StyledTextFieldArea>

              <Button type="submit" disabled={pristine || submitting}>
                Create
              </Button>
            </Form>
          </FlexWrapper>
        </RuleNewWrapper>
      </div>
    );
  }
}

function mapStateToProps({ rules, error }) {
  return { rules, error };
}

export default reduxForm({
  form: 'RulesNewForm',
  validate,
  initialValues: {
    coinsPair: COINS_PAIR.BTC_JPY,
    strategy: STRATEGIES.SIMPLE_ARBITRAGE,
    orderType: ORDER_TYPES.LIMIT_ORDER,
    assetMinLimit: '0',
    assetRangePercentage: '100',
    buyWeightRatePercentage: '100.000',
    sellWeightRatePercentage: '100.000',
  },
})(
  connect(
    mapStateToProps,
    { createRule },
  )(RulesNew),
);
