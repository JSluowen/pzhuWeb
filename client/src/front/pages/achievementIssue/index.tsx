import React, { Component } from 'react';
import { Input, Button, Icon, message, Spin, Progress, Form, Tooltip, DatePicker } from 'antd';
import './index.scss';
import Cookies from '../../../http/cookies';
import { Base, Post } from 'front/api';
import * as qiniu from 'qiniu-js';
import qiniuAPI from '../../api/qiniu';
import moment from 'moment';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;
export interface IProps extends FormComponentProps, RouteComponentProps {}
export interface IState {
  id: number | string;
  title: string;
  achievementlink: string;
  abstract: string;
  type: string;
  status: 1 | 2;
  achievementType: Array<{ [key: string]: any }>;
  loading: boolean;
  progress: number;
  coverLoading: boolean;
  delCoverLoading: boolean;
  posterlink: string;
  delCoverStatus: boolean;
  attachment: string;
  attachmentStatus: boolean;
  attachmentLoading: boolean;
  date: Date;
}
class AchievementIssue extends Component<IProps, IState> {
  selectLabel: React.RefObject<any>;
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id || '', // 成果Id
      title: null,
      achievementlink: null,
      abstract: null,
      type: null,
      status: 1, // 默认1数据添加状态，2数据更新状态,
      achievementType: [],
      loading: false,
      progress: 0,
      coverLoading: false, // 封面图上传进度
      delCoverLoading: false, // 删除封面图
      posterlink: null, // 封面图的cdn地址
      delCoverStatus: false, // 是否删除封面图的状态
      attachment: null, // 附件的cdn地址
      attachmentStatus: false, // 是否有附件
      attachmentLoading: false, // 上传附件的进度
      date: new Date(), // 成果发布日期
    };
    this.selectLabel = React.createRef();
  }
  componentDidMount() {
    this.getAchievementIssue();
  }
  // 初始化获取资源信息
  getAchievementIssue = () => {
    const params = {
      id: this.state.id,
    };
    Post(Base.getAchievementIssue, params).then(res => {
      if (res.success) {
        this.setState({
          achievementType: res.data,
        });
      } else {
        this.setState(
          {
            id: res.data.achievement[0].id,
            type: res.data.achievement[0].typeid,
            title: res.data.achievement[0].title,
            achievementlink: res.data.achievement[0].achievementlink,
            abstract: res.data.achievement[0].abstract,
            achievementType: res.data.achievementType,
            posterlink: res.data.achievement[0].posterlink,
            attachment: res.data.achievement[0].attachment,
            status: 2,
            date: res.data.achievement[0].created_at || new Date(),
          },
          () => {
            this.initResource(res.data.achievement[0].typeid);
          },
        );
      }
    });
  };
  // 初始化成果资源
  initResource = data => {
    const node = this.selectLabel.current.children;
    for (const item of node) {
      if (parseInt(item.getAttribute('data-index')) === data) {
        item.classList.add('tagActive');
      }
    }
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ achievementlink: this.state.achievementlink });
    setFieldsValue({ title: this.state.title });
    setFieldsValue({ abstract: this.state.abstract });
  };
  // 选择标签
  handelSelect = e => {
    const children = e.target.parentNode.children;

    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('tagActive');
    }
    e.target.classList.add('tagActive');
    this.setState({
      type: e.target.getAttribute('data-index'),
    });
  };
  // 上传资源
  handelIssue = () => {
    if (this.state.achievementlink === null && this.state.attachment === null) {
      message.warning('链接或附件二选一');
    } else if (this.state.title === null) {
      message.warning('成果标题不能为空');
    } else if (this.state.abstract === null) {
      message.warning('请对成果进行简单描述');
    } else if (this.state.type === null) {
      message.warning('请选择成果类别');
    } else if (this.state.abstract.length > 120) {
      message.warning('成果描述请控制在120字以内');
    } else if (this.state.date === null) {
      message.warning('请选择成果日期');
    } else if (this.state.posterlink === null) {
      message.warning('请上传成果的封面图');
    } else {
      const params = {
        id: this.state.id,
        userid: Cookies.getCookies('id'),
        title: this.state.title,
        achievementlink: this.state.achievementlink,
        type: this.state.type,
        abstract: this.state.abstract,
        status: this.state.status,
        date: this.state.date,
      };
      this.setState({
        loading: true,
      });
      Post(Base.uploadAchievement, params).then(res => {
        if (res.success) {
          setTimeout(() => {
            this.setState({
              loading: false,
            });
            message.success('成果发布成功');
            this.props.history.push('/achievement');
          }, 500);
        }
      });
    }
  };
  // 上传封面图
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
      const key = Cookies.getCookies('id') + Date.now() + `.${postfix}`;
      // let key = "test" + Date.now() + `.${postfix}`
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
        next(res) {
          that.setState({
            progress: Math.floor(res.total.percent),
          });
        },
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
          that.uploadAchievementCover(res);
        },
      };
      observable.subscribe(observer);
      // subscription.unsubscribe(); //取消上传
    });
  };
  // 上传封面图数据到数据库
  uploadAchievementCover = data => {
    const params = {
      id: this.state.id,
      userid: Cookies.getCookies('id'),
      key: data.key,
      status: this.state.status,
    };
    Post(Base.uploadAchievementCover, params).then(res => {
      if (res.success) {
        this.setState({
          id: res.data.id,
          posterlink: res.data.posterlink,
          status: res.data.status,
        });
      }
    });
  };
  // 点击删除封面图
  delAchievementCover = () => {
    const params = {
      id: this.state.id,
      posterlink: this.state.posterlink,
    };
    Post(Base.delAchievementCover, params).then(res => {
      if (res.success) {
        this.setState({
          posterlink: '',
        });
      }
    });
  };
  // 上传附件
  uploadAttachment = e => {
    const file = e.target.files;
    const { size, type, name } = file[0];
    if (type !== 'application/pdf') {
      message.warning('请上传文件后缀为.pdf 的附件');
      return;
    }
    if (size > 5 * 1024 * 1024) {
      message.warning('请上传小于 5M 的文件');
    }
    this.setState({
      attachmentLoading: true,
      attachmentStatus: true,
    });
    const arry = name.split('.');
    const postfix = arry[arry.length - 1];
    const that = this;
    qiniuAPI.getToken().then(res => {
      const token = res.data;
      const key = Cookies.getCookies('id') + Date.now() + `.${postfix}`;
      const config = {
        useCdnDomain: true, // 是否使用 cdn 加速域名
        region: qiniu.region.z2, // 选择上传域名 华南
      };
      const putExtra = {
        fname: file[0].name,
        params: {},
        mimeType: ['application/pdf'],
      };
      const observable = qiniu.upload(file[0], key, token, putExtra, config);
      const observer = {
        next(res) {
          that.setState({
            progress: Math.floor(res.total.percent),
          });
        },
        error(err) {
          console.log(err);
          that.setState({
            coverLoading: false,
          });
          message.error('上传失败');
        },
        complete(res) {
          that.setState({
            attachmentLoading: false,
          });
          that.uploadAchievementAttachment(res);
        },
      };
      observable.subscribe(observer);
    });
  };
  // 上传附件地址到数据库
  uploadAchievementAttachment = data => {
    const params = {
      id: this.state.id,
      userid: Cookies.getCookies('id'),
      key: data.key,
      status: this.state.status,
    };
    Post(Base.uploadAchievementAttachment, params).then(res => {
      if (res.success) {
        this.setState({
          id: res.data.id,
          attachment: res.data.attachment,
          status: res.data.status,
        });
      }
    });
  };
  // 删除附加
  delAchievementAttachment = () => {
    const params = {
      id: this.state.id,
      attachment: this.state.attachment,
    };
    Post(Base.delAchievementAttachment, params).then(res => {
      if (res.success) {
        this.setState({
          attachment: '',
          attachmentStatus: false,
        });
      }
    });
  };
  // 成果发布日期
  onChangeDate = (date, dateString) => {
    this.setState({
      date: dateString,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="achievementIssue">
        <div className="achievementIssue-container">
          <Spin tip="成果发布中..." spinning={this.state.loading}>
            <div className="achievementIssue-container-header">
              成果发布
              <small>(链接或附件二选一)</small>
            </div>
            <div className="achievementIssue-container-body">
              <div className="achievementIssue-container-body-left">
                {getFieldDecorator(
                  'achievementlink',
                  {},
                )(
                  <Input
                    size="large"
                    placeholder="成果链接：http://www.pzhuweb.cn"
                    onChange={e => {
                      this.setState({ achievementlink: e.target.value });
                    }}
                  />,
                )}
                {getFieldDecorator(
                  'title',
                  {},
                )(
                  <Input
                    size="large"
                    placeholder="请输入成果标题"
                    onChange={e => {
                      this.setState({ title: e.target.value });
                    }}
                  />,
                )}
                {getFieldDecorator(
                  'abstract',
                  {},
                )(
                  <TextArea
                    placeholder="成果描述（120字以内）"
                    onChange={e => {
                      this.setState({ abstract: e.target.value });
                    }}
                  />,
                )}
                <div className="achievementIssue-container-body-left-tag" ref={this.selectLabel}>
                  <p>分类</p>
                  <div className="achievementIssue-container-body-left-tag-btn">
                    {this.state.achievementType.map(item => {
                      return (
                        <Button key={item.id} onClick={this.handelSelect} data-index={item.id}>
                          {item.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <div className="achievementIssue-container-body-left-date">
                  <p>日期</p>
                  <DatePicker value={moment(this.state.date, dateFormat)} onChange={this.onChangeDate} />
                </div>
                <Button style={{ width: '100%', margin: '20px 0' }} onClick={this.handelIssue} type="primary">
                  发布
                </Button>
              </div>
              <div className="achievementIssue-container-body-right">
                <div className="achievementIssue-container-body-right-top">
                  {this.state.posterlink === '' || this.state.posterlink === null ? (
                    <label htmlFor="uploadImg" className="achievementIssue-container-body-right-top-imgLabel">
                      <div className="achievementIssue-container-body-right-top-imgLabel-cover">
                        <Icon type="cloud-upload" style={{ color: '#1890ff', fontSize: '40px' }} />
                        <span>点击上传封面图</span>
                      </div>
                    </label>
                  ) : (
                    <div
                      className="achievementIssue-container-body-right-top-delCover"
                      onClick={this.delAchievementCover}
                      onMouseLeave={() => {
                        this.setState({ delCoverStatus: false });
                      }}
                      onMouseEnter={() => {
                        this.setState({ delCoverStatus: true });
                      }}
                      style={{ backgroundImage: `url(${this.state.posterlink})` }}
                    >
                      <div
                        style={this.state.delCoverStatus ? { opacity: 1 } : { opacity: 0 }}
                        className="achievementIssue-container-body-right-top-delCover-shadow"
                      >
                        点击删除封面图
                      </div>
                    </div>
                  )}
                  <input id="uploadImg" accept=".png, .jpg, .jpeg" type="file" hidden onChange={this.uploadCover} />
                  <div
                    style={this.state.coverLoading ? { display: 'block' } : { display: 'none' }}
                    className="achievementIssue-container-body-right-top-progress"
                  >
                    <Progress
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      percent={this.state.progress}
                    />
                  </div>
                </div>
                <div className="achievementIssue-container-body-right-attachment">
                  {this.state.attachmentStatus || (this.state.attachment !== null && this.state.attachment !== '') ? (
                    <div className="achievementIssue-container-body-right-attachment-file">
                      <div className="achievementIssue-container-body-right-attachment-file-name">
                        <p>
                          <Icon type="paper-clip" />
                          <a href={this.state.attachment}>附件</a>
                        </p>
                        <p onClick={this.delAchievementAttachment}>
                          <Icon type="close" />
                        </p>
                      </div>
                      <Progress
                        style={this.state.attachmentLoading ? { display: 'block' } : { display: 'none' }}
                        percent={this.state.progress}
                        status="active"
                      />
                    </div>
                  ) : (
                    <Tooltip placement="bottom" title="请上传pdf格式的文件">
                      <label
                        htmlFor="uploadFile"
                        className="achievementIssue-container-body-right-attachment-fileLabel"
                      >
                        <Icon type="upload" />
                        添加成果附件
                      </label>
                    </Tooltip>
                  )}
                  <input id="uploadFile" accept=".pdf" type="file" hidden onChange={this.uploadAttachment} />
                </div>
              </div>
            </div>
          </Spin>
        </div>
      </div>
    );
  }
}
const AchievementIssues = Form.create()(AchievementIssue);
export default AchievementIssues;
