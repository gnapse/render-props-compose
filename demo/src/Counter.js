import React, { Component } from 'react';

export default class Counter extends Component {
  static defaultProps = {
    initialValue: 0,
  };

  state = { value: this.props.initialValue };

  changeBy = count => () => {
    this.setState(({ value }) => ({ value: value + count }));
  };

  increment = this.changeBy(1);
  decrement = this.changeBy(-1);

  render() {
    const { increment, decrement, state: { value } } = this;
    return this.props.children({ value, increment, decrement });
  }
}
