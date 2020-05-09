import React, { Component } from 'react';
import { Form, Input, Button, Cascader, Modal, message, Spin } from 'antd';
import Cropper from '../../components/cropper';
import qiniu from '../../common/qiniu';
import Cookies from '../../../http/cookies';
import PersonAPI from '../../api/person';
import './index.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form/Form';

export interface IState {
  defaultSchoolMajor: Array<{ [key: string]: any }>;
  defaultDomain: Array<{ [key: string]: any }>;
  schoolMajor: Array<{ [key: string]: any }>;
  domain: Array<{ [key: string]: any }>;
  initSchoolMajor: Array<{ [key: string]: any }>;
  initDomain: Array<{ [key: string]: any }>;
  visible: boolean;
  loading: boolean;
  src: string;
}
export interface IProps extends RouteComponentProps, FormComponentProps {}
class Setting extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      defaultSchoolMajor: [],
      defaultDomain: [],
      visible: false,
      src: 'http://img.pzhuweb.cn/avatar',
      loading: false,
      schoolMajor: [],
      domain: [],
      initSchoolMajor: [],
      initDomain: [],
    };
  }
  // 初始化信息搜索过滤
  filter = (inputValue, path): boolean => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  componentWillMount() {
    this.getInitMessage();
  }

  // 联系方式验证
  validatorPhone = (rule, value, callback) => {
    const treg = /^[1-9]\d*$|^0$/;
    if (!value || (treg.test(value) === true && value.length === 11)) {
      callback();
    } else {
      callback('请输入11位的手机号');
    }
  };
  // 个人简介验证
  validatorDescription = (rule, value, callback) => {
    if (!value || value.length < 20) {
      callback();
    } else {
      callback('个人简介控制在20字以内');
    }
  };
  // 初始化获取
  getInitInfo = () => {
    PersonAPI.getInitInfo({}).then(res => {
      if (res.success) {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({ phone: res.data.phone });
        setFieldsValue({ description: res.data.description });
        this.setState({
          src: res.data.avatar || this.state.src,
          initSchoolMajor: [res.data.School.id, res.data.Major.id],
          initDomain: [res.data.Domain.id],
        });
      } else {
        message.warning('请立即完善个人信息');
      }
    });
  };
  // 获取初始信息：学院专业，研究方向
  getInitMessage = () => {
    PersonAPI.getInitMessage().then(res => {
      if (res.success) {
        this.setState(
          {
            schoolMajor: res.data.schoolmajor,
            domain: res.data.domain,
          },
          () => {
            this.getInitInfo();
          },
        );
      }
    });
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
  // 上传头像
  uploadAvatar = dataUrl => {
    this.setState({
      src: dataUrl,
      visible: false,
    });
  };
  // 保存用户信息
  handelSave = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true,
        });
        // 判断图片资源是本地的,还是第三方资源链接
        const strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        const re = new RegExp(strRegex);
        if (!re.test(this.state.src)) {
          const dataBlob = this.dataURLtoBlob(this.state.src);
          qiniu(dataBlob)
            .then(res => {
              values.avatar = res.key;
              values.status = 1;
              PersonAPI.uploadUserInfo(values).then(res => {
                if (res.success) {
                  this.setState({
                    loading: false,
                  });
                  message.success('信息保存成功');
                  setTimeout(() => {
                    this.props.history.push('/user');
                  }, 500);
                }
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          values.avatar = this.state.src;
          values.status = 0;
          PersonAPI.uploadUserInfo(values).then(res => {
            if (res.success) {
              this.setState({
                loading: false,
              });
              message.success('信息保存成功');
              setTimeout(() => {
                this.props.history.push('/user');
              }, 500);
            }
          });
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="personinfo">
        <div className="personinfo-container">
          <div className="personinfo-container-pageheader">编辑个人信息</div>
          <Spin tip="个人信息上传中" spinning={this.state.loading} delay={200}>
            <div className="personinfo-container-context">
              <div className="personinfo-container-context-left">
                <Form layout="inline" className="personinfo-container-context-left-form">
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
                    })(<Input placeholder="请输入11位手机号" />)}
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
                    })(
                      <Cascader
                        placeholder="请选择学院专业"
                        showSearch={{ filter: this.filter }}
                        options={this.state.schoolMajor}
                      />,
                    )}
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
                    })(
                      <Cascader
                        placeholder="请选择研究方向"
                        showSearch={{ filter: this.filter }}
                        options={this.state.domain}
                      />,
                    )}
                  </Form.Item>

                  <Form.Item label="个人简介" style={{ maxHeight: 120 }}>
                    {getFieldDecorator('description', {
                      rules: [
                        {
                          required: true,
                          message: '请输入个人简介',
                        },
                        {
                          validator: this.validatorDescription,
                        },
                      ],
                    })(<textarea cols={50} rows={3} placeholder="个人简介（20字以内）" />)}
                  </Form.Item>
                  <Form.Item style={{ alignItems: 'center' }}>
                    <Button type="primary" onClick={this.handelSave}>
                      保存
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className="personinfo-container-context-right">
                <div className="personinfo-container-context-right-avatar">
                  <img src={this.state.src} alt="" />
                </div>
                <Button
                  onClick={() => {
                    this.setState({ visible: true });
                  }}
                >
                  修改头像
                </Button>
              </div>
              <Modal title="上传头像" visible={this.state.visible} onCancel={this.handleCancel} footer={null}>
                <Cropper src={this.state.src} uploadImg={this.uploadAvatar} />
              </Modal>
            </div>
          </Spin>
        </div>
      </div>
    );
  }
}

const Settings = Form.create()(Setting);

export default Settings;
