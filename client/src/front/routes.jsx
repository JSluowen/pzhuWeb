import * as React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Layout, Home, Login, Register, Article, ArticleEdit, Setting, Collect, User, Member, Achievement, Resource, UserResource, UserAchievement, UserArticle } from './pages'

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
			<Route path='member' component={Member} />
			<Route path='achievement' component={Achievement} />
			<Route path='resource' component={Resource}></Route>
			<Route path="setting" component={Setting} onEnter={requireAuth} />
			<Route path='user' component={User} onEnter={requireAuth}>
				<Route path='/user/collect' component={Collect} onEnter={requireAuth} />
				<Route path='/user/resource' component={UserResource} onEnter={requireAuth} />
				<Route path='/user/achievement' component={UserAchievement} onEnter={requireAuth} />
				<Route path='/user/article' component={UserArticle} onEnter={requireAuth} />
			</Route>
		</Route>
		<Route path='articleEdit' component={ArticleEdit} />
	</Router>
);
