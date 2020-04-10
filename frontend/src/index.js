import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Front from './pages/front';
import Detail from './pages/detail';
import Search from './pages/search';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/' exact>
          <Front />
        </Route>
        <Route path='/details/:movie_id'>
          <Detail />
        </Route>
        <Route path='/search' component={Search} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
