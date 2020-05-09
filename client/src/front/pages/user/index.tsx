import React, { Component, Props } from 'react';
import { Button, Icon, message } from 'antd';
import './index.scss';
import { Base, Post } from 'src/front/api';
import { Link, RouteComponentProps, NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { Routes, TouristRouters, NavLinks } from './router';
export interface IState {
  userinfo: {
    [key: string]: string;
  };
  school: string;
  major: string;
  domain: string;
  name: string;
  id: string;
  isTourist: boolean;
}
export interface IProps extends RouteComponentProps {}

class User extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {},
      school: '',
      major: '',
      domain: '',
      name: '',
      id: props.match.params.userid,
      isTourist: true, // 默认是游客访问用户界面
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.match.params.userid !== state.id) {
      return {
        id: props.match.params.userid,
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.id !== prevState.id) {
      if (this.state.id === '' || this.state.id === undefined) {
        this.getUserInfo();
      } else {
        this.getTouirst();
      }
    }
  }
  componentDidMount() {
    if (this.state.id === '' || this.state.id === undefined) {
      this.getUserInfo();
    } else {
      this.getTouirst();
    }
  }
  // 游客访问获取信息
  getTouirst = () => {
    Post(Base.getTouristInfo, { id: this.state.id }).then(res => {
      if (res.success) {
        this.setState({
          userinfo: res.data,
          school: res.data.School.name,
          major: res.data.Major.name,
          domain: res.data.Domain.name,
          name: res.data.User.name,
        });
      } else {
        message.warning('请求的用户信息不存在!');
        this.props.history.push('/member');
      }
    });
  };
  getUserInfo = () => {
    Post(Base.getUserInfo, {}).then(res => {
      if (res.success) {
        this.setState({
          userinfo: res.data,
          school: res.data.School.name,
          major: res.data.Major.name,
          domain: res.data.Domain.name,
          name: res.data.User.name,
          isTourist: false,
        });
      } else {
        this.props.history.push('/setting');
      }
    });
  };

  render() {
    return (
      <div className="user">
        <div className="user-left">
          <div className="user-left-header">
            <div className="user-left-header-avatar">
              <div className="user-left-header-avatar-img">
                <img src={this.state.userinfo.avatar || 'http://img.pzhuweb.cn/1556260506598'} alt="" />
              </div>
            </div>
            <div className="user-left-header-info">
              <div className="user-left-header-info-name">{this.state.name}</div>
              <div className="user-left-header-info-mes">
                <Icon type="phone" />
                {this.state.userinfo.phone || '联系方式'}
              </div>
              <div className="user-left-header-info-mes">
                <Icon type="idcard" />
                {this.state.school || '学院'}
                {'/'}
                {this.state.major || '专业'}
              </div>
              <div className="user-left-header-info-mes">
                <Icon type="smile" />
                {this.state.userinfo.description || '自我描述'}
              </div>
            </div>
            <div className="user-left-header-edit">
              {this.state.isTourist ? (
                ' '
              ) : (
                <Link to="/setting">
                  <Button type="primary" ghost>
                    编辑个人资料
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="user-left-body">
            <div className="user-left-body-navbar">
              {NavLinks(this.state.isTourist, this.state.id).map(item => (
                <div className="user-left-body-navbar-item" key={item.name}>
                  <NavLink activeClassName={item.activeClassName} to={item.to}>
                    {item.name}
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="user-left-body-container">
              {this.state.isTourist ? (
                <Switch>
                  {TouristRouters.map((item, index) => (
                    <Route key={index} {...item} />
                  ))}
                  <Redirect from="/tourist/:userid" to="/tourist/:userid/article" />
                </Switch>
              ) : (
                <Switch>
                  {Routes.map((item, index) => (
                    <Route key={index} {...item} />
                  ))}
                  <Redirect from="/user" to="/user/article" />
                </Switch>
              )}
            </div>
          </div>
        </div>
        <div className="user-right">
          <div className="user-right-title">个人成就</div>
          <div className="user-right-article">
            <Icon style={{ marginRight: '10px' }} theme="twoTone" type="eye" /> 文章被阅读了
            {this.state.userinfo.readNum || '0'}次
          </div>
          <div className="user-right-ach">
            <div className="user-right-ach-item">
              <p>文章</p>
              <p>{this.state.userinfo.articleNum || 0}</p>
            </div>
            <div className="user-right-ach-item">
              <p>成果</p>
              <p>{this.state.userinfo.achievementNum}</p>
            </div>
            <div className="user-right-ach-item">
              <p>资源</p>
              <p>{this.state.userinfo.resourceNum}</p>
            </div>
          </div>
          <div className="user-right-info">
            <div className="user-right-info-item">
              <p>收藏集</p>
              <p>{this.state.userinfo.favoriteNum || '0'}</p>
            </div>
            <div className="user-right-info-item">
              <p>研究方向</p>
              <p>{this.state.domain}</p>
            </div>
            <div className="user-right-info-item">
              <p>加入时间</p>
              <p>{this.state.userinfo.created_at}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
