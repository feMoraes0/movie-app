import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Front from './pages/front';
import Detail from './pages/detail';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/' exact>
          <Front />
        </Route>
        <Route path='/details'>
          <Detail />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
