import React, { useState } from 'react';
import Observer from '@researchgate/react-intersection-observer';
import renderProps from 'render-props';

const DummyDiv = (<div style={{color: 'transparent'}}>.</div>);

const VisibilityOptimizer = (props) => {
  const {
    children,
    render,
    component,
    defaultVisibility,
    ...passThrough
  } = props;

  const [visible, setVisible] = useState(defaultVisibility);

  const handleObserverChange = ({ isIntersecting }) => {
    if(visible !== isIntersecting) {
      setVisible(isIntersecting);
    }
  };

  const componentOrFunction = component || render || children;

  return (
    <Observer onChange={handleObserverChange}>{
      visible ?
      <div>{ renderProps(componentOrFunction, { ...passThrough, visible }) }</div> :
      DummyDiv
    }</Observer> 
  );

};

export default VisibilityOptimizer;
