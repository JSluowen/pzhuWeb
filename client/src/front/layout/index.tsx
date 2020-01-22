import React, { useState, useEffect, ReactNode, FC, useContext, Context } from 'react';
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
import { context } from 'front/context';
import { Home, Member, Navbar } from 'front/pages';

const Layout: FC<RouteComponentProps> = () => {
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
  const state: IContext = useContext(context);

  return (
    <div className="container">
      {/* 回到顶部 */}
      <BackTop visibilityHeight={100} />
      {/* <Navbar/> */}
      {/* <div className="nav-bar">
        <div className="nav-bar-left">
          <a className="app-logo" href="/" target="_self"></a>
          <div className="nav-bar-menu">
            {Menus.map((item, index) => {
              return (
                <div className="nav-bar-menu-item" key={index}>
                  <NavLink to={item.to} activeClassName={item.activeClassName}>
                    {item.name}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
        <div className="nav-bar-right">
          <div className="nav-bar-right-user">
            <Avatar
              className="nav-bar-right-userinfo-avator"
              size={35}
              style={{
                backgroundColor: '#87d068',
              }}
              icon="user"
              src={state.avatar}
            />
            <div className="login">
              <Link to="login">登录</Link>
            </div>
            /
            <div className="register">
              <Link to="register">注册</Link>
            </div>
          </div>
        </div>
      </div> */}
      <div className="content">
        <Switch>
          {Routes.map((item, index) => (
            <Route key={index} {...item} />
          ))}
        </Switch>
      </div>
      <div className="pzhu-web-copyright">
        <div className="copyright">
          <div className="about-us">
            <Link to="/">关于我们</Link>
            <Link to="/register">加入我们</Link>
          </div>
          <div className="link-wrap">
            <a href="http://old.pzhuweb.cn">WEB应用专业团队官网V1.0</a>
            <a href="http://218.6.132.18/meol/jpk/course/layout/lesson/index.jsp?courseId=42728">前端在线学习</a>
            <a href="http://218.6.132.18/meol/jpk/course/layout/lesson/index.jsp?courseId=42657">后台在线学习</a>
          </div>
          <p className="web-auth">地址：攀枝花市东区机场路10号</p>
          <p className="web-auth">联系方式：lanquanxiang@gmail.com</p>
          <p className="web-auth">
            © 2017-2019 pzhuweb.cn 版权所有
            <img
              src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
              style={{
                width: '20px',
              }}
            />
            ICP认证：蜀17013737
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
