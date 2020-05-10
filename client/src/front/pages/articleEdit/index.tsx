import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Input, Icon, Avatar, Button, Spin, message, Form, DatePicker } from 'antd';
import Cookies from '../../../http/cookies';
import ArticleEditAPI from '../../api/articleEdit';
// 引入七牛云
import * as qiniu from 'qiniu-js';
import qiniuAPI from '../../api/qiniu';
// 引入编辑器组件
import BraftEditor, { ControlType, BuiltInControlType } from 'braft-editor';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
// 代码高亮显示
import 'braft-extensions/dist/code-highlighter.css';
import './index.scss';
// 引入MakeDown语法
import Markdown from 'braft-extensions/dist/markdown';
import moment from 'moment';
import { FormComponentProps } from 'antd/lib/form';
const dateFormat = 'YYYY-MM-DD';
const options = {
  includeEditors: ['editor-with-code-highlighter'],
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript',
    },
    {
      name: 'HTML',
      syntax: 'html',
    },
    {
      name: 'CSS',
      syntax: 'css',
    },
    {
      name: 'Java',
      syntax: 'java',
    },
    {
      name: 'PHP',
      syntax: 'php',
    },
  ],
};
BraftEditor.use(CodeHighlighter(options));
BraftEditor.use(Markdown(options));

export interface IState {
  id: number | null;
  status: number;
  coverStatus: boolean;
  issueStatus: boolean;
  editorState: () => void;
  coverLoading: boolean;
  menu: Array<{ [key: string]: any }>;
  technology: Array<{ [key: string]: any }>;
  article: { [key: string]: any };
  delCoverStatus: boolean;
  mediaItems: any[];
  selectType: string;
  selectTechnology: string;
  title: string;
  keywords: string;
  date: Date;
  postlink: string;
  context: string;
  raw: string | any;
  avatar: string;
  articleLoding: boolean;
}
export interface IProps extends FormComponentProps, RouteComponentProps {}

