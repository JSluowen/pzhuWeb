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
// 前端路由鉴权
const requireAuth = (nextState, replace, cb) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  if (sessionStorage.getItem('token')) {
    cb();
  } else {
    replace('/login');
    cb();
  }
};
const scrollTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
export default (
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRedirect to="index" />
      <Route path="index" component={Home} onEnter={scrollTop} />
      <Route path="article" component={Article} onEnter={scrollTop} />
      <Route path="login" component={Login} onEnter={scrollTop} />
      <Route path="register" component={Register} onEnter={scrollTop} />
      <Route path="member" component={Member} onEnter={scrollTop} />
      <Route path="achievement" component={Achievement} onEnter={scrollTop} />
      <Route path="resource" component={Resource} onEnter={scrollTop} />
      <Route path="setting" component={Setting} onEnter={requireAuth} />
      <Route path="resourceIssue" component={ResourceIssue} onEnter={requireAuth} />
      <Route path="/resourceIssue/:id" component={ResourceIssue} onEnter={requireAuth} />
      <Route path="achievementIssue" component={AchievementIssue} onEnter={requireAuth} />
      <Route path="/achievementIssue/:id" component={AchievementIssue} onEnter={requireAuth} />
      <Route path="articleInfo/:id" component={ArticleInfo} onEnter={scrollTop} />

      <Route path="user" component={User} onEnter={requireAuth}>
        <IndexRedirect to="/user/article" />
        <Route path="/user/collect" component={UserCollect} onEnter={requireAuth} />
        <Route path="/user/resource" component={UserResource} onEnter={requireAuth} />
        <Route path="/user/achievement" component={UserAchievement} onEnter={requireAuth} />
        <Route path="/user/article" component={UserArticle} onEnter={requireAuth} />
      </Route>
      <Route path="/tourist/:userid" component={User} onEnter={scrollTop}>
        <IndexRedirect to="/tourist/:userid/article" />
        <Route path="/tourist/:userid/collect" component={UserCollect} onEnter={scrollTop} />
        <Route path="/tourist/:userid/resource" component={UserResource} onEnter={scrollTop} />
        <Route path="/tourist/:userid/achievement" component={UserAchievement} onEnter={scrollTop} />
        <Route path="/tourist/:userid/article" component={UserArticle} onEnter={scrollTop} />
      </Route>
    </Route>
    <Route path="articleEdit" component={ArticleEdit} onEnter={scrollTop} />
    <Route path="articleEdit/:id" component={ArticleEdit} onEnter={scrollTop} />
  </Router>
);
