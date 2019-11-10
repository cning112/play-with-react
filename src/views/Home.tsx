import React, { Fragment } from 'react';
import Card from 'src/components/Card';
import { ProjectInfo } from 'src/types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

function getData(): ProjectInfo[] {
  return [
    { id: 'p1', name: 'Proj alpha', description: 'Alpha', endpoint: '/alpha' },
    { id: 'p2', name: 'Proj beta', description: 'Beta', endpoint: '/beta' },
    { id: 'p1', name: 'Proj alpha', description: 'Alpha', endpoint: '/alpha' },
    { id: 'p2', name: 'Proj beta', description: 'Beta', endpoint: '/beta' },
    { id: 'p1', name: 'Proj alpha', description: 'Alpha', endpoint: '/alpha' },
    { id: 'p2', name: 'Proj beta', description: 'Beta', endpoint: '/beta' },
    { id: 'p1', name: 'Proj alpha', description: 'Alpha', endpoint: '/alpha' },
    { id: 'p2', name: 'Proj beta', description: 'Beta', endpoint: '/beta' },
    { id: 'p1', name: 'Proj alpha', description: 'Alpha', endpoint: '/alpha' },
    { id: 'p2', name: 'Proj beta', description: 'Beta', endpoint: '/beta' },
    { id: 'p1', name: 'Proj alpha', description: 'Alpha', endpoint: '/alpha' },
    { id: 'p2', name: 'Proj beta', description: 'Beta', endpoint: '/beta' },
    { id: 'p1', name: 'Proj alpha', description: 'Alpha', endpoint: '/alpha' },
    { id: 'p2', name: 'Proj beta', description: 'Beta', endpoint: '/beta' },
    { id: 'p1', name: 'Proj alpha', description: 'Alpha', endpoint: '/alpha' },
    { id: 'p2', name: 'Proj beta', description: 'Beta', endpoint: '/beta' }
  ];
}

const useStyles = makeStyles({
  cards: {
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
    justifyItems: 'center'
  }
});

export default function Home() {
  const data = getData();
  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant="h2" align="center" gutterBottom>
        Stream First
        <Typography variant="subtitle2">Stream First</Typography>
      </Typography>

      <div className={classes.cards}>
        {data.map(p => (
          <Card key={p.id} projInfo={p}></Card>
        ))}
      </div>
    </Fragment>
  );
}
