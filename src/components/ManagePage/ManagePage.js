import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddHuman from './AddHuman/AddHuman';
import ManageTable from './ManageTable/ManageTable'



export default function ManagePage() {
  return (
      <>
        <ManageTable/>
        <AddHuman/>
      </>
     
  );
}

