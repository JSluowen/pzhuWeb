import { LinkProps, NavLinkProps } from 'react-router-dom';

/**
 * 个人主页-菜单选项
 */
export interface ILinkProps extends LinkProps {
  name: string;
  iconType: string;
}
export const Links: ILinkProps[] = [
  {
    name: '个人主页',
    iconType: 'user',
    to: '/user',
  },
  {
    name: '文章发布',
    iconType: 'project',
    to: '/articleEdit',
  },
  {
    name: '资源发布',
    iconType: 'share-alt',
    to: '/resourceIssue',
  },
  {
    name: '成果发布',
    iconType: 'book',
    to: '/achievementIssue',
  },
];

/**
 * 导航栏-菜单选项
 */
interface INavProps extends NavLinkProps {
  to: string;
  name: string;
}
export const Menus: Array<INavProps> = [
  {
    to: '/article',
    activeClassName: 'active',
    name: '团队动态',
  },
  {
    to: '/resource',
    activeClassName: 'active',
    name: '资源分享',
  },
  {
    to: '/achievement',
    activeClassName: 'active',
    name: '成果分享',
  },
  {
    to: '/member',
    activeClassName: 'active',
    name: '成员展示',
  },
  {
    to: '/album',
    activeClassName: 'active',
    name: '团队风采',
  },
];
