# render-props-compose

This library makes it possible to combine `n` nested render-props components, each taking 1 argument, and build a single render prop component that takes `n` arguments. This allows you to flatten a deeply nested construct of render props. It composes your render props like you compose functions or HOCs.

Using this library you can turn this:

```javascript
<Counter>
  {counterProps => (
    <Timer>
      {timerProps => (
        <Mouse>
          {mouseProps => (
            <YourComponent
              {...counterProps}
              {...timerProps}
              {...mouseProps}
            />
          )}
        </Mouse>
      )}
    </Timer>
  )}
</Counter>
```

into this:

```javascript
<Composed components={[Counter, Timer, Mouse]}>
  {(counterProps, timerProps, mouseProps) => (
    <YourComponent
      {...counterProps}
      {...timerProps}
      {...mouseProps}
    />
  )}
</Composed>
```

## Install

```
npm install --save-dev render-props-compose
```

or using yarn:

```
yarn add --dev render-props-compose
```

## Usage

Import the `Composed` component:

```javascript
import { Composed } from 'render-props-compose';

const App = () => (
  <Composed components={[Mouse, Timer]}>
    {(mouse, timer) => ( ... )}
  </Composed>
)
```

You can also create an enhanced component using the `composed` function export:

```javascript
import { composed } from 'render-props-compose';

const CounterWithTimer = composed(Counter, Timer);

const App = () => (
  <CounterWithTimer>
    {(counter, timer) => ( ... )}
  </CounterWithTimer>
)
```

### Passing props to composed components

You can pass props to the composed components by referencing them as a React element, instead of just passing the reference to the component.

For instance, in the following example the timer is initialized with an interval of 1500 milliseconds:

```javascript
<Composed components={[Counter, <Timer interval={1500} />, Mouse]}>
  {(counterProps, timerProps, mouseProps) => (
    <YourComponent
      {...counterProps}
      {...timerProps}
      {...mouseProps}
    />
  )}
</Composed>
```
