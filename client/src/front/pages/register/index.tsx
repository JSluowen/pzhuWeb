import React, { useState, useEffect, FC } from 'react';
import { Form, Button, Input, Steps, Tooltip, Icon, Row, Col, AutoComplete, message } from 'antd';
import './index.scss';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Base, Post } from 'front/api';
import md5 from 'md5'; // MD5加密

const AutoCompleteOption = AutoComplete.Option;

export interface IProps extends FormComponentProps {
  onVisible: (val: boolean) => void;
}

const Register: FC<IProps> = props => {
  const { getFieldDecorator } = props.form;
  const { onVisible } = props;
  const [autoCompleteResult, setAutoCompleteResult] = useState<Array<any>>([]);
  // 邮箱自动补全
  const EmailOptions = autoCompleteResult.map(Email => <AutoCompleteOption key={Email}>{Email}</AutoCompleteOption>);
  // 提交表单
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.password = md5(values.password);
        values.confirm = md5(values.confirm);
        Post(Base.registerUser, values)
          .then(res => {
            if (res.success) {
              message.success(`${res.message}`);
              onVisible(false);
            }
          })
          .catch(error => {
            message.error(error.message);
          });
      }
    });
  };
  // 验证账号
  const validatorId = (rule, value, callback) => {
    const treg = /^[1-9]\d*$|^0$/;
    if (!value || (treg.test(value) === true && value.length === 12)) {
      callback();
    } else {
      callback('请输入12位学号');
    }
  };
  // 验证姓名
  const validatorName = (rule, value, callback) => {
    if (!value || (value.length > 0 && value.length < 10)) {
      callback();
    } else {
      callback('姓名控制在10个汉字以内');
    }
  };

  const [confirmDirty, setConfirmDirty] = useState<boolean>(false);
  // 密码验证
  const validatorPassword = (rule, value, callback) => {
    const form = props.form;
    const patt = /(?=.*\d)(?=.*[a-zA-Z])^.{6,20}$/;
    if (patt.test(value) || !value) {
      if (value && confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    } else {
      callback('密码需要在6-20位之间并包含字母和数字');
    }
  };
  const handleConfirmBlur = e => {
    const value = e.target.value;
    // this.setState({ confirmDirty: confirmDirty || !!value });
    setConfirmDirty(val => {
      return val || !!value;
    });
  };
  const compareToFirstPassword = (rule, value, callback) => {
    const form = props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('请确保两次密码输入一致');
    } else {
      callback();
    }
  };

  const [sendEmail, setSendEmail] = useState<string>('发送验证码');
  const [sendStatus, setSendStatus] = useState<boolean>(false);
  // 邮箱提示格式
  const handleEmailChange = value => {
    let autoCompleteResult;
    if (!value || value.indexOf('@') >= 0) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['@gmail.com', '@163.com', '@qq.com', '@aliyun.com'].map(domain => `${value}${domain}`);
    }
    setAutoCompleteResult(autoCompleteResult);
  };
  // 发送邮箱验证码
  const uploadCode = e => {
    e.preventDefault();
    const form = props.form;
    const email = form.getFieldValue('email');
    if (email === undefined) {
      form.validateFields(['email'], { force: true });
      return;
    }
    setSendStatus(true);
    let time = 60;
    const clearnTime = setInterval(() => {
      time--;
      if (time === 0) {
        clearInterval(clearnTime);
        setSendEmail('重新发送');
        setSendStatus(false);
      } else {
        setSendEmail(`${time}s后重新发送`);
      }
    }, 1000);
    const params = {
      email,
    };
    Post(Base.uploadCode, params)
      .then(res => {
        if (res.success) {
          message.success(res.message);
        }
      })
      .catch(err => {
        console.log(err);
        clearInterval(clearnTime);
        setSendEmail('重新发送');
        setSendStatus(false);
      });
  };

  return (
    <div className="register-container">
      <div className="register-form-content">
        <Form layout="inline" onSubmit={handleSubmit}>
          <Form.Item label="学号">
            {getFieldDecorator('schoolId', {
              rules: [
                {
                  required: true,
                  message: '请输入学号',
                  whitespace: true,
                },
                {
                  validator: validatorId,
                },
              ],
            })(<Input placeholder="请输入12位学号" />)}
          </Form.Item>
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
                  validator: validatorName,
                },
              ],
            })(<Input placeholder="请输入姓名" />)}
          </Form.Item>

          <Form.Item label="密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                  whitespace: true,
                },
                {
                  validator: validatorPassword,
                },
              ],
            })(<Input type="password" placeholder="请输入密码" />)}
          </Form.Item>
          <Form.Item label="确认密码">
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请确认密码',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(<Input type="password" placeholder="请确认密码" onBlur={handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱' }],
            })(
              <AutoComplete dataSource={EmailOptions} onChange={handleEmailChange} placeholder="请输入邮箱">
                <Input />
              </AutoComplete>,
            )}
          </Form.Item>
          <Form.Item label="邮箱验证" extra="我们必须确保邮箱是你本人的且是正确的">
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码',
                      whitespace: true,
                    },
                  ],
                })(<Input placeholder="请输入验证码" />)}
              </Col>
              <Col span={8}>
                <Button onClick={uploadCode} disabled={sendStatus}>
                  {sendEmail}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item className="btn">
            <Button type="primary" size="large" htmlType="submit">
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
const Registers = Form.create<IProps>()(Register);

export default Registers;
