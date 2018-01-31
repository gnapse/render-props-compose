import React, { Component } from 'react';

export default class Timer extends Component {
  static defaultProps = {
    interval: 1000,
  }

  state = { ticks: 0 };

  componentDidMount() {
    this.initTimer();
  }

  componentWillUnmount() {
    this.killTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.interval != this.props.interval) {
      this.initTimer();
    }
  }

  killTimer = () => {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }

  initTimer = () => {
    this.killTimer();
    this.timer = setInterval(this.onTimerTick, this.props.interval);
  }

  onTimerTick = () => {
    this.setState(({ ticks }) => ({ ticks: ticks + 1 }));
  }

  reset = () => {
    this.setState({ ticks: 0 }, this.initTimer);
  }

  render() {
    const { ticks } = this.state;
    return this.props.children({ ticks, reset: this.reset });
  }
}
