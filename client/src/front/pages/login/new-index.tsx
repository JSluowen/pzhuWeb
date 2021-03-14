import React, { useState, useEffect, FC } from 'react';
import { Form, Icon, Input, Button, message, Modal } from 'antd';
import Cookies from 'src/http/cookies';
import md5 from 'md5';
import { Base, Post, Get } from 'front/api';
import './index.scss';
import { FormComponentProps } from 'antd/lib/form';
import { Redirect } from 'react-router';

const Login: FC<FormComponentProps> = props => {
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
    },
  };
  const [confirmMessage, setConfirmMessage] = useState<string>('');
  const [confirmResult, setconfirmResult] = useState<number>(0);
  const handleCreate = () => {
    const a = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    setConfirmMessage(`${a}+${b}=?`);
    setconfirmResult(a + b);
  };
  // 确认验证信息
  const handleConfirm = (rules, value, callback) => {
    if (value && parseInt(value) !== confirmResult) {
      callback('验证信息不正确');
    } else {
      callback();
    }
  };
  // 判断用户信息Cookies的存储
  const handleUser = e => {
    if (e.target.type === 'password') {
      Cookies.setCookies({ password: '' });
    } else {
      Cookies.setCookies({ id: '' });
    }
  };
  // 界面初始化操作
  const initData = () => {
    // 获取后台的时间令牌
    Get(Base.timetoken).then(res => {
      localStorage.setItem('time', res.message);
    });
    const id = Cookies.getCookies('id');
    const password = Cookies.getCookies('password');
    const form = props.form;
    form.setFieldsValue({ id });
    form.setFieldsValue({ password });
    handleCreate();
  };
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
  const handleConfirmBlur = () => {
    let password = props.form.getFieldValue('password');
    password ? setIsShowConfirm(true) : setIsShowConfirm(false);
  };
  const [isLogin, setisLogin] = useState<boolean>(false);
  // 登录验证
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          id: values.id,
          password:
            Cookies.getCookies('password') && Cookies.getCookies('password') !== ''
              ? md5(values.password + localStorage.getItem('time'))
              : md5(md5(values.password) + localStorage.getItem('time')),
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
              localStorage.setItem('token', res.data.token);
              setisLogin(true);
            } else {
              message.error(res.message);
            }
          })
          .catch(err => {
            message.error(err || '服务错误');
          });
      }
    });
  };
  useEffect(() => {
    initData();
  }, []);

  if (isLogin) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="login-container">
      <div className="form-content">
        <Form {...formItemLayout} onSubmit={handleSubmit} className="login-form">
          <Form.Item label="学号">
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
                onChange={handleUser}
              />,
            )}
          </Form.Item>
          <Form.Item label="密码">
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
                onChange={handleUser}
                onBlur={handleConfirmBlur}
              />,
            )}
          </Form.Item>
          {props.form.getFieldValue('password') && isShowConfirm && (
            <Form.Item label="验证码">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请输入验证信息',
                  },
                  {
                    validator: handleConfirm,
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="key" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  type="text"
                  placeholder={confirmMessage}
                />,
              )}
            </Form.Item>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form>
      </div>
    </div>
  );
};
const Logins = Form.create()(Login);

export default Logins;
