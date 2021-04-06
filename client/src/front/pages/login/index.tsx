import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Modal } from 'antd';
import md5 from 'md5';
import { Base, Post, Get } from 'front/api';
import Cookies from '../../../http/cookies';
import { ImgProLoad } from 'src/component';
import Forget from './forget';
import './index.scss';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';

export interface IState {
  confirmResult: number;
  confirmMessage: string;
  visible: boolean;
}
const imgs = {
  small: 'http://img.pzhuweb.cn/login-small.png',
  large: 'http://img.pzhuweb.cn/login.png',
};

export interface IProps extends FormComponentProps, RouteComponentProps {}
class Login extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      confirmMessage: '',
      confirmResult: 0,
      visible: false,
    };
  }
  componentDidMount() {
    this.handleCreate();
    // 获取后台的时间令牌 暂时取消（因系统暂不支持跨域携带cookie）
    // Get(Base.timetoken).then(res => {
    //   localStorage.setItem('time', res.message);
    // });
    const id = Cookies.getCookies('id');
    const password = Cookies.getCookies('password');
    const form = this.props.form;

    form.setFieldsValue({ id });
    form.setFieldsValue({ password });
  }
  // 判断用户信息Cookies的存储
  handleUser = e => {
    if (e.target.type === 'password') {
      Cookies.setCookies({ password: '' });
    } else {
      Cookies.setCookies({ id: '' });
    }
  };
  // 生成验证信息
  handleCreate = () => {
    const a = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    const res = a + b;
    this.setState({
      confirmMessage: `${a}+${b}=?`,
      confirmResult: res,
    });
  };
  // 确认验证信息
  handleConfirm = (rules, value, callback) => {
    if (value && parseInt(value) !== this.state.confirmResult) {
      callback('验证信息不正确');
    } else {
      callback();
    }
  };
  // 登录验证
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          id: values.id,
          password:
            Cookies.getCookies('password') && Cookies.getCookies('password') !== ''
              ? md5(values.password)
              : md5(md5(values.password)),
        };
        Post(Base.login, params)
          .then(res => {
            if (res.success) {
              message.success('登录成功');
              const data = {
                id: res.data.id,
                password: res.data.password,
                name: res.data.name,
              };
              Cookies.setCookies(data);
              localStorage.setItem('token', res.data.token || '111');
              setTimeout(() => {
                this.props.history.replace('/user');
              }, 500);
            } else {
              message.warning(res.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-box">
        <ImgProLoad {...imgs}>
          <div className="login-container">
            <div className="fuzzy"></div>
            <div className="login-body">
              <div className="login-content">
                <div className="form-top">
                  <div className="form-top-title">用户登录</div>
                </div>
                <div className="form-content">
                  <Form className="login-form">
                    <Form.Item>
                      {getFieldDecorator('id', {
                        rules: [
                          {
                            required: true,
                            message: '请输入学号',
                          },
                        ],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                          placeholder="请输入学号"
                          onChange={this.handleUser}
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('password', {
                        rules: [
                          {
                            required: true,
                            message: '请输入密码',
                          },
                        ],
                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                          type="password"
                          placeholder="请输入密码"
                          onChange={this.handleUser}
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('confirm', {
                        rules: [
                          {
                            required: true,
                            message: '请输入验证信息',
                          },
                          {
                            validator: this.handleConfirm,
                          },
                        ],
                      })(
                        <Input
                          prefix={<Icon type="key" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                          type="text"
                          placeholder={this.state.confirmMessage}
                        />,
                      )}
                    </Form.Item>
                    <Button type="primary" onClick={this.handleSubmit} className="login-form-button">
                      立即登录
                    </Button>
                  </Form>
                </div>
                <div
                  className="form-top-forget"
                  onClick={() => {
                    this.setState({ visible: true });
                  }}
                >
                  忘记密码？
                </div>
                <Modal
                  title="找回密码"
                  visible={this.state.visible}
                  onCancel={() => {
                    this.setState({ visible: false });
                  }}
                  footer={null}
                  maskClosable={false}
                >
                  <Forget visible={flag => this.setState({ visible: flag })} />
                </Modal>
              </div>
            </div>
          </div>
        </ImgProLoad>
      </div>
    );
  }
}
const Logins = Form.create()(Login);
export default Logins;
