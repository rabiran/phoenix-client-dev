import React, { useEffect } from 'react';
import PersonGrid from 'features/persons/personGrid/PersonGrid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByGroupIdIfNeeded, selectPersonsByGroupId } from 'features/persons/personsSlice';
import rootGroup from 'api/groups/rootGroup';

const Demo = (props) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchByGroupIdIfNeeded(rootGroup.id));
  // }, [dispatch]);
  const persons = [...Array(2000).keys()].map(i => ({id: i, fullName: `אלעד בירן הרבירן${i}`}));
  // const persons = useSelector(state => selectPersonsByGroupId(state, rootGroup.id));
  return (
    <PersonGrid 
      style={{width: '700px', height:'650px', overflowY: 'auto'}} 
      persons={persons}>
    </PersonGrid>
  );
};

export default Demo;