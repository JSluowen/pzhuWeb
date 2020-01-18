import React, { Component } from 'react';
import { Button, Modal, Form, Input, Tooltip, Icon, AutoComplete, message, Cascader, Spin } from 'antd';
import Cropper from '../../../front/components/cropper';
import { UserAPI } from '../../api';
import qiniu from '../../../front/common/qiniu';
import md5 from 'md5';
import './userinfo.scss';
// 自动完成
const AutoCompleteOption = AutoComplete.Option;
class UpdateUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id, // 用户信息id
      visible: false, // 头像窗口默认关闭
      confirmDirty: false,
      autoCompleteResult: [],
      domain: [], // 研究方向
      initSchoolMajor: [], // 初始化学院专业
      initDomain: [], // 初始化研究方向
      defaultSchoolMajor: [], // 默认的学院专业
      defaultDomain: [], // 默认的研究方向,
      src: 'http://img.pzhuweb.cn/avatar', // 默认头像地址
      loading: false, // 资源上传中
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return {
        id: props.id,
      };
    }
    return null;
  }
  componentDidMount() {
    this.getAddUserInfo();
  }
  componentDidUpdate(pre, state) {
    if (this.state.id !== state.id) {
      this.getAddUserInfo();
    }
  }
  getAddUserInfo = () => {
    const params = {
      id: this.state.id,
    };
    UserAPI.getAddUserInfo(params).then(res => {
      if (res.success) {
        // 修改成员信息，获取用户信息和专业年级，研究方向的信息
        this.setState({
          schoolMajor: res.data.schoolmajor,
          domain: res.data.domain,
        });
        if (res.status) {
          this.initUserInfo({ ...res.data.user, ...res.data.userinfo });
        }
      }
    });
  };
  // 邮箱提示格式
  handleEmailChange = value => {
    let autoCompleteResult;
    if (!value || value.indexOf('@') >= 0) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['@gmail.com', '@163.com', '@qq.com', '@aliyun.com'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };
  // base64转换成Blob对象
  dataURLtoBlob = dataurl => {
    const arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-const-assign
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };
  // 截取头像
  uploadAvatar = dataUrl => {
    this.setState({
      src: dataUrl,
      visible: false,
    });
  };
  // 验证姓名
  validatorName = (rule, value, callback) => {
    if (!value || (value.length > 0 && value.length < 10)) {
      callback();
    } else {
      callback('姓名控制在10个汉字以内');
    }
  };
  // 联系方式验证
  validatorPhone = (rule, value, callback) => {
    const treg = /^[1-9]\d*$|^0$/;
    if (!value || treg.test(value) === true) {
      callback();
    } else {
      callback('输入格式有误');
    }
  };
  // 成员简介验证
  validatorDescription = (rule, value, callback) => {
    if (!value || value.length < 20) {
      callback();
    } else {
      callback('成员简介控制在20字以内');
    }
  };
  // 提交用户信息
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true,
        });
        const strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        const re = new RegExp(strRegex);
        if (!re.test(this.state.src)) {
          const dataBlob = this.dataURLtoBlob(this.state.src);
          qiniu(dataBlob).then(res => {
            values.avatar = res.key;
            values.isCDN = '1';
            values.id = this.state.id;
            UserAPI.updateUserInfo(values).then(res => {
              if (res.success) {
                message.success(res.message);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                this.props.activeKey('1');
              } else {
                message.warning(res.message);
              }
              this.setState({
                loading: false,
              });
            });
          });
        } else {
          values.avatar = this.state.src;
          values.isCDN = '0';
          values.id = this.state.id;
          UserAPI.updateUserInfo(values).then(res => {
            if (res.success) {
              message.success(res.message);
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
              this.props.activeKey('1');
            } else {
              message.warning(res.message);
            }
            this.setState({
              loading: false,
            });
          });
        }
      }
    });
  };
  // 初始化修改的成员信息
  initUserInfo = data => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ name: data.name });
    setFieldsValue({ email: data.email });
    setFieldsValue({ description: data.description });
    setFieldsValue({ phone: data.phone });
    this.setState({
      src: data.avatar,
      initSchoolMajor: [data.school, data.major],
      initDomain: [data.domain],
      status: data.status,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    // 邮箱自动补全
    const EmailOptions = this.state.autoCompleteResult.map(Email => (
      <AutoCompleteOption key={Email}>{Email}</AutoCompleteOption>
    ));
    return (
      <Spin tip="个人信息上传中" spinning={this.state.loading} delay="200">
        <div className="back-user-body-add">
          <div className="back-user-body-add-left">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item
                label={
                  <span>
                    姓名&nbsp;
                    <Tooltip title="请不要使用昵称">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: '请输入姓名',
                      whitespace: true,
                    },
                    {
                      validator: this.validatorName,
                    },
                  ],
                })(<Input placeholder="请输入姓名" />)}
              </Form.Item>
              <Form.Item label="邮箱">
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: '请输入邮箱' }],
                })(
                  <AutoComplete dataSource={EmailOptions} onChange={this.handleEmailChange} placeholder="请输入邮箱">
                    <Input />
                  </AutoComplete>,
                )}
              </Form.Item>
              <Form.Item label="联系方式.">
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: '请输入联系方式',
                    },
                    {
                      validator: this.validatorPhone,
                    },
                  ],
                })(<Input placeholder="请输入联系方式" />)}
              </Form.Item>
              <Form.Item label="学院专业">
                {getFieldDecorator('schoolMajor', {
                  initialValue: this.state.initSchoolMajor,
                  rules: [
                    {
                      type: 'array',
                      required: true,
                      message: '请选择学院专业',
                    },
                  ],
                })(<Cascader placeholder="请选择学院专业" showSearch={this.filter} options={this.state.schoolMajor} />)}
              </Form.Item>
              <Form.Item label="研究方向">
                {getFieldDecorator('domain', {
                  initialValue: this.state.initDomain,
                  rules: [
                    {
                      type: 'array',
                      required: true,
                      message: '请选择研究方向',
                    },
                  ],
                })(<Cascader placeholder="请选择研究方向" showSearch={this.filter} options={this.state.domain} />)}
              </Form.Item>
              <Form.Item label="成员介绍." style={{ maxHeight: 120 }}>
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: '请输入成员简介',
                    },
                    {
                      validator: this.validatorDescription,
                    },
                  ],
                })(<textarea cols="50" rows="2" placeholder="成员简介（20字以内）" />)}
              </Form.Item>
              <Form.Item className="btn">
                <Button type="primary" htmlType="submit">
                  修改成员
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="back-user-body-add-right">
            <div className="back-user-body-add-right-avatar">
              <img src={this.state.src} alt="" />
            </div>
            <Button
              onClick={() => {
                this.setState({ visible: true });
              }}
            >
              修改头像
            </Button>
            <Modal
              title="上传头像"
              visible={this.state.visible}
              onCancel={() => {
                this.setState({ visible: false });
              }}
              footer={null}
            >
              <Cropper src={this.state.src} uploadImg={this.uploadAvatar} />
            </Modal>
          </div>
        </div>
      </Spin>
    );
  }
}
const UpdateUserInfos = Form.create({})(UpdateUserInfo);
export default UpdateUserInfos;
