import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme => ({
  scrollContainer: {
    direction: 'rtl',
    overflowY: 'auto',
    maxHeight: 'inherit'
  },
  childrenContainer: {
    direction: 'ltr',
  }
}));
const ScrollFix = ({ children, className }) => {
  const { scrollContainer, childrenContainer } = styles();
  return (
    <div className={clsx(className, scrollContainer)}>
      <div className={childrenContainer}>{children}</div>

    </div>
  );
};

export default ScrollFix;