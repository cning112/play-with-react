import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';

import Home from './views/Home';
import Project from './views/Project';
import Header from './components/Header';
import Footer from './components/Footer';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'grid',
    gridGap: '20px',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: '"header" "content" "footer"'
  },
  header: {
    gridArea: 'header'
  },
  content: {
    gridArea: 'content'
  },
  footer: {
    gridArea: 'footer'
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Router>
      <Container>
        <div className={classes.root}>
          <div className={classes.header}>
            <Header></Header>
          </div>

          <div className={classes.content}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/:id">
                <Project />
              </Route>
            </Switch>
          </div>

          <div className={classes.footer}>
            <Footer></Footer>
          </div>
        </div>
      </Container>
    </Router>
  );
};

export default App;
