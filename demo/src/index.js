import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import Counter from './Counter';
import Mouse from './Mouse';
import Timer from './Timer';
import { Composed } from '../../src';

import { CounterView, TimerView } from './views';

const Demo = () => (
  <Fragment>
    <Composed
      components={[
        Counter,
        <Counter initialValue={11} />,
        Mouse,
      ]}
      render={(counter1, counter2, mouse) => (
        <Fragment>
          <h1>Using "children" as render prop</h1>
          <h3>
            Mouse is at ({mouse.x}, {mouse.y})
          </h3>
          <CounterView label="First counter" {...counter1} />
          <CounterView label="Second counter" {...counter2} />
        </Fragment>
      )}
    />
    <Composed
      renderPropName="render"
      components={[
        <Timer interval={432} />,
        Timer,
        <Timer interval={1234} />,
        Mouse,
      ]}
    >
      {(fast, normal, slow, mouse) => (
        <Fragment>
          <h1>Using "render" as render prop</h1>
          <h3>
            Mouse is at ({mouse.x}, {mouse.y})
          </h3>
          <TimerView label="Fast timer" {...fast} />
          <TimerView label="Normal timer" {...normal} />
          <TimerView label="Slow timer" {...slow} />
        </Fragment>
      )}
    </Composed>
  </Fragment>
);

render(<Demo />, document.querySelector('#demo'));
