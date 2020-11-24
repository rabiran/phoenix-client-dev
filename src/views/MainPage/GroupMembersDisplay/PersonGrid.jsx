import React, { memo } from 'react';
import Grid from 'components/shared/VirtualGrid';
import PersonGridItem from 'components/persons/personGrid/PersonGridItem';
// import ProfileDialog from 'components/persons/personDetails/PersonProfileDialog';
import { makeStyles } from '@material-ui/styles';


const gridItemStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: 'pointer'
  }
}));

const PersonGrid = memo(({
  persons,
  itemWidth,
  itemHeight,
  spacing,
  onGridItemClick,
}) => {
  const gridItemClasses = gridItemStyles();

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
            onClick={e => onGridItemClick(e, person)}
          />
        )
      }}
    />
  </>);
})

export default PersonGrid;
