import React from 'react';
import LabeledValue from 'components/shared/text/LabeledValue';
import Typography from '@material-ui/core/Typography';

const PersonProfile = () => {
  return (
    <div>
      <Typography>שם מלא</Typography>
      <LabeledValue
        label='היררכיה'
        value='יווט\יויו\יוו'
      />
      <LabeledValue
        label='תפקיד'
        value='מהדחגכ'
      />
    </div>
  );
}