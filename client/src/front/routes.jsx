import * as React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import Layout from './layout/index';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Article from './pages/article';

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
// 				path: 'article',
// 				component: Article,
// 				requiresAuth: true
// 			},
// 			{
// 				path: 'login',
// 				component: Login
// 			}
// 		]
// 	}
// ];
//  const renderRouter=(router)=> {
// 	<Switch>
// 		{router.map((item, index) => {
// 			if (item.IndexRedirect) {
// 				<IndexRedirect to={item.to} />;
// 			} else {
// 				<Route key={index} path={item.path} component={item.component}>
// 					{item.children ? renderRouter(item.children) : ''}
// 				</Route>;
// 			}
// 		})}
// 	</Switch>;
// }

//  export default <Router history={hashHistory}>{renderRouter(routers)}</Router>;

export default (
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRedirect to="index" />
			<Route path="index" component={Home} />
			<Route path="article" component={Article} />
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />>
		</Route>
	</Router>
);
