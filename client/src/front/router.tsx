import { RouteProps } from 'react-router-dom';
import { ArticleEdit, ArticleInfo } from 'front/pages';
import Layout from 'src/front/layout';

export const Routes: Array<RouteProps> = [
  {
    exact: true,
    path: '/articleEdit',
    component: ArticleEdit,
  },
  {
    exact: true,
    path: '/articleEdit/:id',
    component: ArticleEdit,
  },
  {
    exact: true,
    path: '/articleInfo/:id',
    component: ArticleInfo,
  },
  {
    exact: false,
    path: '/',
    component: Layout,
  },
];
