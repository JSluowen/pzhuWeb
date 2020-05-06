import React, { FC } from 'react';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import { Avatar, BackTop } from 'antd';
import './index.scss';
import 'src/front/common/theme/theme.scss';
import { themeMap } from 'src/front/common/theme/theme';
import { Routes } from './router';
import Navbar from '../pages/navbar';
import Footer from '../pages/footer';

const Layout: FC<RouteComponentProps> = ({ location }) => {
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
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
      <div className="footer">{location.pathname !== '/home' && <Footer />}</div>
    </div>
  );
};

export default Layout;
