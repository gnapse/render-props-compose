# render-props-compose

This library makes it possible to combine `n` nested render-props components, each taking 1 argument, and build a single render prop component that takes `n` arguments. This allows you to flatten a deeply nested construct of render props. It composes your render props like you compose functions or HOCs.

Using this library you can turn this:

```javascript
const App = () => (
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
)
```

into this:

```javascript
const App = () => (
  <Composed components={[Counter, Timer, Mouse]}>
    {(counterProps, timerProps, mouseProps) => (
      <YourComponent
        {...counterProps}
        {...timerProps}
        {...mouseProps}
      />
    )}
  </Composed>
)
```

## Install

```
npm install --save render-props-compose
```

or using yarn:

```
yarn add render-props-compose
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

### Customize the render prop name

This library works by default with the render prop passed as `children`, allowing you to nest the render prop within the opening and closing tags. You can customize what name to use by passing the `renderPropName` option. For instance, to allow it to work with the render prop passed as `render`, you can do the following:

```javascript
// Using the Composed component
const App = () => (
  <Composed
    renderPropName="render"
    components={[Counter, Timer, Mouse]}
    render={(counterProps, timerProps, mouseProps) => (
      <YourComponent
        {...counterProps}
        {...timerProps}
        {...mouseProps}
      />
    )}
  />
)

// Using the composed function
const CounterAndTimer = composed([Counter, Timer], { renderPropName: 'render'});

const App = () => (
  <CounterAndTimer
    renderPropName="render"
    render={(counter, timer) => (
      <YourComponent
        {...counter}
        {...timer}
      />
    )}
  />
);
```
