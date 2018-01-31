import React, { Component } from 'react';

const style = {
  width: '500px',
  height: '500px',
  border: '1px dotted black',
  margin: '10px',
  padding: '10px',
};

export default class Mouse extends Component {
  state = { x: 0, y: 0 };

  onMouseMove = ({ clientX: x, clientY: y }) => {
    this.setState({ x, y });
  };

  render() {
    return (
      <div style={style} onMouseMove={this.onMouseMove}>
        {this.props.children(this.state)}
      </div>
    );
  }
}
