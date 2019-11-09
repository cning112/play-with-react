import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.scss';
import { Home } from './views/Home';
import { Project } from './views/Project';

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <h1>Header</h1>
        <div>
          <ul>
            <li>
              <Link to="/">To Home</Link>
            </li>
            <li>
              <Link to="/123">To Project 123</Link>
            </li>
          </ul>
        </div>
      </header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/:id">
          <Project />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
