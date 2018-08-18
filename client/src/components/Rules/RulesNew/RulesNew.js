import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRule } from '../../../actions';
import { validateRulesNewForm as validate } from '../../../validates';
import {
  renderTextField,
  renderSelectField,
  muiStyles,
  renderErrors,
} from '../../../utils';
import {
  STRATEGIES,
  ORDER_TYPES,
  COINS_PAIR,
  getUnits,
  EXCHANGE_SITES,
} from '../rulesUtils';

import styles from './RulesNew.css';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

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
        {error ? renderErrors(error) : <div />}
        <div className={styles.rules_new}>
          <h3>New Rule</h3>
          <div className={styles.button_area}>
            <Link to="/rules">
              <RaisedButton secondary={true} style={muiStyles.backButton}>
                &lt;&lt; Back
              </RaisedButton>
            </Link>
          </div>

          <div className={styles.flex_wrapper}>
            <form
              className={styles.form}
              onSubmit={handleSubmit(this.onSubmit.bind(this))}
            >
              <div className={styles.select_field}>
                <h4>Exchange Site A</h4>
                <br />
                <Field
                  name="oneSiteName"
                  component={renderSelectField}
                  style={muiStyles.selectField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                >
                  <MenuItem
                    className={styles.select_item}
                    value={EXCHANGE_SITES.BITFLYER}
                    primaryText="Bitflyer"
                  />
                  <MenuItem
                    className={styles.select_item}
                    value={EXCHANGE_SITES.ZAIF}
                    primaryText="Zaif"
                  />
                </Field>
              </div>

              <div className={styles.select_field}>
                <h4>Exchange Site B</h4>
                <br />
                <Field
                  name="otherSiteName"
                  component={renderSelectField}
                  style={muiStyles.selectField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                >
                  <MenuItem
                    className={styles.select_item}
                    value={EXCHANGE_SITES.BITFLYER}
                    primaryText="Bitflyer"
                  />
                  <MenuItem
                    className={styles.select_item}
                    value={EXCHANGE_SITES.ZAIF}
                    primaryText="Zaif"
                  />
                </Field>
              </div>

              <div className={styles.select_field}>
                <h4>Pair</h4>
                <br />
                <Field
                  name="coinsPair"
                  component={renderSelectField}
                  style={muiStyles.selectField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                >
                  <MenuItem
                    className={styles.select_item}
                    value={COINS_PAIR.BTC_JPY}
                    primaryText="BTC <=> JPY"
                  />
                </Field>
              </div>

              <div className={styles.select_field}>
                <h4>Strategy</h4>
                <br />
                <Field
                  name="strategy"
                  component={renderSelectField}
                  style={muiStyles.selectField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                >
                  <MenuItem
                    className={styles.select_item}
                    value={STRATEGIES.SIMPLE_ARBITRAGE}
                    primaryText="Simple Arbitrage"
                  />
                </Field>
              </div>

              <div className={styles.select_field}>
                <h4>Order Type</h4>
                <br />
                <Field
                  name="orderType"
                  component={renderSelectField}
                  style={muiStyles.selectField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                >
                  <MenuItem
                    className={styles.select_item}
                    value={ORDER_TYPES.LIMIT_ORDER}
                    primaryText="Limit Order"
                  />
                </Field>
              </div>

              <div className={styles.text_field}>
                <h4>Asset Minimum Limit</h4>
                <br />
                <Field
                  name="assetMinLimit"
                  component={renderTextField}
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Enter a number >= 0"
                  style={muiStyles.textField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                />
              </div>
              <div className={styles.text_field}>
                <h4>Asset Range [%]</h4>
                <br />
                <Field
                  name="assetRangePercentage"
                  component={renderTextField}
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  placeholder="Enter 0 [%] to 100 [%]"
                  style={muiStyles.textField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                />
              </div>
              <div className={styles.text_field}>
                <h4>Buy Weight Rate [%]</h4>
                <br />
                <Field
                  name="buyWeightRatePercentage"
                  component={renderTextField}
                  type="number"
                  min="0.000"
                  max="200.000"
                  step="0.001"
                  placeholder="Enter 0.000 [%] to 200.000 [%]"
                  style={muiStyles.textField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                />
              </div>
              <div className={styles.text_field}>
                <h4>Sell Weight Rate [%]</h4>
                <br />
                <Field
                  name="sellWeightRatePercentage"
                  component={renderTextField}
                  type="number"
                  min="0.000"
                  max="200.000"
                  step="0.001"
                  placeholder="Enter 0.000 [%] to 200.000 [%]"
                  style={muiStyles.textField}
                  underlineFocusStyle={muiStyles.underlineStyle}
                />
              </div>

              <div className={styles.button_area}>
                <RaisedButton
                  secondary={true}
                  style={muiStyles.button}
                  type="submit"
                  disabled={pristine || submitting}
                >
                  Create
                </RaisedButton>
              </div>
            </form>
          </div>
        </div>
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
