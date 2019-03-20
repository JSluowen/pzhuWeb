import * as React from 'react';
import { Router, Route, hashHistory, IndexRedirect, Redirect } from 'react-router';
import Layout from './layout/index';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Article from './pages/article';
import Person from './pages/person';


const Enter =(nextState,replace)=> {
	console.log('进入这个界面')
}

export default (
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRedirect to="index" />
			<Route path="index" component={Home} />
			<Route path="article" component={Article} />
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />
			<Route path='person' component={Person} onEnter={Enter} />
		</Route>
	</Router>
);

