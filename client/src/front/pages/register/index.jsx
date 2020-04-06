import React, { Component } from 'react';
import { Form, Button, Input, Steps, Tooltip, Icon, Row, Col, AutoComplete, message } from 'antd';
import RegisterApi from '../../api/register';
import './index.scss';
import md5 from 'md5'; //MD5加密
message.config({
	top: 100,
	duration: 2,
	maxCount: 3
});
// 自动完成
const AutoCompleteOption = AutoComplete.Option;

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sendEmail: '发送验证码',
			sendStatus: false, //邮件按钮点击状态
			confirmDirty: false,
			autoCompleteResult: []
		};
	}
	// 提交表单
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				values['password'] = md5(values.password);
				values['confirm'] = md5(values.confirm);
				RegisterApi.registerUser(values)
					.then((res) => {
						if (res.success) {
							message.success(`${res.message},1秒后自动跳转登录界面`);
							setTimeout(() => {
								this.props.router.push('/login');
							}, 1000);
						}
					})
					.catch((error) => {
						message.error(error.message);
					});
			}
		});
	};

	//验证姓名
	validatorName = (rule, value, callback) => {
		if (!value || (value.length > 0 && value.length < 10)) {
			callback();
		} else {
			callback('姓名控制在10个汉字以内');
		}
	}
	// 验证账号
	validatorId = (rule, value, callback) => {
		let treg = /^[1-9]\d*$|^0$/;
		if (!value || (treg.test(value) == true && value.length === 12)) {
			callback();
		} else {
			callback('请输入12位学号');
		}
	}
	// 密码验证
	validatorPassword = (rule, value, callback) => {
		const form = this.props.form;
		let patt = /(?=.*\d)(?=.*[a-zA-Z])^.{6,20}$/;
		if (patt.test(value) || !value) {
			if (value && this.state.confirmDirty) {
				form.validateFields(['confirm'], { force: true });
			}
			callback();
		} else {
			callback('密码需要在6-20位之间并包含字母和数字');
		}
	};
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('请确保两次密码输入一致');
		} else {
			callback();
		}
	};
	//验证姓名
	validatorName = (rule, value, callback) => {
		if (value.length > 0 && value.length < 10) {
			callback();
		} else {
			callback('请将姓名控制在10个汉字以内');
		}
	}
	// 邮箱提示格式
	handleEmailChange = (value) => {
		let autoCompleteResult;
		if (!value || value.indexOf('@') >= 0) {
			autoCompleteResult = [];
		} else {
			autoCompleteResult = ['@gmail.com', '@163.com', '@qq.com', '@aliyun.com'].map(
				(domain) => `${value}${domain}`
			);
		}
		this.setState({ autoCompleteResult });
	};
	//发送邮箱验证码
	uploadCode = (e) => {
		e.preventDefault();
		const form = this.props.form;
		let email = form.getFieldValue('email');
		if (email === undefined) {
			form.validateFields(['email'], { force: true });
			return;
		}
		this.setState({
			sendStatus: true
		});
		let time = 60;
		let clearnTime = setInterval(() => {
			time--;
			if (time == 0) {
				clearInterval(clearnTime);
				this.setState({
					sendEmail: '重新发送',
					sendStatus: false
				});
			} else {
				this.setState({
					sendEmail: `${time}s后重新发送`
				});
			}
		}, 1000);
		let params = {
			email: email
		};
		RegisterApi.uploadCode(params)
			.then((res) => {
				if (res.success) {
					message.success(res.message);
				}
			})
			.catch((err) => {
				console.log(err);
				clearInterval(clearnTime);
				this.setState({
					sendEmail: '重新发送',
					sendStatus: false
				});
			});
	};

	render() {
		// 用户注册头部栏
		const Step = Steps.Step;
		const steps = [
			{
				title: '用户注册',
				iconType: 'user'
			}
		];
		const { getFieldDecorator } = this.props.form;
		// 邮箱自动补全
		const EmailOptions = this.state.autoCompleteResult.map((Email) => (
			<AutoCompleteOption key={Email}>{Email}</AutoCompleteOption>
		));
		return (
			<div className="register-container">
				<div className="back-img">
					<img src="http://img.pzhuweb.cn/2.jpg" alt="这是注册背景图" />
				</div>
				<div className="shadow-bottom" />
				<div className="shadow-top">
					<div className="register-content">
						<div className="register-top">
							<Steps current={0}>
								{steps.map((item, index) => {
									return <Step key={index} title={item.title} icon={<Icon type={item.iconType} />} />;
								})}
							</Steps>
						</div>
						<div className="register-content">
							<div className="register-form-content">
								<Form layout="inline" onSubmit={this.handleSubmit}>
									<Form.Item label="学号">
										{getFieldDecorator('schoolId', {
											rules: [
												{
													required: true,
													message: '请输入学号',
													whitespace: true
												},
												{
													validator: this.validatorId
												}
											]
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
													whitespace: true
												},
												{
													validator: this.validatorName
												}
											]
										})(<Input placeholder="请输入姓名" />)}
									</Form.Item>

									<Form.Item label="密码">
										{getFieldDecorator('password', {
											rules: [
												{
													required: true,
													message: '请输入密码'
												},
												{
													validator: this.validatorPassword
												}
											]
										})(<Input type="password" placeholder="请输入密码" />)}
									</Form.Item>
									<Form.Item label="确认密码">
										{getFieldDecorator('confirm', {
											rules: [
												{
													required: true,
													message: '请确认密码'
												},
												{
													validator: this.compareToFirstPassword
												}
											]
										})(
											<Input
												type="password"
												placeholder="请确认密码"
												onBlur={this.handleConfirmBlur}
											/>
										)}
									</Form.Item>
									<Form.Item label="邮箱">
										{getFieldDecorator('email', {
											rules: [{ required: true, message: '请输入邮箱' }]
										})(
											<AutoComplete
												dataSource={EmailOptions}
												onChange={this.handleEmailChange}
												placeholder="请输入邮箱"
											>
												<Input />
											</AutoComplete>
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
															whitespace: true
														}
													]
												})(<Input placeholder="请输入验证码" />)}
											</Col>
											<Col span={8}>
												<Button onClick={this.uploadCode} disabled={this.state.sendStatus}>
													{this.state.sendEmail}
												</Button>
											</Col>

										</Row>
									</Form.Item>

									<Form.Item className="btn">
										<Button type="primary" htmlType="submit">
											立即注册
										</Button>
									</Form.Item>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}
}
const Registers = Form.create({})(Register);

export default Registers;
