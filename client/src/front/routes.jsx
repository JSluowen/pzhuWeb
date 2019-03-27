import * as React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import Layout from './layout/index';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Article from './pages/article';
import Person from './pages/person';
import  Edit from './pages/article/articleIndex';



//后端临时引用

import BackHome from './back/layout'


// 前端路由鉴权
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
			<IndexRedirect to="index" />
			<Route path="index" component={Home} />
			<Route path="article" component={Article} />
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />
			<Route path="person" component={Person} onEnter={requireAuth} />
		</Route>
		<Route path="edit" component={Edit} onEnter={requireAuth} />
		<Route path="back" component={BackHome}/>
	</Router>
);
