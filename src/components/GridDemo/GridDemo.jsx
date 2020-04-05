import React, { useEffect } from 'react';
import PersonGrid from 'features/persons/personGrid/PersonGrid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByGroupIdIfNeeded, selectIdsByGroupId } from 'features/persons/personsSlice';
import rootGroup from 'api/groups/rootGroup';

const Demo = (props) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchByGroupIdIfNeeded(rootGroup.id));
  // }, [dispatch]);
  // const persons = [...Array(20).keys()].map(i => ({id: i, name: `אלעד בירן הרבירן`}));
  const personIds = useSelector(state => selectIdsByGroupId(state, rootGroup.id)) || [];
  return (
    <PersonGrid personIds={personIds}></PersonGrid>
  );
};

export default Demo;