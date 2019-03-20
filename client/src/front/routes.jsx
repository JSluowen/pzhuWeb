import * as React from 'react';
import { Router, Route, hashHistory, IndexRedirect, Redirect } from 'react-router';
import Layout from './layout/index';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Article from './pages/article';
import Person from './pages/person';

// const PrivateRouter = () => {
// 	console.log(component)
// 	// <Route
// 	// 	{...rest}
// 	// 	render={(props) => {
// 	// 		console.log(props.localtion);
// 	// 		sessionStorage.getItem('token') ? (
// 	// 			<Component {...props} />
// 	// 		) : (
// 	// 			<Redirect to={{ path: 'login', state: { from: props.localtion } }} />
// 	// 		);
// 	// 	}}
// 	// />;
// };

export default (
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRedirect to="index" />
			<Route path="index" component={Home} />
			<Route path="article" component={Article} />
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />
			<Route path='person' component={Person} />
		</Route>
	</Router>
);
