import { LinkProps } from 'react-router-dom';
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
