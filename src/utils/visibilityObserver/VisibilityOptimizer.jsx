import React, { useState } from 'react';
import Observer from '@researchgate/react-intersection-observer';

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

  const renderProp = component || render || children;
 
  return (
    <Observer onChange={handleObserverChange}>{
      visible ?
      <div>{ renderProp({ ...passThrough, visible }) }</div> :
      DummyDiv
    }</Observer> 
  );
};

export default VisibilityOptimizer;
