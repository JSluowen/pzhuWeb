import * as React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import Layout from './layout/index';
import Home from './pages/home/index';
import New from './pages/article/index';
import Login from './pages/login/index';
import Register from './pages/register/index';

// const PrivateRoute=({component:Component,...rest})=>{

// }

// const routers = [
// 	{
// 		path: '/',
// 		component: Layout,
// 		children: [
// 			{
// 				indexRedirect: true,
// 				to: 'index',
// 				component: Layout
// 			},
// 			{
//         path:''
//       }
// 		]
// 	}
// ];

export default (
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRedirect to="index" />
			<Route path="index" component={Home} />
			<Route path="article" component={New} />
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />>
		</Route>
	</Router>
);
