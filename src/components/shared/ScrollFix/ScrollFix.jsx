import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles({
  scrollContainer: {
    direction: 'rtl',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: 'inherit'
  },
  childrenContainer: {
    direction: 'ltr',
    overflowX: 'auto',
  }
});
const ScrollFix = ({ children, className }) => {
  const { scrollContainer, childrenContainer } = styles();
  return (
    <div className={clsx(className, scrollContainer)}>
      <div className={childrenContainer}>{children}</div>
    </div>
  );
};

export default ScrollFix;