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
import { Home, Member, Navbar, Footer } from 'front/pages';

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
  ];
  const navStyles: CSSProperties = {
    backgroundColor: location.pathname !== '/home' ? '#fff' : 'transparent',
  };
  const LayStyle: CSSProperties = {
    marginTop: location.pathname !== '/home' ? '60px' : '0',
  };
  return (
    <div className="container" style={LayStyle}>
      {/* 回到顶部 */}
      <BackTop visibilityHeight={100} />
      {location.pathname !== '/home' && <Navbar {...navStyles} />}
      <div className="content">
        <Switch>
          {Routes.map((item, index) => (
            <Route exact key={index} {...item} />
          ))}
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
