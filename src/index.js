/* eslint-env browser, node */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App/App';
import Landing from './components/Landing/Landing';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import GamePage from './components/GamePage/GamePage';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/gamepage" component={GamePage} />
    </Route>
  </Router>
), document.querySelector('#root-container'));
