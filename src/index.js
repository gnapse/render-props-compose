import React from 'react';

const process = (component, ...args) =>
  (typeof component.type === 'function'
    ? React.cloneElement
    : React.createElement)(component, ...args);

export function composed(components, { renderPropName = 'children' } = {}) {
  function Composed(props) {
    const children = props.children instanceof Array
      ? props.children[0]
      : props.children
    const render = children || props.render;
    const isArray = Array.isArray(components);
    const list = isArray ? components : Object.keys(components);
    const reducer = isArray
      ? (memo, component) => (...propsList) =>
          process(component, {
            [renderPropName]: props => memo(...propsList.concat(props)),
          })
      : (memo, key) => allProps =>
          process(components[key], {
            [renderPropName]: props => memo({ ...allProps, [key]: props }),
          });
    return list.reduceRight(reducer, render)();
  }
  return Composed;
}

export const Composed = ({ components, renderPropName, ...props }) =>
  composed(components, { renderPropName })(props);

// Default export for the UMD build
export default { composed, Composed };
