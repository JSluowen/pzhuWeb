import * as React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import Layout from './layout/index.jsx';
import { User, Login, Article, Reasource, Achievement, articleEdit } from './pages';
const requireAuth = (nextState, replace, cb) => {
  if (sessionStorage.getItem('token')) {
    cb();
  } else {
    replace('/');
    cb();
  }
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRedirect to="login" />
      <Route path="login" component={Login} />
    </Route>
    <Route path="/back" component={Layout} onEnter={requireAuth}>
      <IndexRedirect to="user" />
      <Route path="user" component={User} />
      <Route path="article" component={Article} />
      <Route path="resource" component={Reasource} />
      <Route path="achievement" component={Achievement} />
      <Route path="articleEdit/:id" component={articleEdit} />
    </Route>
  </Router>
);
