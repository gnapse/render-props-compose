import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import Counter from './Counter';
import Mouse from './Mouse';
import Timer from './Timer';
import { Composed } from '../../src';

import { CounterView, TimerView } from './views';

const Demo = () => (
  <Composed
    components={[
      Counter,
      <Counter initialValue={11} />,
      <Timer interval={432} />,
      Timer,
      <Timer interval={1234} />,
      Mouse,
    ]}
  >
    {(counter1, counter2, fast, normal, slow, mouse) => (
      <Fragment>
        <h1>Mouse is at ({mouse.x}, {mouse.y})</h1>
        <CounterView label="First counter" {...counter1} />
        <CounterView label="Second counter" {...counter2} />
        <TimerView label="Fast timer" {...fast} />
        <TimerView label="Normal timer" {...normal} />
        <TimerView label="Slow timer" {...slow} />
      </Fragment>
    )}
  </Composed>
);

render(<Demo />, document.querySelector('#demo'));
