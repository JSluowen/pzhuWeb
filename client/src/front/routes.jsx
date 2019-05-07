import * as React from 'react';
import {
	Layout,
	Home,
	Login,
	Register,
	Article,
	ArticleInfo,
	ArticleEdit,
	Setting,
	Collect,
	User,
	Member,
	Achievement,
	Resource,
	UserResource,
	UserAchievement,
	UserCollect,
	UserArticle,
	ResourceIssue,
	AchievementIssue,
} from './pages';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
<<<<<<< HEAD
=======
import Layout from './layout/index';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Article from './pages/article';
import Person from './pages/person';
import  Edit from './pages/article/articleIndex';





>>>>>>> 3f199b54746d5340482ec801ffbfeeb568fca84a
// 前端路由鉴权
const requireAuth = (nextState, replace, cb) => {
	if (sessionStorage.getItem('token')) {
		cb();
	} else {
		replace('/login');
		cb();
	}
};
<<<<<<< HEAD
=======

>>>>>>> 3f199b54746d5340482ec801ffbfeeb568fca84a

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
			<Route path='resource' component={Resource} />
			<Route path="setting" component={Setting} onEnter={requireAuth} />
			<Route path='resourceIssue' component={ResourceIssue} onEnter={requireAuth} />
			<Route path='/resourceIssue/:id' component={ResourceIssue} onEnter={requireAuth} />
			<Route path='achievementIssue' component={AchievementIssue} onEnter={requireAuth} />
			<Route path='/achievementIssue/:id' component={AchievementIssue} onEnter={requireAuth} />
			<Route path='articleInfo/:id' component={ArticleInfo} />
			<Route path='user' component={User} onEnter={requireAuth}>
				<IndexRedirect to="/user/article" />
				<Route path='/user/collect' component={UserCollect} onEnter={requireAuth} />
				<Route path='/user/resource' component={UserResource} onEnter={requireAuth} />
				<Route path='/user/achievement' component={UserAchievement} onEnter={requireAuth} />
				<Route path='/user/article' component={UserArticle} onEnter={requireAuth} />
			</Route>
		</Route>
<<<<<<< HEAD
		<Route path='articleEdit' component={ArticleEdit} />
=======
		<Route path="edit" component={Edit} onEnter={requireAuth} />
>>>>>>> 3f199b54746d5340482ec801ffbfeeb568fca84a
	</Router>
);
