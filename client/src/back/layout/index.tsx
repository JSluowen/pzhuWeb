import React, { Component } from 'react';
import { Link, RouteComponentProps, Switch, NavLink, Route, Redirect } from 'react-router-dom';
import { Avatar, Icon, Menu, Layout, Tooltip, message } from 'antd';
import { Footer } from 'back/pages';
import { Get, Base } from '../api';
import './index.scss';
import { NavLinks, Routes } from './router';
// const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

export interface IProps extends RouteComponentProps {}
export interface IState {
  collapsed: boolean;
  avatar: string;
  name: string;
  router: Array<string>;
}
class LayoutBack extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false, // 是否收缩导航栏
      avatar: 'http://img.pzhuweb.cn/logo.ico', // 默认头像
      name: 'admin',
      router: ['/back/user', '/back/article', '/back/resource', '/back/achievement'],
    };
  }
  componentDidMount() {
    this.getadminInfo();
  }
  getadminInfo = () => {
    Get(Base.getadminInfo).then(res => {
      if (res.success) {
        if (res.data.length !== 0) {
          this.setState({
            avatar: res.data[0].avatar,
            name: res.data[0].User.name,
          });
        }
      } else {
        message.warning('请重新登录');
        this.props.history.replace('/login');
      }
    });
  };
  // 退出登录
  logout = () => {
    sessionStorage.removeItem('token');
    this.props.history.replace('/login');
  };
  // 点击菜单跳转
  selectMenu = e => {
    const key = parseInt(e.key);
    this.props.history.push(this.state.router[key]);
  };
  render() {
    return (
      <div className="back-container">
        <div className="back-container-layout">
          <div className="back-container-layout-header">
            <div className="back-container-layout-header-logo" />
            <div className="back-container-layout-header-menu" onClick={this.logout}>
              <Tooltip title="点击退出登录" placement="bottom">
                <Avatar icon="user" size={40} src={this.state.avatar} />
                <span>{this.state.name}</span>
              </Tooltip>
            </div>
          </div>
          <div className="back-container-layout-body">
            <div className="back-container-layout-body-aside">
              <Sider collapsed={this.state.collapsed}>
                <div
                  className="back-container-layout-body-aside-collapsed"
                  onClick={() => {
                    this.setState({ collapsed: !this.state.collapsed });
                  }}
                >
                  {this.state.collapsed ? <Icon type="right" /> : <Icon type="left" />}
                </div>

                <Menu mode="inline" theme="dark">
                  {NavLinks.map((item, index) => (
                    <Menu.Item key={index}>
                      <Icon type={item.iconType} />
                      <NavLink activeClassName={item.activeClassName} to={item.to}>
                        {item.name}
                      </NavLink>
                    </Menu.Item>
                  ))}
                </Menu>
              </Sider>
            </div>
            <div className="back-container-layout-body-main">
              <div className="back-container-layout-body-main-container">
                <Switch>
                  {Routes.map((item, index) => (
                    <Route key={index} path={item.path} component={item.component} />
                  ))}
                  <Redirect from="/back" to="/back/user" />
                </Switch>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LayoutBack;
