import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ProjectInfo } from 'src/types';
import { CardActionArea } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 300,
    minHeight: 120
  },
  actionArea: {
    paddingBottom: 20
  },
  title: {
    fontSize: 14
  }
});

interface Props {
  projInfo: ProjectInfo;
}

export default function Component(props: Props) {
  const classes = useStyles();
  const { id, name, description } = props.projInfo;
  const history = useHistory();

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.actionArea} onClick={() => history.push(`/${id}`)}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {id}
          </Typography>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
