import { RouteProps } from 'react-router-dom';
import { UserCollect, UserResource, UserAchievement, UserArticle } from 'front/pages';

export const Routes: Array<RouteProps> = [
  {
    exact: false,
    path: '/user/article',
    component: UserArticle,
  },
  {
    exact: false,
    path: '/user/achievement',
    component: UserAchievement,
  },
  {
    exact: false,
    path: '/user/resource',
    component: UserResource,
  },
  {
    exact: false,
    path: '/user/collect',
    component: UserCollect,
  },
];

export const TouristRouters: Array<RouteProps> = [
  {
    exact: true,
    path: '/tourist/:userid/article',
    component: UserArticle,
  },
  {
    exact: false,
    path: '/tourist/:userid/achievement',
    component: UserAchievement,
  },
  {
    exact: false,
    path: '/tourist/:userid/resource',
    component: UserResource,
  },
  {
    exact: false,
    path: '/tourist/:userid/collect',
    component: UserCollect,
  },
];
