import { RouteProps, NavLinkProps } from 'react-router-dom';
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

export interface INavLink extends NavLinkProps {
  name: string;
}

export interface IMenu {
  name: string;
  path: string;
}

const menu: IMenu[] = [
  {
    name: '文章',
    path: 'article',
  },
  {
    name: '成果',
    path: 'achievement',
  },
  {
    name: '资源',
    path: 'resource',
  },
  {
    name: '收藏',
    path: 'collect',
  },
];

export function NavLinks(isTourist: boolean, id?: string): INavLink[] {
  return menu.map(item => {
    return {
      activeClassName: 'userActive',
      to: isTourist ? `/tourist/${id}/${item.path}` : `/user/${item.path}`,
      name: item.name,
    };
  });
}