class ArticleEdit extends Component<IProps, IState> {
  selectType: React.RefObject<any>;
  selectTechnology: React.RefObject<any>;
  delImg: Function;
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id || null, // 文章的Id
      status: 1, // 默认1数据添加状态，2数据更新状态,
      coverStatus: false,
      issueStatus: false,
      editorState: BraftEditor.createEditorState(null),
      coverLoading: false, // 上传状态
      menu: [], // 分类
      technology: [], // 技术标签
      article: null, // 文章资源
      delCoverStatus: false, // 删除显示
      mediaItems: [], // 获取媒体库初始化内容
      selectType: null, // 文章类别
      selectTechnology: null, // 技术标签
      title: null, // 文章标题
      keywords: null, // 文章关键字
      date: new Date(), // 文章发布日期
      postlink: null, // 封面图链接
      context: null, // 文章给你内容
      raw: null, // 用户编辑的文章内容格式
      avatar: null, // 用户头像
      articleLoding: false, // 发布文章
    };
    this.selectType = React.createRef();
    this.selectTechnology = React.createRef();
  }

  componentDidMount() {
    this.getArticleEdit();
  }
  // 获取初始化媒体库的信息
  getMediaItems = () => {
    ArticleEditAPI.getMediaItems().then(res => {
      if (res.success) {
        const mediaItems = res.data.map(item => {
          const arry = item.key.split('.');
          const type = arry[arry.length - 1];
          if (type === 'mp4') {
            return {
              id: item.id,
              type: 'VIDEO',
              url: item.link,
              loop: false, // 指定音视频是否循环播放
              autoPlay: true, // 指定音视频是否自动播放
              controls: true, // 指定音视频是否显示控制栏
            };
          } else if (type === 'mp3') {
            return {
              id: item.id,
              type: 'AUDIO',
              url: item.link,
              loop: false, // 指定音视频是否循环播放
              autoPlay: true, // 指定音视频是否自动播放
              controls: true, // 指定音视频是否显示控制栏
            };
          }
          return {
            id: item.id,
            type: 'IMAGE',
            url: item.link,
          };
        });
        this.setState({
          mediaItems,
        });
      }
    });
  };
  // 删除媒体的资源
  removeMedia = files => {
    const params = {
      data: files,
    };
    ArticleEditAPI.removeMedia(params);
  };
  getArticleEdit = () => {
    const params = {
      id: this.state.id,
    };
    ArticleEditAPI.getArticleEdit(params)
      .then(res => {
        if (res.success) {
          this.setState({
            menu: res.data.menu,
            technology: res.data.technology,
            id: res.data.article.id,
            status: res.data.article.status,
            avatar: res.data.userinfo[0].avatar,
          });
        } else {
          this.setState(
            {
              menu: res.data.menu,
              technology: res.data.technology,
              article: res.data.article[0],
              id: res.data.article[0].id,
              postlink: res.data.article[0].postlink,
              status: 2,
              avatar: res.data.userinfo[0].avatar,
              date: res.data.article[0].created_at || new Date(),
            },
            () => {
              this.initArticle();
            },
          );
        }
      })
      .catch(err => {
        this.props.history.push('/setting');
      });
  };
  // 初始化文章资源
  initArticle = () => {
    const article = this.state.article;
    const { title, raw, keywords, technologyid, menuid } = article;
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ title });
    this.setState({
      editorState: BraftEditor.createEditorState(raw),
      keywords,
      selectType: menuid,
      selectTechnology: technologyid,
      title,
    });
    const selectType = this.selectType.current.children;
    for (const item of selectType) {
      if (parseInt(item.getAttribute('index')) === menuid) {
        item.classList.add('tagActive');
      }
    }
    const selectTechnology = this.selectTechnology.current.children;
    for (const item of selectTechnology) {
      if (parseInt(item.getAttribute('index')) === technologyid) {
        item.classList.add('tagActive');
      }
    }
  };
  handShowCover = () => {
    if (this.state.issueStatus === true) {
      this.setState({
        issueStatus: false,
      });
    }
    this.setState({
      coverStatus: !this.state.coverStatus,
    });
  };
  handShowIssue = () => {
    if (this.state.coverStatus === true) {
      this.setState({
        coverStatus: false,
      });
    }
    this.setState({
      issueStatus: !this.state.issueStatus,
    });
  };
  // 上传图片到七牛云
  uploadCover = e => {
    const file = e.target.files;
    const { size, type, name } = file[0];
    if (type !== 'image/jpeg' && type !== 'image/png') {
      message.warning('请上传类型为 png 或 jpg 的图片 ');
      return;
    }
    if (size > 1024 * 1024) {
      message.warning('请上传小于1M的图片');
      return;
    }
    const arry = name.split('.');
    const postfix = arry[arry.length - 1];
    const that = this;
    this.setState({
      coverLoading: true,
    });

    qiniuAPI.getToken().then(res => {
      const token = res.data;
      // let key = "test" + Date.now() + `.${postfix}`;
      const key = Cookies.getCookies('id') + Date.now() + `.${postfix}`;
      const config = {
        useCdnDomain: true, // 是否使用 cdn 加速域名
        region: qiniu.region.z2, // 选择上传域名 华南
      };
      const putExtra = {
        fname: file[0].name,
        params: {},
        mimeType: ['image/png', 'image/jpeg'],
      };
      const observable = qiniu.upload(file[0], key, token, putExtra, config);
      const observer = {
        next(res) {},
        error(err) {
          console.log(err);
          that.setState({
            coverLoading: false,
          });
          message.error('上传失败');
        },
        complete(res) {
          that.setState({
            coverLoading: false,
          });
          that.uploadArticleeCover(res);
        },
      };
      observable.subscribe(observer);
      // subscription.unsubscribe(); //取消上传
    });
  };
  uploadArticleeCover = data => {
    const params = {
      id: this.state.id,
      key: data.key,
      status: this.state.status,
    };
    ArticleEditAPI.uploadArticleeCover(params).then(res => {
      if (res.success) {
        this.setState({
          id: res.data.id,
          postlink: res.data.postlink,
          status: res.data.status,
          coverLoading: false,
        });
        message.success('上传成功');
      }
    });
  };
  // 删除封面图片
  delCoverImg = () => {
    const params = {
      id: this.state.id,
      postlink: this.state.postlink,
    };
    ArticleEditAPI.delCoverImg(params).then(res => {
      if (res.success) {
        this.setState({
          postlink: null,
        });
      }
    });
  };
  getArticleContext = editorState => {
    this.setState({
      editorState,
      context: editorState.toHTML(),
      raw: editorState.toRAW(),
    });
  };
  // 选择标签
  handelSelectType = e => {
    const children = e.target.parentNode.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('tagActive');
    }
    e.target.classList.add('tagActive');
    this.setState({
      selectType: e.target.getAttribute('data-index'),
    });
  };
  handelSelectTeachnology = e => {
    const children = e.target.parentNode.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('tagActive');
    }
    e.target.classList.add('tagActive');
    this.setState({
      selectTechnology: e.target.getAttribute('data-index'),
    });
  };
  // 文章发布日期
  onChangeDate = (date, dateString) => {
    this.setState({
      date: dateString,
    });
  };
  // 发布文章信息
  uploadArticleInfo = () => {
    const str = this.state.context;
    const text = str.replace(/<[^<>]+>/g, '');
    const abstract = text.substring(0, 120);
    if (this.state.title === null) {
      message.warning('请输入文章标题');
    } else if (this.state.selectType === null) {
      message.warning('请选择文章类别');
    } else if (this.state.selectTechnology === null) {
      message.warning('请选择文章的技术标签');
    } else if (this.state.keywords === null) {
      message.warning('请输入文章关键字');
    } else if (this.state.date === null) {
      message.warning('请选择文章发布日期');
    } else if (this.state.context === '<p></p>') {
      message.warning('请编写文章内容');
    } else if (this.state.postlink === null) {
      message.warning('请上传文章封面图');
    } else {
      this.setState({
        articleLoding: true,
      });
      const params = {
        id: this.state.id,
        status: this.state.status,
        title: this.state.title,
        context: this.state.context,
        raw: this.state.raw,
        postlink: this.state.postlink,
        technologyid: this.state.selectTechnology,
        keywords: this.state.keywords,
        menuid: this.state.selectType,
        abstract,
        date: this.state.date,
      };
      ArticleEditAPI.uploadArticleInfo(params).then(res => {
        if (res.success) {
          this.setState({
            articleLoding: false,
          });
          message.success('发布成功');
          setTimeout(() => {
            this.props.history.push(`/articleInfo/${this.state.id}`);
          }, 500);
        }
      });
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const excludeControls: BuiltInControlType[] = ['fullscreen'];
    const controls: ControlType[] = [
      'undo',
      'redo',
      'separator',
      'font-size',
      'line-height',
      'letter-spacing',
      'separator',
      'text-color',
      'bold',
      'italic',
      'underline',
      'strike-through',
      'separator',
      'superscript',
      'subscript',
      'remove-styles',
      'separator',
      'text-indent',
      'text-align',
      'separator',
      'headings',
      'list-ul',
      'list-ol',
      'blockquote',
      'code',
      'separator',
      'hr',
      'separator',
      'clear',
      'separator',
      'media',
      'link',
    ];
    const hooks = {
      'open-braft-finder': () => {
        this.getMediaItems();
      },
      'remove-medias': files => {
        this.removeMedia(files);
      },
    };
    const myUploadFn = param => {
      const that = this;
      const file = param.file;
      const { name } = file;
      const arry = name.split('.');
      const postfix = arry[arry.length - 1];
      qiniuAPI.getToken().then(res => {
        const token = res.data;
        const key = Cookies.getCookies('id') + Date.now() + `.${postfix}`;
        const config = {
          useCdnDomain: true, // 是否使用 cdn 加速域名
          region: qiniu.region.z2, // 选择上传域名 华南
        };
        const putExtra = {
          fname: file.name,
          params: {},
          mimeType: null,
        };
        const observable = qiniu.upload(file, key, token, putExtra, config);
        const observer = {
          next(res) {
            param.progress(res.total.percent);
          },
          error(err) {
            param.error({
              msg: err,
            });
          },
          complete(res) {
            const params = {
              id: that.state.id,
              key: res.key,
            };
            ArticleEditAPI.uploadArticleResource(params).then(res => {
              if (res.success) {
                param.success({
                  url: res.data.link,
                  meta: {
                    id: res.data.id,
                    title: res.data.key,
                    alt: res.data.key,
                    loop: true, // 指定音视频是否循环播放
                    autoPlay: true, // 指定音视频是否自动播放
                    controls: true, // 指定音视频是否显示控制栏
                    poster: 'http://img.pzhuweb.cn/04.jpg', // 指定视频播放器的封面
                  },
                });
              }
            });
          },
        };
        observable.subscribe(observer);
        // subscription.unsubscribe(); //取消上传
      });
    };
    return (
      <div className="articleEdit">
        <Spin tip="文章发布中..." spinning={this.state.articleLoding}>
          <div className="articleEdit-header">
            <div className="articleEdit-header-logo">
              <a href="/">
                <img src="http://img.pzhuweb.cn/logo.png" alt="logo" />
              </a>
            </div>
            <div className="articleEdit-header-title">
              {getFieldDecorator(
                'title',
                {},
              )(
                <Input
                  onChange={e => {
                    this.setState({ title: e.target.value });
                  }}
                  placeholder="请输入文章标题"
                ></Input>,
              )}
            </div>
            <div className="articleEdit-header-right">
              <div className="articleEdit-header-right-cover">
                <Icon onClick={this.handShowCover} type="picture" />

                <div
                  className="articleEdit-header-right-cover-upload"
                  style={this.state.coverStatus ? { display: 'block' } : { display: 'none' }}
                >
                  <Spin spinning={this.state.coverLoading}>
                    <div className="articleEdit-header-right-cover-upload-title">添加封面大图</div>
                    {this.state.postlink === null || this.state.postlink === null ? (
                      <label className="articleEdit-header-right-cover-upload-addBtn" htmlFor="uploadCover">
                        点击此处添加图片
                      </label>
                    ) : (
                      <div
                        onClick={this.delCoverImg}
                        style={{ backgroundImage: `url(${this.state.postlink})` }}
                        onMouseEnter={() => {
                          this.setState({ delCoverStatus: true });
                        }}
                        onMouseOut={() => {
                          this.setState({ delCoverStatus: false });
                        }}
                        className="articleEdit-header-right-cover-upload-delCover"
                      >
                        <div
                          style={this.state.delCoverStatus ? { opacity: 1 } : { opacity: 0 }}
                          className="articleEdit-header-right-cover-upload-delCover-shadow"
                        >
                          点击删除封面图
                        </div>
                      </div>
                    )}

                    <input id="uploadCover" hidden type="file" onChange={this.uploadCover} />
                  </Spin>
                </div>
              </div>
              <div className="articleEdit-header-right-issue">
                <p onClick={this.handShowIssue}>
                  <span>发布</span>
                  <Icon type="caret-down" />
                </p>
                <div
                  className="articleEdit-header-right-issue-panel"
                  onMouseLeave={e => {
                    if (e.target.tagName !== 'DIV') return;
                    this.setState({ issueStatus: false });
                  }}
                  style={this.state.issueStatus ? { display: 'block' } : { display: 'none' }}
                >
                  <div className="articleEdit-header-right-issue-panel-title">发布文章</div>
                  <div className="articleEdit-header-right-issue-panel-category">分类</div>
                  <div className="articleEdit-header-right-issue-panel-categoryList" ref={this.selectType}>
                    {this.state.menu.map(item => {
                      return (
                        <Button onClick={this.handelSelectType} key={item.id} data-index={item.id}>
                          {item.name}
                        </Button>
                      );
                    })}
                  </div>
                  <div className="articleEdit-header-right-issue-panel-technology">技术标签</div>
                  <div className="articleEdit-header-right-issue-panel-technologyList" ref={this.selectTechnology}>
                    {this.state.technology.map(item => {
                      return (
                        <Button onClick={this.handelSelectTeachnology} key={item.id} data-index={item.id}>
                          {item.name}
                        </Button>
                      );
                    })}
                  </div>
                  <div className="articleEdit-header-right-issue-panel-data">发布日期</div>
                  <div className="articleEdit-header-right-issue-panel-dataSelect">
                    <DatePicker
                      value={moment(this.state.date || new Date(), dateFormat)}
                      onChange={this.onChangeDate}
                    />
                  </div>
                  <div className="articleEdit-header-right-issue-panel-keyWords">关键字</div>
                  <div className="articleEdit-header-right-issue-panel-keyWordsList">
                    <input
                      defaultValue={this.state.keywords}
                      onChange={e => {
                        this.setState({ keywords: e.target.value });
                      }}
                      placeholder="请添加一个关键字"
                    ></input>
                  </div>
                  <div className="articleEdit-header-right-issue-panel-issueBtn">
                    <Button ghost onClick={this.uploadArticleInfo}>
                      文章发布
                    </Button>
                  </div>
                </div>
              </div>
              <div className="articleEdit-header-right-avatar">
                <Link to="user">
                  <Avatar size={40} src={this.state.avatar} />
                </Link>
              </div>
            </div>
          </div>
          <div className="articleEdit-body">
            <BraftEditor
              id="editor-with-code-highlighter"
              controls={controls}
              excludeControls={excludeControls}
              value={this.state.editorState}
              onChange={this.getArticleContext}
              media={{ uploadFn: myUploadFn, pasteImage: false, items: this.state.mediaItems }}
              onDelete={this.delImg}
              hooks={hooks}
            />
          </div>
        </Spin>
      </div>
    );
  }
}
const ArticleEdits = Form.create()(ArticleEdit);
export default ArticleEdits;
