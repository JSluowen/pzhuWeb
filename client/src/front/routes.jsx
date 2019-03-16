import * as React from 'react';
import { Router, Route, hashHistory, IndexRedirect,IndexRoute } from 'react-router';

import Layout from './layout/index';
import Home from './pages/home/index';

import Test from './pages/testComponent/BraftTest'

import ArticleIndex from './pages/article/index'

import New from './pages/article/index';
import Login from './pages/login/index';
import Register from './pages/register/index';


export default (
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRedirect to="index" />
      <Route path="index" component={Home} />
      <Route path="article" component={New} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register}/>>
    </Route>
     <Route path="/edit" component={ArticleIndex}/>
     <Route path="/test" component={Test}/>
  </Router>
);
