import { RouteProps } from 'react-router-dom';
import { ArticleEdit, ArticleInfo } from 'front/pages';
import { Login } from 'back/pages';
import LayoutBack from 'back/layout';

export const Routes: Array<RouteProps> = [
  {
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    exact: false,
    path: '/back',
    component: LayoutBack,
  },
];
