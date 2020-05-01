import React, { useState, useEffect, ReactNode, FC, useContext, Context, CSSProperties } from 'react';
import {
  Route,
  Link,
  NavLink,
  NavLinkProps,
  RouteProps,
  LinkProps,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import { Avatar, BackTop } from 'antd';
import './index.scss';
import 'src/front/common/theme/theme.scss';
import { themeMap } from 'src/front/common/theme/theme';
import { Home, Member, Navbar, Footer, Achievement, Resource, Login } from 'front/pages';

const Layout: FC<RouteComponentProps> = ({ location }) => {
  //路由列表
  const Routes: Array<RouteProps> = [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/member',
      component: Member,
    },
    {
      path: '/achievement',
      component: Achievement,
    },
    {
      path: '/resource',
      component: Resource,
    },
    {
      path: '/login',
      component: Login,
    },
  ];
  return (
    <div className={`container ${themeMap[location.pathname] || 'light'}`}>
      {/* 回到顶部 */}
      <BackTop visibilityHeight={100} />
      <div className="header">{location.pathname !== '/home' && <Navbar />}</div>
      <div className="content">
        <Switch>
          {Routes.map((item, index) => (
            <Route key={index} {...item} />
          ))}
        </Switch>
      </div>
      <div className="footer">{location.pathname !== '/home' && <Footer />}</div>
    </div>
  );
};

export default Layout;
