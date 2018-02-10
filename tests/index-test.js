import expect from 'expect';
import React, { Fragment } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { Composed } from 'src/';

import Counter from '../demo/src/Counter';
import { CounterView } from '../demo/src/views';

const ComposedApp = () => (
  <Composed components={[Counter, <Counter initialValue={123} />]}>
    {(counter1, counter2) => (
      <Fragment>
        <CounterView id="counter1" label="First counter" {...counter1} />
        <CounterView id="counter2" label="Second counter" {...counter2} />
      </Fragment>
    )}
  </Composed>
);

describe('Composed', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('works', () => {
    // TODO
    render(<ComposedApp />, node, () => {
      expect(node.innerHTML).toContain('First counter');
    });
  });
});
