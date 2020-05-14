import React, { Component } from 'react';
import { Input, Tag, Select, Skeleton, message, Icon, Modal } from 'antd';
import './index.scss';
import { Base, Post } from 'src/front/api';
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
  acType: Array<{ [key: string]: any }>;
  ac: Array<{ [key: string]: any }>;
  searchValue: string;
  color: Array<string>;
  isLoading: boolean;
  isTourist: boolean;
}
export interface IProps extends RouteComponentProps {}
class UserAchievement extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.userid,
      limit: 10, // 获取的数据量
      beg: 0, // 截取后台数据开始的位置
      end: 10, // 后台数据结束的位置
      loading: true,
      index: 0,
      acType: [],
      ac: [],
      searchValue: '',
      color: ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'],
      isLoading: true, // 是否滚动监听
      isTourist: true, // 是否游客访问
    };
  }
  componentDidMount() {
    if (this.state.id === '' || this.state.id === undefined) {
      this.getUserAchievement();
    } else {
      this.getTouristAchievement();
    }
    window.addEventListener('scroll', this.handelScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handelScroll);
  }
  getTouristAchievement = () => {
    const params = {
      index: this.state.index,
      value: this.state.searchValue,
      beg: this.state.beg,
      end: this.state.end,
      id: this.state.id,
    };
    Post(Base.getTouristAchievement, params).then(res => {
      const arry = this.state.ac;
      for (const item of res.data.ac) {
        arry.push(item);
      }
      if (res.success) {
        setTimeout(() => {
          this.setState({
            loading: false,
            acType: res.data.acType,
            ac: arry,
            isLoading: true,
          });
        }, 500);
      } else {
        setTimeout(() => {
          this.setState({
            loading: false,
            acType: res.data.acType,
            ac: arry,
            isLoading: false,
          });
        }, 500);
      }
    });
  };
  getUserAchievement = () => {
    const params = {
      index: this.state.index,
      value: this.state.searchValue,
      beg: this.state.beg,
      end: this.state.end,
    };
    Post(Base.getUserAchievement, params).then(res => {
      const arry = this.state.ac;
      for (const item of res.data.ac) {
        arry.push(item);
      }
      if (res.success) {
        setTimeout(() => {
          this.setState({
            loading: false,
            acType: res.data.acType,
            ac: arry,
            isLoading: true,
            isTourist: false,
          });
        }, 500);
      } else {
        setTimeout(() => {
          this.setState({
            loading: false,
            acType: res.data.acType,
            ac: arry,
            isLoading: false,
            isTourist: false,
          });
        }, 500);
      }
    });
  };
  // 搜索资源
  onSearch = value => {
    if (value === '') {
      message.warning('请输入成果名称');
      return;
    }
    this.setState({
      loading: true,
    });
    const params = {
      value,
      id: this.state.id,
    };
    const url = this.state.isTourist ? Base.searchTouristAchievement : Base.searchUserAchievement;
    Post(url, params).then(res => {
      if (!res.success) message.warning('未搜索到你想要的资源');
      setTimeout(() => {
        this.setState({
          loading: false,
          ac: res.data,
        });
      }, 500);
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
        ac: [],
        id: this.state.id,
      },
      () => {
        if (this.state.isTourist) {
          this.getTouristAchievement();
        } else {
          this.getUserAchievement();
        }
      },
    );
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
      if (this.state.isTourist) {
        this.getTouristAchievement();
      } else {
        this.getUserAchievement();
      }
    }
  };
  handelDel = e => {
    let event;
    if (e.target.tagName === 'svg') {
      event = e.target.parentNode.parentNode;
    } else if (e.target.tagName === 'path') {
      event = e.target.parentNode.parentNode.parentNode;
    } else {
      event = e.target;
    }
    const id = event.getAttribute('data-id');
    const index = event.getAttribute('data-index');
    const params = {
      id,
    };
    const that = this;
    confirm({
      title: '删除警告',
      content: '是否删除资源？',
      okText: '立即删除',
      okType: 'danger',
      cancelText: '考虑一下',
      onOk() {
        Post(Base.delUserAchievement, params).then(res => {
          if (res.success) {
            message.success('删除成功');
            that.state.ac.splice(index, 1);
            that.setState({
              ac: that.state.ac,
            });
          } else {
            message.warning('删除失败');
          }
        });
      },
    });
  };
  render() {
    return (
      <div className="userAchievement">
        <div className="userAchievement-container">
          <div className="userAchievement-container-header">
            <div className="userAchievement-container-header-left">
              <Select
                defaultValue="全部资源"
                style={{ width: 120 }}
                onChange={this.handleChange}
                loading={this.state.loading}
              >
                <Option value="0">全部资源</Option>
                {this.state.acType.map(item => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="userAchievement-container-header-right">
              <Search
                placeholder="搜索成果名称"
                onSearch={value => {
                  this.onSearch(value);
                }}
                style={{ width: 200 }}
              />
            </div>
          </div>

          <div className="userAchievement-container-body">
            <div className="userAchievement-container-body-top">
              <p style={{ width: '50%' }}>成果名称</p>
              <p style={{ width: '20%' }}>成果类别</p>
              <p style={{ width: '20%' }}>发布时间</p>
            </div>
            <Skeleton loading={this.state.loading} active>
              {this.state.ac.length === 0 ? (
                <p style={{ lineHeight: '50px', textAlign: 'center' }}>暂无数据</p>
              ) : (
                <div>
                  {this.state.ac.map((item, index) => {
                    return (
                      <div key={item.id}>
                        <div className="userAchievement-container-body-item">
                          <div style={{ width: '50%' }}>
                            <a href={item.achievementlink || item.attachment} target="_blank">
                              {item.title}
                            </a>
                          </div>
                          <div style={{ width: '20%' }}>
                            <Tag color={this.state.color[Math.floor(Math.random() * 10)]}>
                              {item.AchievementType.name}
                            </Tag>
                          </div>
                          <div style={{ width: '20%' }}>{item.created_at}</div>
                          {this.state.isTourist ? (
                            ''
                          ) : (
                            <div className="userAchievement-container-body-item-work" style={{ flex: 1 }}>
                              <Link style={{ color: 'rgba(0, 0, 0, 0.65)' }} to={`/achievementIssue/${item.id}`}>
                                <Icon type="edit" />
                              </Link>
                              <p data-id={item.id} data-index={index} onClick={this.handelDel}>
                                <Icon type="delete" />
                              </p>
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

export default UserAchievement;
