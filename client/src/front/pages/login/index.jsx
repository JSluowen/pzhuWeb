import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';

import './index.scss';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                console.log(values);
            }
        })
    }

    render() {

        const {getFieldDecorator} = this.props.form;

        return (
            <div className='login-container'>
                <div className='login-img'>
                    <img src="http://cdn.niuxingxing.com/3.jpg" alt="登录封面图"/>
                </div>
                <div className='login-content'>
                    <div className="login-form">
                        <div className="form-title">
                            用户登录
                        </div>
                        <div className="form-content">
                            <Form onClick={this.handleSubmit } className='login-form' >
                                <Form.Item>
                                    {getFieldDecorator('userName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '账号不能为空！'
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                            placeholder="请输入学号"/>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '密码不能为空！'
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={< Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                            type="password"
                                            placeholder="请输入密码"/>
                                    )}
                                </Form.Item>
                                                    
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    立即登录
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Indexs = Form.create()(Index);

export default Indexs;