import React from 'react';

const labelStyle = {
  display: 'inline-block',
  padding: '.5em',
};

const Label = ({ children }) => (
  <span className="label" style={labelStyle}>
    {children}
  </span>
);

export const CounterView = ({
  label,
  value,
  increment,
  decrement,
  ...props
}) => (
  <p {...props}>
    <button type="button" onClick={decrement}>
      -
    </button>
    <Label>
      {label}: {value}
    </Label>
    <button type="button" onClick={increment}>
      +
    </button>
  </p>
);

export const TimerView = ({ label, ticks, reset, ...props }) => (
  <p {...props}>
    <Label>
      {label}: {ticks}
    </Label>
    <button type="button" onClick={reset}>
      Reset
    </button>
  </p>
);
