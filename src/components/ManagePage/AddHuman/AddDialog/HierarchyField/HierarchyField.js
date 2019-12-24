import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function HierarchyField(props) {

  return (
    <TextField
      onChange={(e) => {
          props.onHierarchy(e);
      }}
      fullWidth
      label="type hierarchy"
      variant="outlined"/>
  );
}

