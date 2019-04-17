import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Modal } from 'antd';
import md5 from 'md5';
import LoginApi from '../../api/login';
import Cookies from '../../../http/cookies';
import Forget from './forget';
import './index.scss';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmMessage: '',
			confirmResult: '',
			visible: false
		};
	}
	componentDidMount() {
		this.handleCreate();
		//获取后台的时间令牌
		LoginApi.timeToken().then((res) => {
			sessionStorage.setItem('time', res.message);
		});
		let id = Cookies.getCookies('id');
		let password = Cookies.getCookies('password');
		let form = this.props.form;

		form.setFieldsValue({ id: id });
		form.setFieldsValue({ password: password });
	}
	componentWillUnmount() {
		sessionStorage.removeItem('time');
	}
	// 判断用户信息Cookies的存储
	handleUser = (e) => {
		if (e.target.type == 'password') {
			Cookies.setCookies({ password: '' });
		} else {
			Cookies.setCookies({ id: '' });
		}
	};
	//生成验证信息
	handleCreate = () => {
		let a = Math.floor(Math.random() * 100);
		let b = Math.floor(Math.random() * 100);
		let res = a + b;
		this.setState({
			confirmMessage: `${a}+${b}=?`,
			confirmResult: parseInt(res)
		});
	};
	//确认验证信息
	handleConfirm = (rules, value, callback) => {
		if (value && parseInt(value) !== this.state.confirmResult) {
			callback('验证信息不正确');
		} else {
			callback();
		}
	};
	//登录验证
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let params = {
					id: values.id,
					password:
						Cookies.getCookies('password') && Cookies.getCookies('password') !== ''
							? md5(values.password + sessionStorage.getItem('time'))
							: md5(md5(values.password) + sessionStorage.getItem('time'))
				};
				LoginApi.login(params)
					.then((res) => {
						if (res.success) {
							message.success('登录成功,1s后自动跳转');
							let data = {
								id: res.data.id,
								password: res.data.password,
								name: res.data.name
							};
							Cookies.setCookies(data);
							sessionStorage.setItem('token', res.data.token);
							setTimeout(() => {
								this.props.router.push('/index');
							}, 1000);
						} else {
							message.warning(res.message);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
	};
	handelUser = (e) => {
		if (e.target.type == 'password') {
			Cookies.setCookies({ password: '' });
		} else {
			Cookies.setCookies({ id: '' });
		}
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			
			<div className="login-container">
				<div className="login-img">
					<img src="http://cdn.niuxingxing.com/3.jpg" alt="登录封面图" />
				</div>
				<div className="login-content">
					<div className="login-form">
						<div className="form-top">
							<div className="form-top-title">用户登录</div>
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
								<Forget
									visible={(flag) => {
										this.setState({ visible: flag });
									}}
								/>
							</Modal>
						</div>
						<div className="form-content">
							<Form className="login-form">
								<Form.Item>
									{getFieldDecorator('id', {
										rules: [
											{
												required: true,
												message: '请输入学号'
											}
										]
									})(
										<Input
											prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
											placeholder="请输入学号"
											onChange={this.handleUser}
										/>
									)}
								</Form.Item>
								<Form.Item>
									{getFieldDecorator('password', {
										rules: [
											{
												required: true,
												message: '请输入密码'
											}
										]
									})(
										<Input
											prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
											type="password"
											placeholder="请输入密码"
											onChange={this.handleUser}
										/>
									)}
								</Form.Item>
								<Form.Item>
									{getFieldDecorator('confirm', {
										rules: [
											{
												required: true,
												message: '请输入验证信息'
											},
											{
												validator: this.handleConfirm
											}
										]
									})(
										<Input
											prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
											type="text"
											placeholder={this.state.confirmMessage}
										/>
									)}
								</Form.Item>
								<Button type="primary" onClick={this.handleSubmit} className="login-form-button">
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

const Logins = Form.create()(Login);

export default Logins;
