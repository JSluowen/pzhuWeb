import React, { FC, useEffect, useState } from 'react';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import { Avatar, BackTop } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import 'src/front/common/theme/theme.scss';
import { themeMap } from 'src/front/common/theme/theme';
import { Routes } from './router';
import Navbar from '../pages/navbar';
import Footer from '../pages/footer';
import { Base, Post } from 'src/front/api';

const Layout = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    if (user.name) return;
    Post(Base.getUserInfo, {}).then(res => {
      dispatch({ type: 'initUser', payload: { name: res.data?.User?.name, auth: res.data?.User?.status } });
    });
  }, [props.history?.location?.pathname]);
  return (
    <div className={`container ${themeMap[props.location.pathname] || 'light'}`}>
      {/* 回到顶部 */}
      <BackTop visibilityHeight={100} />
      <div className="header">{props.location.pathname !== '/home' && <Navbar {...props} />}</div>
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
