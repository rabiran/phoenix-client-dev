import React from 'react';
import { Typography } from '@material-ui/core';

/**
 * Gets value returns title.
 * @param {string} props.title
 */
export default function Title(props) {
  return (
    <Typography variant="h4">{props.title}</Typography>
  );
}
