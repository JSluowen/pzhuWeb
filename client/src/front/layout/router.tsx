import { RouteProps } from 'react-router-dom';
import { Home, Member, Achievement, Resource, Login, User, Setting, ArticleEdit } from 'front/pages';

export const Routes: Array<RouteProps> = [
  {
    exact: true,
    path: '/home',
    component: Home,
  },
  {
    exact: true,
    path: '/member',
    component: Member,
  },
  {
    exact: true,
    path: '/achievement',
    component: Achievement,
  },
  {
    exact: true,
    path: '/resource',
    component: Resource,
  },
  { exact: true, path: '/login', component: Login },
  {
    exact: false,
    path: '/user',
    component: User,
  },
  {
    exact: false,
    path: '/tourist/:userid',
    component: User,
  },
  {
    exact: true,
    path: '/setting',
    component: Setting,
  },
];
