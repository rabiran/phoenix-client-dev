import React from 'react';
import PersonGrid from 'features/persons/personGrid/PersonGrid';

const Demo = (props) => {
  const persons = [...Array(20).keys()].map(i => ({id: i, name: `אלעד בירן הרבירן`}));
  const personIds = ['1', '2']; 
  return (
    <PersonGrid personIds={personIds}></PersonGrid>
  );
};

export default Demo;