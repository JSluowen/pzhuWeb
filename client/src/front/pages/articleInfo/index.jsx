import React, { Component } from 'react';
import { Button, Avatar, message, Skeleton } from 'antd';
import 'braft-editor/dist/output.css';
import './index.scss';
import { Link } from 'react-router';
import articleInfoAPI from '../../api/articleInfo';

class ArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      article: {
        Menu: {},
        Technology: {},
        UserInfo: {
          User: {},
        },
      },
      recommend: [],
      loading: true,
      keywords: [],
    };
  }
  componentDidMount() {
    window.scroll(0, 0);
    this.setState(
      {
        id: this.props.params.id,
      },
      () => {
        this.getArticleInfo();
      },
    );
  }

  getArticleInfo = () => {
    const params = {
      id: this.state.id,
    };
    articleInfoAPI.getArticleInfo(params).then(res => {
      if (res.success) {
        setTimeout(() => {
          this.setState({
            article: res.data.article[0],
            recommend: res.data.recommend,
            keywords: res.data.article[0].keywords.split(','),
            loading: false,
          });
        }, 500);
      } else {
        message.warning('请求的资源不存在');
        this.props.router.push('/article');
      }
    });
  };
  render() {
    return (
      <div className="articleInfo">
        <Skeleton loading={this.state.loading} active>
          <div className="articleInfo-header">
            <div className="articleInfo-header-info">
              <div className="articleInfo-header-info-label">
                <Button ghost>{this.state.article.Menu.name}</Button>
                <Button ghost>{this.state.article.Technology.name}</Button>
                {this.state.keywords.map((item, index) => {
                  return (
                    <Button ghost key={index}>
                      {item}
                    </Button>
                  );
                })}
              </div>
              <div className="articleInfo-header-info-title">{this.state.article.title}</div>
              <div className="articleInfo-header-info-user">
                <Avatar style={{ marginRight: '5px' }} size="large" src={this.state.article.UserInfo.avatar} />
                <p>{this.state.article.UserInfo.User.name}</p>
                <p>{this.state.article.created_at}</p>
              </div>
            </div>
            <div className="articleInfo-header-shadow"></div>
            <div
              className="articleInfo-header-bgImg"
              style={{ backgroundImage: `url(${this.state.article.postlink})` }}
            ></div>
          </div>
          <div className="articleInfo-body">
            <div
              className="articleInfo-body-content braft-output-content"
              dangerouslySetInnerHTML={{ __html: this.state.article.context }}
            ></div>
            <div className="articleInfo-body-recommend">
              <p>推荐阅读</p>
              <div className="articleInfo-body-recommend-body">
                {this.state.recommend.map(item => {
                  return (
                    <div key={item.id} className="articleInfo-body-recommend-body-item">
                      <Link
                        to={`/articleInfo/${item.id}`}
                        target="_blank"
                        style={{ backgroundImage: `url(${item.postlink})` }}
                      >
                        <span>{item.title}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    );
  }
}

export default ArticleInfo;
