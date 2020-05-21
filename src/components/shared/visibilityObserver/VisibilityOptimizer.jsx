import React, { useState } from 'react';
import Observer from '@researchgate/react-intersection-observer';

const VisibilityOptimizer = (props) => {
  const {
    children,
    render,
    component,
    defaultVisibility,
    invisibleStyles = {},
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
      <div style={{ color: 'transparent', ...invisibleStyles }}>.</div>
    }</Observer> 
  );
};

export default VisibilityOptimizer;
