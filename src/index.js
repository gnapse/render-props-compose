import React from 'react';

const process = (component, ...args) =>
  (typeof component.type === 'function'
    ? React.cloneElement
    : React.createElement)(component, ...args);

export const composed = components => ({ children }) =>
  components.reduceRight(
    (memo, component) => (...propsList) =>
      process(component, {
        children: props => memo(...propsList.concat(props)),
      }),
    (...propsList) => children(...propsList)
  )();

export const Composed = ({ components, ...props }) =>
  composed(components)(props);

// Default export for the UMD build
export default { composed, Composed };
