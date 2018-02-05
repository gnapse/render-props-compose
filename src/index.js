import React from 'react';

const process = (component, ...args) =>
  (typeof component.type === 'function'
    ? React.cloneElement
    : React.createElement)(component, ...args);

export function composed(components, { renderPropName = 'children' } = {}) {
  function Composed(props) {
    const render = props.children || props.render;
    return components.reduceRight(
      (memo, component) => (...propsList) =>
        process(component, {
          [renderPropName]: props => memo(...propsList.concat(props)),
        }),
      (...propsList) => render(...propsList)
    )();
  }
  return Composed;
}

export const Composed = ({ components, renderPropName, ...props }) =>
  composed(components, { renderPropName })(props);

// Default export for the UMD build
export default { composed, Composed };
