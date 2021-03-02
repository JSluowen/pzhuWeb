import { RouteProps } from 'react-router-dom';
import {
  Home,
  Member,
  Achievement,
  Resource,
  Login,
  User,
  Setting,
  ResourceIssue,
  AchievementIssue,
  Article,
  Album,
} from 'front/pages';

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
  {
    exact: true,
    path: '/resourceIssue',
    component: ResourceIssue,
  },
  {
    exact: true,
    path: '/resourceIssue/:id',
    component: ResourceIssue,
  },
  {
    exact: true,
    path: '/achievementIssue',
    component: AchievementIssue,
  },
  {
    exact: true,
    path: '/achievementIssue/:id',
    component: AchievementIssue,
  },
  {
    exact: true,
    path: '/article',
    component: Article,
  },
  {
    exact: true,
    path: '/album',
    component: Album,
  },
];
