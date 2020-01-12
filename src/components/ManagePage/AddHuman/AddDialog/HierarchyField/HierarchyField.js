import React from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * (TEST ONLY)Gets hierarchy value, renders custom hierarchy text field
 * @param {string} props.hierarchy
 */
export default function HierarchyField(props) {
  return (
    <>
      <p> או שבחר איררכיה אחרת: </p>
      <TextField
        onChange={(e) => {
            props.onHierarchy(e);
        }}
        fullWidth
        label="type hierarchy"
        variant="outlined"/>
    </>
  );
}

