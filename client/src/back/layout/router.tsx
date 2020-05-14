import { LinkProps, NavLinkProps, RouteProps } from 'react-router-dom';
import { User, Article, Reasource, Achievement, ArticleEdit } from 'back/pages';
/**
 * 菜单选项
 */
export interface INavLinkProps extends NavLinkProps {
  name: string;
  iconType: string;
}
export const NavLinks: INavLinkProps[] = [
  {
    name: '成员管理',
    iconType: 'user',
    to: '/back/user',
    activeClassName: 'activeClassName',
  },
  {
    name: '文章管理',
    iconType: 'read',
    to: '/back/article',
    activeClassName: 'activeClassName',
  },
  {
    name: '资源管理',
    iconType: 'share-alt',
    to: '/back/resource',
    activeClassName: 'activeClassName',
  },
  {
    name: '成果管理',
    iconType: 'book',
    to: '/back/achievement',
    activeClassName: 'activeClassName',
  },
];

/**
 * 路由导航
 */

export const Routes: RouteProps[] = [
  {
    path: '/back/user',
    exact: true,
    component: User,
  },
  {
    path: '/back/article',
    exact: true,
    component: Article,
  },
  {
    path: '/back/articleEdit/:id',
    exact: true,
    component: ArticleEdit,
  },
  {
    path: '/back/resource',
    exact: true,
    component: Reasource,
  },
  {
    path: '/back/achievement',
    exact: true,
    component: Achievement,
  },
];
