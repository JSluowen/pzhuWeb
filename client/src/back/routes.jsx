import * as React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import Layout from './layout/index.jsx';

import MenberApplay from './pages/menber/applay';

import MenberList from './pages/menber/menberList';
import Info from './pages/menber/info';


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
			<Route path ="apply" component={MenberApplay} />
			<Route path ="MenberList" component={MenberList} />
			<Route path ="info" component={Info} />
		</Route>
	</Router>
);
