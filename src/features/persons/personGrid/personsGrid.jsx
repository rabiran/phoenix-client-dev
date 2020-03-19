import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import { makeStyles, styled } from '@material-ui/styles';

const styles = makeStyles({

})

const Container = styled('div')({
  overflowX: 'hidden',
  minHeight: 500,
  padding: 5
});

const PersonGrid = (props) => {
  const {
    persons
  } = props;

  return (
    <Container>
      <Grid spacing={1} container>
      {persons.map((p, i) => (
        <Grid key={p.id} item >
          
          <Avatar style={{width: '70px', height: '70px', margin: '0 auto'}} ></Avatar>
          <div style={{textAlign: 'center', wordWrap: 'break-word', maxWidth: '75px'}}>{p.name}</div>
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default PersonGrid;