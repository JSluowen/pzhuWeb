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
  articleType: Array<{ [key: string]: any }>;
  article: Array<{ [key: string]: any }>;
  color: Array<string>;
  isLoading: boolean;
  isTourist: boolean;
}
export interface IProps extends RouteComponentProps {}

class UserArticle extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.userid,
      limit: 10, // 获取的数据量
      beg: 0, // 截取后台数据开始的位置
      end: 10, // 后台数据结束的位置
      loading: true,
      index: 0,
      articleType: [],
      article: [],
      color: ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'],
      isLoading: true, // 是否滚动监听
      isTourist: true, // 默认游客访问界面
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.match.params.userid !== state.id) {
      return {
        id: props.match.params.userid,
        article: [],
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.id !== prevState.id) {
      if (this.state.id === '' || this.state.id === undefined) {
        this.getUserArticle();
      } else {
        this.getTouristArticle();
      }
    }
  }

  componentDidMount() {
    if (this.state.id === '' || this.state.id === undefined) {
      this.getUserArticle();
    } else {
      this.getTouristArticle();
    }
    window.addEventListener('scroll', this.handelScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handelScroll);
  }
  getTouristArticle = () => {
    const params = {
      index: this.state.index,
      beg: this.state.beg,
      end: this.state.end,
      id: this.state.id,
    };
    Post(Base.getTouristArticle, params).then(res => {
      const arry = this.state.article;
      for (const item of res.data.article) {
        arry.push(item);
      }
      if (res.success) {
        setTimeout(() => {
          this.setState({
            loading: false,
            articleType: res.data.articleType,
            article: arry,
            isLoading: true,
          });
        }, 500);
      } else {
        setTimeout(() => {
          this.setState({
            loading: false,
            articleType: res.data.articleType,
            article: arry,
            isLoading: false,
          });
        }, 500);
      }
    });
  };

  getUserArticle = () => {
    const params = {
      index: this.state.index,
      beg: this.state.beg,
      end: this.state.end,
    };
    Post(Base.getUserArticle, params).then(res => {
      const arry = this.state.article;
      for (const item of res.data.article) {
        arry.push(item);
      }
      if (res.success) {
        setTimeout(() => {
          this.setState({
            loading: false,
            articleType: res.data.articleType,
            article: arry,
            isLoading: true,
            isTourist: false,
          });
        }, 500);
      } else {
        setTimeout(() => {
          this.setState({
            loading: false,
            articleType: res.data.articleType,
            article: arry,
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
      message.warning('请输入资源名称');
      return;
    }
    this.setState({
      loading: true,
    });
    const params = {
      value,
      id: this.state.id,
    };
    const url = this.state.isTourist ? Base.searchTouristArticle : Base.searchUserArticle;
    Post(url, params).then(res => {
      if (!res.success) message.warning('为搜索到您想要的资源');
      setTimeout(() => {
        this.setState({
          loading: false,
          article: res.data,
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
        article: [],
      },
      () => {
        if (this.state.isTourist) {
          this.getTouristArticle();
        } else {
          this.getUserArticle();
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
        this.getTouristArticle();
      } else {
        this.getUserArticle();
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
        Post(Base.delUserArticle, params).then(res => {
          if (res.success) {
            message.success('删除成功');
            that.state.article.splice(index, 1);
            that.setState({
              article: that.state.article,
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
      <div className="userArticle">
        <div className="userArticle-container">
          <div className="userArticle-container-header">
            <div className="userArticle-container-header-left">
              <Select
                defaultValue="全部资源"
                style={{ width: 120 }}
                onChange={this.handleChange}
                loading={this.state.loading}
              >
                <Option value="0">全部资源</Option>
                {this.state.articleType.map(item => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="userArticle-container-header-right">
              <Search
                placeholder="搜索文章名称"
                onSearch={value => {
                  this.onSearch(value);
                }}
                style={{ width: 200 }}
              />
            </div>
          </div>

          <div className="userArticle-container-body">
            <div className="userArticle-container-body-top">
              <p style={{ width: '50%' }}>文章名称</p>
              <p style={{ width: '20%' }}>技术标签</p>
              <p style={{ width: '20%' }}>发布时间</p>
            </div>
            <Skeleton loading={this.state.loading} active>
              {this.state.article.length === 0 ? (
                <p style={{ lineHeight: '50px', textAlign: 'center' }}>暂无数据</p>
              ) : (
                <div>
                  {this.state.article.map((item, index) => {
                    return (
                      <div key={item.id}>
                        <div className="userArticle-container-body-item">
                          <div style={{ width: '50%' }}>
                            <Link
                              target="_blank"
                              style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                              to={`/articleInfo/${item.id}`}
                            >
                              {item.title}
                            </Link>
                          </div>
                          <div style={{ width: '20%' }}>
                            <Tag color={this.state.color[Math.floor(Math.random() * 10)]}>{item.Technology.name}</Tag>
                          </div>
                          <div style={{ width: '20%' }}>{item.created_at}</div>
                          {this.state.isTourist ? (
                            ''
                          ) : (
                            <div className="userArticle-container-body-item-work" style={{ flex: 1 }}>
                              <Link style={{ color: 'rgba(0, 0, 0, 0.65)' }} to={`/articleEdit/${item.id}`}>
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

export default UserArticle;
