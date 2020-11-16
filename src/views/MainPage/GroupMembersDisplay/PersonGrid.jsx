import React, { useState } from 'react';
import Grid from 'components/shared/VirtualGrid/VirtualGrid';
import PersonGridItem from 'components/persons/personGrid/PersonGridItem';
import ProfileDialog from 'components/persons/personDetails/PersonProfileDialog';
import { makeStyles } from '@material-ui/styles';


const gridItemStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: 'pointer'
  }
}));

const PersonGrid = ({
  persons,
  itemWidth,
  itemHeight,
  spacing
}) => {
  const gridItemClasses = gridItemStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [clickedPerson, setClickedPerson] = useState({});
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleGridItemClick = (e, itemData) => {
    setClickedPerson(itemData);
    setDialogOpen(true);
  }

  return (<>
    <Grid
      items={persons}
      itemWidth={itemWidth} 
      itemHeight={itemHeight} 
      spacing={spacing}
      itemKey={({ item: person }) => person.id}
      itemRenderer={({ item: person, style }) => {
        return (
          <PersonGridItem
            classes={gridItemClasses}
            label={person.fullName}
            width={style.width}
            style={style}
            onClick={e => handleGridItemClick(e, person)}
          />
        )
      }}
    />
    <ProfileDialog
      open={dialogOpen}
      onClose={handleDialogClose}
      person={clickedPerson}
    />
  </>);
}

export default PersonGrid;
