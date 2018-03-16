import React, { Component } from 'react';
import Chart from '../../widgets/Chart';

import styles from './Dashboard.css';

import io from 'socket.io-client';

let socket;
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'integration'
) {
  socket = io({
    path: '/socket'
  });
} else {
  socket = io('http://localhost:5000', {
    path: '/socket'
  });
}

const X_AXIS_NUM = 61;

class Dashboard extends Component {
  state = {
    bitflyer: {
      firstPrices: [],
      bidPrices: [],
      askPrices: [],
      lastPrices: []
    },
    coincheck: {
      firstPrices: [],
      bidPrices: [],
      askPrices: [],
      lastPrices: []
    },
    zaif: {
      firstPrices: [],
      bidPrices: [],
      askPrices: [],
      lastPrices: []
    }
  };

  mapDataToCompanyObj = (data, companyName) => {
    const lastLength = this.state[companyName].lastPrices.length;
    let firstPrices, bidPrices, askPrices, lastPrices;
    if (lastLength === 0) {
      firstPrices = [0];
      bidPrices = [...this.state[companyName].bidPrices, data[companyName].bid];
      askPrices = [...this.state[companyName].askPrices, data[companyName].ask];
      lastPrices = [
        ...this.state[companyName].lastPrices,
        data[companyName].last
      ];
    } else if (lastLength > X_AXIS_NUM) {
      firstPrices = [
        ...this.state[companyName].firstPrices.slice(1),
        this.state[companyName].lastPrices[lastLength - 1]
      ];
      bidPrices = [
        ...this.state[companyName].bidPrices.slice(1),
        data[companyName].bid
      ];
      askPrices = [
        ...this.state[companyName].askPrices.slice(1),
        data[companyName].ask
      ];
      lastPrices = [
        ...this.state[companyName].lastPrices.slice(1),
        data[companyName].last
      ];
    } else {
      firstPrices = [
        ...this.state[companyName].firstPrices,
        this.state[companyName].lastPrices[lastLength - 1]
      ];
      bidPrices = [...this.state[companyName].bidPrices, data[companyName].bid];
      askPrices = [...this.state[companyName].askPrices, data[companyName].ask];
      lastPrices = [
        ...this.state[companyName].lastPrices,
        data[companyName].last
      ];
    }

    return {
      firstPrices,
      bidPrices,
      askPrices,
      lastPrices
    };
  };

  componentWillMount() {
    socket.on('connect', () => {
      console.log('CLIENT: connected to server');
    });

    socket.on('update:dashboard', data => {
      this.setState({
        bitflyer: this.mapDataToCompanyObj(data, 'bitflyer'),
        coincheck: this.mapDataToCompanyObj(data, 'coincheck'),
        zaif: this.mapDataToCompanyObj(data, 'zaif')
      });
    });

    socket.on('disconnect', () => {
      console.log('CLIENT: disconnected from server');
    });
  }

  render() {
    return (
      <div className={styles.dashboard}>
        <h2>Bid and Ask</h2>
        <Chart
          xAxisNum={X_AXIS_NUM}
          bitflyerBids={this.state.bitflyer.bidPrices}
          bitflyerAsks={this.state.bitflyer.askPrices}
          coincheckBids={this.state.coincheck.bidPrices}
          coincheckAsks={this.state.coincheck.askPrices}
          zaifBids={this.state.zaif.bidPrices}
          zaifAsks={this.state.zaif.askPrices}
        />
      </div>
    );
  }
}

export default Dashboard;
