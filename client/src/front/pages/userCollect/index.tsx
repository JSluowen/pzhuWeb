import React, { Component } from 'react';
import { Input, Tag, Select, Skeleton, message, Icon, Modal } from 'antd';
import './index.scss';
import UserAPI from '../../api/user';
import TouristAPI from '../../api/tourist';
import { Link, RouteComponentProps } from 'react-router-dom';
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;

export interface IState {
  id: string;
  limit: number;
  beg: number;
  end: number;
  loading: boolean;
  index: number;
  menu: Array<{ [key: string]: any }>;
  collect: Array<{ [key: string]: any }>;
  color: Array<string>;
  isLoading: boolean;
  isTourist: boolean;
}

export interface IProps extends RouteComponentProps {}
class UserCollect extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.userid,
      limit: 10, // 获取的数据量
      beg: 0, // 截取后台数据开始的位置
      end: 10, // 后台数据结束的位置
      loading: true,
      index: 0,
      menu: [],
      collect: [],
      color: ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'],
      isLoading: true, // 是否滚动监听
      isTourist: true, // 是否是游客访问
    };
  }

  componentDidMount() {
    if (this.state.id === '' || this.state.id === undefined) {
      this.getUserCollect();
    } else {
      this.getTouristCollect();
    }
    window.addEventListener('scroll', this.handelScroll);
  }
  getTouristCollect = () => {
    const params = {
      index: this.state.index,
      beg: this.state.beg,
      end: this.state.end,
      id: this.state.id,
    };
    TouristAPI.getTouristCollect(params).then(res => {
      const arry = this.state.collect;
      for (const item of res.data.collect) {
        arry.push(item);
      }
      if (res.success) {
        setTimeout(() => {
          this.setState({
            loading: false,
            menu: res.data.menu,
            collect: arry,
            isLoading: true,
          });
        }, 500);
      } else {
        setTimeout(() => {
          this.setState({
            loading: false,
            menu: res.data.menu,
            collect: arry,
            isLoading: false,
          });
        }, 500);
      }
    });
  };
  getUserCollect = () => {
    const params = {
      index: this.state.index,
      beg: this.state.beg,
      end: this.state.end,
    };
    UserAPI.getUserCollect(params).then(res => {
      const arry = this.state.collect;
      for (const item of res.data.collect) {
        arry.push(item);
      }
      if (res.success) {
        setTimeout(() => {
          this.setState({
            loading: false,
            menu: res.data.menu,
            collect: arry,
            isLoading: true,
            isTourist: false,
          });
        }, 500);
      } else {
        setTimeout(() => {
          this.setState({
            loading: false,
            menu: res.data.menu,
            collect: arry,
            isLoading: false,
            isTourist: false,
          });
        }, 500);
      }
    });
  };
  // 筛选资源
  handleChange = value => {
    this.setState(
      {
        index: value,
        loading: true,
        beg: 0,
        end: this.state.limit,
        collect: [],
      },
      () => {
        if (this.state.isTourist) {
          this.getTouristCollect();
        } else {
          this.getUserCollect();
        }
      },
    );
  };
  // 搜索资源
  onSearch = value => {
    if (value === '') {
      message.warning('请输入资源名称');
      return;
    }
    this.setState({
      loading: true,
    });
    const params = {
      id: this.state.id,
      value,
    };
    if (this.state.isTourist) {
      TouristAPI.searchTouristCollect(params).then(res => {
        if (!res.success) message.warning('未搜索到你想要的资源');
        setTimeout(() => {
          this.setState({
            loading: false,
            collect: res.data,
          });
        }, 500);
      });
    } else {
      UserAPI.searchUserCollect(params).then(res => {
        if (!res.success) message.warning('未搜索到你想要的资源');
        setTimeout(() => {
          this.setState({
            loading: false,
            collect: res.data,
          });
        }, 500);
      });
    }
  };
  // 监听滚动条
  handelScroll = e => {
    // 滚动的高度
    const scrollTop =
      (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
      window.pageYOffset ||
      (event.srcElement ? event.srcElement.body.scrollTop : 0);
    // 视窗高度
    const clientHeight =
      (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
    // 页面高度
    const scrollHeight =
      (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
    // 距离页面底部的高度
    const height = scrollHeight - scrollTop - clientHeight;
    if (height <= 50) {
      this.handelLoading();
    }
  };
  handelLoading = () => {
    if (this.state.isLoading) {
      this.setState({
        isLoading: false,
        beg: this.state.end,
        end: this.state.end + this.state.limit,
      });
      this.getUserCollect();
    }
  };
  handelDel = e => {
    const event = e.target;
    const id = event.getAttribute('data-id');
    const index = event.getAttribute('data-index');
    const params = {
      id,
    };
    const that = this;
    confirm({
      title: '取消收藏',
      content: '是否取消收藏该文章？',
      okText: '立即取消',
      okType: 'danger',
      cancelText: '考虑一下',
      onOk() {
        UserAPI.delUserCollect(params).then(res => {
          if (res.success) {
            message.success('取消成功');
            that.state.collect.splice(index, 1);
            that.setState({
              collect: that.state.collect,
            });
          } else {
            message.warning('取消收藏失败');
          }
        });
      },
    });
  };

  render() {
    return (
      <div className="userCollect">
        <div className="userCollect-container">
          <div className="userCollect-container-header">
            <div className="userCollect-container-header-left">
              <Select
                defaultValue="全部收藏"
                style={{ width: 120 }}
                onChange={this.handleChange}
                loading={this.state.loading}
              >
                <Option value="0">全部收藏</Option>
                {this.state.menu.map(item => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="userCollect-container-header-right">
              <Search
                placeholder="搜索文章名称"
                onSearch={value => {
                  this.onSearch(value);
                }}
                style={{ width: 200 }}
              />
            </div>
          </div>

          <div className="userCollect-container-body">
            <div className="userCollect-container-body-top">
              <p style={{ width: '50%' }}>文章名称</p>
              <p style={{ width: '20%' }}>技术标签</p>
              <p style={{ width: '20%' }}>作者姓名</p>
            </div>
            <Skeleton loading={this.state.loading} active>
              {this.state.collect.length === 0 ? (
                <p style={{ lineHeight: '50px', textAlign: 'center' }}>暂无数据</p>
              ) : (
                <div>
                  {this.state.collect.map((item, index) => {
                    return (
                      <div key={item.id}>
                        <div className="userCollect-container-body-item">
                          <div style={{ width: '50%' }}>
                            <Link
                              target="_blank"
                              style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                              to={`/articleInfo/${item.Article.id}`}
                            >
                              {item.Article.title}
                            </Link>
                          </div>
                          <div style={{ width: '20%' }}>
                            <Tag color={this.state.color[Math.floor(Math.random() * 10)]}>
                              {item.Article.Technology.name}
                            </Tag>
                          </div>
                          <div style={{ width: '20%' }}>{item.Article.UserInfo.User.name}</div>
                          {this.state.isTourist ? (
                            ''
                          ) : (
                            <div
                              onClick={this.handelDel}
                              data-id={item.id}
                              data-index={index}
                              className="userCollect-container-body-item-work"
                              style={{ flex: 1 }}
                            >
                              取消收藏
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Skeleton>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCollect;
