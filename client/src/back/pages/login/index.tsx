import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import md5 from 'md5';
import { Base, Post } from '../../api';
import Cookies from '../../../http/cookies';
import { Footer } from 'back/pages';
import './index.scss';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends FormComponentProps, RouteComponentProps {}
export interface IState {}

class Login extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getCookies();
  }
  getCookies = () => {
    const admin = Cookies.getCookies('admin');
    const adminPawword = Cookies.getCookies('adminPassword');
    const form = this.props.form;
    form.setFieldsValue({ id: admin });
    form.setFieldsValue({ password: adminPawword });
  };
  // 判断用户是否重新输入密码了
  handleUser = e => {
    if (e.target.type === 'password') {
      Cookies.setCookies({ adminPassword: '' });
    } else {
      Cookies.setCookies({ admin: '' });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          id: values.id,
          password:
            Cookies.getCookies('adminPassword') && Cookies.getCookies('adminPassword') !== ''
              ? values.password
              : md5(values.password),
        };
        Post(Base.adminLogin, params).then(res => {
          if (res.success) {
            message.success('登录成功');
            sessionStorage.setItem('token', res.data.token);
            if (values.remember) {
              Cookies.setCookies({
                admin: res.data.id,
                adminPassword: res.data.password,
                remember: values.remember,
              });
            } else {
              Cookies.setCookies({
                admin: '',
                adminPassword: '',
                remember: values.remember,
              });
            }
            setTimeout(() => {
              this.props.history.push('/back');
            }, 500);
          } else {
            message.warning(res.message);
          }
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="backLogin">
        <div className="backLogin-body">
          <div className="backLogin-body-left">
            <div className="backLogin-body-left-container">
              <div className="backLogin-body-left-container-title">WEB团队管理系统</div>
              <p>精彩源于自信，创新永无止境</p>
              <p>WEB专业应用团队，你的梦想从这里开始</p>
            </div>
          </div>
          <div className="backLogin-body-right">
            <div className="backLogin-body-right-container">
              <p>登录</p>
              <div className="backLogin-body-right-container-form">
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('id', {
                      rules: [{ required: true, message: '请输入管理员账号' }],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                        placeholder="账号"
                        onChange={this.handleUser}
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码' }],
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                        type="password"
                        placeholder="密码"
                        onChange={this.handleUser}
                      />,
                    )}
                  </Form.Item>
                  <Form.Item className="backLogin-body-right-container-form-checked">
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(<Checkbox>记住密码</Checkbox>)}
                  </Form.Item>
                  <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                    登录
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        {/* <div className="backLogin-footer">CopyRight©2017 PZHU-WEB 蜀ICP备17013737号</div> */}
      </div>
    );
  }
}

const Logins = Form.create()(Login);
export default Logins;
