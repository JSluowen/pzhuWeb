import React, { useState, useEffect, FC, CSSProperties } from 'react';
import { Router, Route, Link, NavLink, NavLinkProps } from 'react-router-dom';
import { Avatar, BackTop, Drawer } from 'antd';
import { Register } from 'front/pages';
import './index.scss';

export interface INavProps extends NavLinkProps {
  to: string;
  name: string;
}
const Navbar: FC<CSSProperties> = styles => {
  const [visible, setVisible] = useState<boolean>(false);
  // 菜单列表
  const Menus: Array<INavProps> = [
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
  ];
  const onVisible = val => {
    setVisible(val);
  };
  return (
    <div className="nav-bar" style={styles}>
      <div className="nav-bar-left">
        <div className="nav-bar-left-log">
          <a className="app-logo" href="/" target="_self"></a>
        </div>
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
          <div className="login">登录</div>/
          <div
            className="register"
            onClick={() => {
              setVisible(true);
            }}
          >
            注册
          </div>
          <Drawer
            title="注册界面"
            width={520}
            closable={false}
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}
          >
            <Register onVisible={onVisible} />
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
