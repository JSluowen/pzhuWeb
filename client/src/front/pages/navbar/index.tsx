import React, { useState, useEffect, FC, CSSProperties, useRef } from 'react';
import { Router, Route, Link, NavLink, NavLinkProps, RouteComponentProps } from 'react-router-dom';
import { Avatar, BackTop, Drawer, Modal, Button, Icon } from 'antd';
import { Base, Get } from 'src/front/api';
import { Register, Login } from 'front/pages';
import './index.scss';
import 'src/front/common/theme/theme.scss';
import { Links } from './router';

const confirm = Modal.confirm;

interface INavProps extends NavLinkProps {
  to: string;
  name: string;
}

const Navbar: FC<RouteComponentProps> = props => {
  const { history } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>('http://img.pzhuweb.cn/443625372.jpeg');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [prevRow, setPrevRow] = useState(null);
  const isHidden = useRef<boolean>(true);
  if (sessionStorage.getItem('token') !== prevRow) {
    setPrevRow(sessionStorage.getItem('token'));
    setIsLogin(!!sessionStorage.getItem('token'));
  }
  useEffect(() => {
    if (!isLogin) return;
    Get(Base.userInfo)
      .then()
      .then(res => {
        if (res.success) {
          setAvatar(res.data.avatar);
        }
      });
  }, [isLogin]);

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
  // 退出登录
  const handleExit = () => {
    confirm({
      title: '确认提示',
      content: '是否确认退出当前账号？',
      okText: '退出',
      cancelText: '取消',
      onOk() {
        setIsLogin(false);
        sessionStorage.removeItem('token');
        setTimeout(() => {
          history && history.push('/login');
        }, 500);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  // 显示菜单
  const avatarShowMenu = e => {
    const dom = e.currentTarget.lastChild;
    isHidden.current = false;
    dom.style.display = 'block';
    setTimeout(() => {
      dom.style.opacity = '1';
    }, 200);
  };
  // 隐藏菜单
  const avatarHiddenMenu = e => {
    const dom = e.currentTarget.lastChild;
    isHidden.current = true;
    setTimeout(() => {
      if (isHidden.current) {
        dom.style.opacity = '0';
        setTimeout(() => {
          dom.style.display = 'none';
        }, 200);
      }
    }, 200);
  };
  const ShowMenu = e => {
    const dom = e.currentTarget;
    isHidden.current = false;
    dom.style.opacity = '1';
    dom.style.display = 'block';
  };
  const hiddenMenu = e => {
    const dom = e.currentTarget;
    isHidden.current = true;
    setTimeout(() => {
      if (isHidden.current) {
        dom.style.opacity = '0';
        setTimeout(() => {
          dom.style.display = 'none';
        }, 200);
      }
    }, 200);
  };
  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        <div className="nav-bar-left-log" onClick={() => props.history.push('/home')}>
          <a className="app-logo"></a>
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
        {isLogin ? (
          <div
            className="nav-bar-right-userinfo"
            onMouseEnter={event => {
              avatarShowMenu(event);
            }}
            onMouseLeave={event => {
              avatarHiddenMenu(event);
            }}
          >
            <Avatar
              className="nav-bar-right-userinfo-avator"
              size={35}
              style={{
                backgroundColor: '#87d068',
              }}
              icon="user"
              src={avatar}
            />
            <div
              className="nav-bar-right-userinfo-menu"
              onMouseEnter={event => ShowMenu(event)}
              onMouseLeave={event => hiddenMenu(event)}
            >
              <div className="nav-bar-right-userinfo-menu-content">
                <ul className="nav-bar-right-userinfo-menu-content-menu">
                  {Links.map(item => (
                    <li key={item.name}>
                      <Link to={item.to}>
                        <Icon type={item.iconType} />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a onClick={handleExit}>
                      <Icon type="logout" />
                      <span>退出登录</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="nav-bar-right-user">
            <NavLink className="login" to="/login">
              登陆
            </NavLink>
            /
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
