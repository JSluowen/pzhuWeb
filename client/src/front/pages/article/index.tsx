import React, { Component } from 'react';
import { Row, Col, Icon, Tooltip, message, Button, Divider, Carousel, Skeleton } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import './index.scss';
import { Base, Post } from 'front/api';

export interface IProps extends RouteComponentProps {}
export interface IState {
  active: boolean;
  limit: number;
  beg: number;
  end: number;
  index: number;
  article: Array<{ [key: string]: any }>;
  technology: Array<{ [key: string]: any }>;
  technologyStatus: boolean;
  slideshow: Array<{ [key: string]: any }>;
  hotArticle: Array<{ [key: string]: any }>;
  loading: boolean;
  collectTitle: string;
  loadingMore: boolean;
  isLoading: boolean;
}
export default class Article extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      limit: 5, // 获取的数据量
      beg: 0, // 截取后台数据开始的位置
      end: 5, // 后台数据结束的位置
      index: 0, // 根据标签刷选资源
      article: [], // 文章资源
      technology: [], // 技术标签
      technologyStatus: true,
      slideshow: [], // 轮播图
      hotArticle: [], // 热门文章
      loading: true,
      collectTitle: '',
      loadingMore: false, // 加载更多
      isLoading: true, // 是否继续加载
    };
  }
  componentDidMount() {
    this.getArticle();
    window.addEventListener('scroll', this.handelScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handelScroll);
  }
  // 获取文章界面信息
  getArticle = () => {
    const params = {
      beg: this.state.beg,
      end: this.state.end,
      index: this.state.index,
    };
    Post(Base.getArticle, params).then(res => {
      if (this.state.technologyStatus) {
        this.setState({
          technology: res.data.technology,
          slideshow: res.data.slideshow,
          hotArticle: res.data.hotArticle,
          technologyStatus: false,
        });
      }
      const arry = this.state.article;
      for (const item of res.data.article) {
        arry.push(item);
      }
      if (res.success) {
        setTimeout(() => {
          this.setState({
            article: arry,
            loading: false,
            isLoading: true,
            loadingMore: false,
          });
        }, 200);
      } else {
        setTimeout(() => {
          this.setState({
            article: arry,
            loading: false,
            isLoading: false,
            loadingMore: false,
          });
        }, 200);
      }
    });
  };
  // 过滤文章类别
  filterArticleType = e => {
    const index = e.target.getAttribute('data-index');
    const children = e.target.parentNode.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('articleActive');
    }
    e.target.classList.add('articleActive');
    this.setState(
      {
        beg: 0,
        end: this.state.limit,
        index,
        loading: true,
        article: [],
      },
      () => {
        this.getArticle();
      },
    );
  };
  handelLoading = () => {
    if (!this.state.loadingMore) {
      this.setState(
        {
          loadingMore: true,
          beg: this.state.end,
          end: this.state.end + this.state.limit,
        },
        () => {
          this.getArticle();
        },
      );
    }
  };
  handelScroll = () => {
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
    if (height <= 400 && this.state.isLoading) {
      this.handelLoading();
    }
  };
  // 点击收藏或取消收藏文章
  // handelCollect = e => {
  //   let event = e.target;
  //   let index;
  //   let isFavorite;
  //   if (event.tagName === 'DIV') {
  //     index = event.getAttribute('data-index');
  //     isFavorite = event.getAttribute('data-isfavorite');
  //   } else if (event.tagName === 'svg') {
  //     index = event.parentNode.parentNode.getAttribute('data-index');
  //     isFavorite = event.parentNode.parentNode.getAttribute('data-isfavorite');
  //     event = event.parentNode.parentNode;
  //   } else {
  //     index = event.parentNode.parentNode.parentNode.getAttribute('data-index');
  //     isFavorite = event.parentNode.parentNode.parentNode.getAttribute('data-isfavorite');
  //     event = event.parentNode.parentNode.parentNode;
  //   }
  //   if (isFavorite === 'true') {
  //     Post(Base.cancelCollect, { id: index }).then(res => {
  //       if (res.success) {
  //         message.success('取消收藏');
  //         event.children[0].style.color = 'gray';
  //         event.setAttribute('data-isfavorite', 'false');
  //       }
  //     });
  //   } else {
  //     Post(Base.cancelCollect, { id: index }).then(res => {
  //       if (res.success) {
  //         message.success('收藏成功');
  //         event.children[0].style.color = '#1890ff';
  //         event.setAttribute('data-isfavorite', 'true');
  //       }
  //     });
  //   }
  // };
  render() {
    return (
      <div className="article-container">
        <Row>
          <Col span={18}>
            <div className="article-left">
              {/* <div className='article-left-header'>
								<ul className='article-left-header-navbar'>
									<li>
										<a>推荐</a>
									</li>
									<li><a>前端</a></li>
									<li><a href="">后台</a></li>
									<li><a href="">新闻</a></li>
									<li><a href="">阅读</a></li>
								</ul>
							</div>
							 */}
              <div className="carousel">
                <Carousel autoplay effect="fade">
                  {this.state.slideshow.map(item => {
                    return (
                      <div className="carousel-item" key={item.id}>
                        <div
                          className="carousel-container"
                          style={{
                            backgroundImage: `url(${item.postlink})`,
                          }}
                        >
                          <div className="shadow" />
                          <div className="title">
                            <Link target="_blank" to={`/articleInfo/${item.id}`}>
                              <span>{item.title}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              {/* 文章列表 */}
              <Skeleton loading={this.state.loading} active>
                {this.state.article.length === 0 ? (
                  <div className="article-left-null">暂无数据</div>
                ) : (
                  <div style={{ width: '100%' }}>
                    {this.state.article.map(item => {
                      return (
                        <div className="article-item" key={item.id}>
                          <div className="article-cover" style={{ backgroundImage: `url(${item.postlink})` }}></div>
                          <div className="article-content">
                            <Link to={`/articleInfo/${item.id}`} target="_blank" className="article-top">
                              <div className="article-title">{item.title}</div>
                              <div className="article-summary">{item.abstract}</div>
                            </Link>

                            <div className="article-bottom">
                              <div className="read-number">阅读数 {item.readnumber}</div>
                              {/* {localStorage.getItem('token') === null || localStorage.getItem('token') === '' ? (
                                ''
                              ) : (
                                <div
                                  className="person-collect"
                                  data-index={item.id}
                                  data-isfavorite={item.isFavorite.toString()}
                                  onClick={this.handelCollect}
                                >
                                  <Icon
                                    style={item.isFavorite ? { color: '#1890ff' } : { color: 'gray' }}
                                    type="star"
                                  />
                                </div>
                              )} */}

                              <div className="autor">
                                <Link to={`/tourist/${item.userid}`} className="avatar">
                                  <img src={item.UserInfo.avatar} />
                                </Link>
                                <ul className="name">
                                  <li>{item.UserInfo.User.name}</li>
                                  <li>{item.created_at}</li>
                                  <li>{item.Technology.name}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="article-left-loadingmore">
                  {this.state.isLoading ? (
                    <Button shape="round" size="large" ghost type="primary" loading={this.state.loadingMore}>
                      加载更多
                    </Button>
                  ) : (
                    <div className="article-left-loadingmore-divider">
                      <Divider>我也是有底线的</Divider>
                    </div>
                  )}
                </div>
              </Skeleton>
            </div>
          </Col>
          <Col span={6}>
            <div className="article-right">
              {/* 文章标签 */}
              <div className="label">
                <Divider orientation="left">标签云</Divider>
                <div className="label-container">
                  <Button data-index="0" ghost className="articleActive" onClick={this.filterArticleType}>
                    推荐
                  </Button>
                  {this.state.technology.map(item => {
                    return (
                      <Button onClick={this.filterArticleType} key={item.id} data-index={item.id} ghost>
                        {item.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
              {/* 微信公众号 */}
              <div className="weixin">
                <Divider orientation="left">微信公众号</Divider>
                {this.state.article.length > 0 && (
                  <div className="weixin-img">
                    <img src="http://img.pzhuweb.cn/weixin2.jpg" alt="" />
                  </div>
                )}
              </div>
              {/* 热门文章推荐 */}
              <div className="hot">
                <Divider orientation="left">热门文章</Divider>
                <div className="article-hot">
                  {this.state.hotArticle.map(item => {
                    return (
                      <div className="article-item" key={item.id} data-index={item.id}>
                        <div className="title">
                          <Link style={{ color: 'gray' }} target="_blank" to={`/articleInfo/${item.id}`}>
                            {item.title}
                          </Link>
                        </div>
                        <div className="action">阅读数 {item.readnumber}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/** 团队微信公众号 */}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
