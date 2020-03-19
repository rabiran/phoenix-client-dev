import React from 'react';
import PersonGrid from 'features/persons/personGrid/personsGrid';

const Demo = (props) => {
  const persons = [...Array(20).keys()].map(i => ({id: i, name: `אלעד בירן הרבירן`}));
  return (
    <PersonGrid persons={persons}></PersonGrid>
  );
};

export default Demo;