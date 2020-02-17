import React, { Fragment } from 'react';
import Card from 'src/components/Card';
import { ProjectInfo } from 'src/types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useRequest } from '@umijs/hooks';
import { axios } from 'src/plugins/axios';

const useStyles = makeStyles({
  cards: {
    display: 'grid',
    gridGap: '30px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
    justifyItems: 'center'
  }
});

function getProejects(): Promise<ProjectInfo[]> {
  return axios.get('/api/v1/').then(d => d.data);
}

export default function Home() {
  return (
    <Fragment>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Stream First
        <Typography variant="subtitle2" component="h2">
          Stream First
        </Typography>
      </Typography>
      <ListOfProjects></ListOfProjects>
    </Fragment>
  );
}

function ListOfProjects(): JSX.Element {
  const classes = useStyles();
  const { data, error, loading } = useRequest(getProejects);

  if (error) {
    return <div>Failed loading projects</div>;
  }

  if (loading) {
    return <div> Loading</div>;
  }

  return (
    <div className={classes.cards}>
      {data.map(p => (
        <Card key={p.id} projInfo={p}></Card>
      ))}
    </div>
  );
}
