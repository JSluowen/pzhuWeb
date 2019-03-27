import * as React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import Layout from './layout/index.jsx';
import Home from './pages/home/home';

const requireAuth = (nextState, replace, cb) => {
	if (sessionStorage.getItem('token')) {
		cb();
	} else {
		replace('/login');
		cb();
	}
};

export default (
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<Route path="home" component={Home} />
		</Route>
	</Router>
);
