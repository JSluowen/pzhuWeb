import React, { Component } from 'react';
import { Form, Button, Input, AutoComplete, message, Spin } from 'antd';
import md5 from 'md5';
import LoginAPI from '../../api/login';
import RegisterAPI from '../../api/register';
import './forget.scss';
import Cookies from '../../../http/cookies';

// 自动完成
const AutoCompleteOption = AutoComplete.Option;

class Forget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '1291962779@qq.com',
			autoCompleteResult: [],
			show: true,
			loading: false,
			sendEmail: '发送验证码',
			sendStatus: false, //邮件按钮点击状态
			code: '' //验证码
		};
	}
	// 邮箱提示格式
	handleEmailChange = (value) => {
		let autoCompleteResult;
		if (!value || value.indexOf('@') >= 0) {
			autoCompleteResult = [];
		} else {
			autoCompleteResult = [ '@gmail.com', '@163.com', '@qq.com', '@aliyun.com' ].map(
				(domain) => `${value}${domain}`
			);
		}
		this.setState({ autoCompleteResult });
	};
	// 密码验证
	validatorPassword = (rule, value, callback) => {
		let patt = /(?=.*\d)(?=.*[a-zA-Z])^.{6,10}$/;
		console.log(patt.test(value));
		if (patt.test(value) || !value) {
			callback();
		} else {
			callback('密码需要在6-10位之间并包含字母和数字');
		}
	};
	//点击下一步，验证信息是否存在
	handelNext = () => {
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				values['passwords'] = md5(values.passwords);
				this.setState({ loading: true });
				LoginAPI.forgetPassword(values).then((res) => {
					if (res.success) {
						this.setState({
							email: values.emails,
							show: false,
							loading: false
						});
					} else {
						message.warning(res.message);
						this.setState({
							loading: false
						});
					}
				});
			}
		});
	};
	//发送邮箱验证码
	uploadCode = (e) => {
		if (this.state.email === '') {
			message.warning('邮箱不存在，请返回上一步');
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
			email: this.state.email
		};
		RegisterAPI.uploadCode(params)
			.then((res) => {
				if (res.success) {
					message.success(res.message);
				}
			})
			.catch((err) => {
				clearInterval(clearnTime);
				this.setState({
					sendEmail: '重新发送',
					sendStatus: false
				});
			});
	};

	//保存修改
	handelSave = () => {
		if (this.state.code === '') {
			message.warning('请输入验证码');
			return;
		}
		this.setState({
			loading:true
		})
		LoginAPI.changePassword({ code: this.state.code }).then((res) => {
			if (res.success) {
				message.success('修改成功');
				this.setState({
					loading:false
				})
				this.props.visible(false)
			} else {
				this.setState({
					loading:false
				})
				message.warning(res.message);
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		// 邮箱自动补全
		const EmailOptions = this.state.autoCompleteResult.map((Email) => (
			<AutoCompleteOption key={Email}>{Email}</AutoCompleteOption>
		));
		return (
			<Spin spinning={this.state.loading}>
				<div className="forget">
					<div className="forget-container">
						{this.state.show ? (
							<div>
								<Form
									className="forget-container-form"
									labelCol={{ span: 6 }}
									wrapperCol={{ span: 14 }}
									layout="inline"
								>
									<Form.Item label="学号">
										{getFieldDecorator('ids', {
											rules: [ { required: true, message: '请输入学号' } ]
										})(<Input placeholder="请输入学号" />)}
									</Form.Item>
									<Form.Item label="邮箱">
										{getFieldDecorator('emails', {
											rules: [ { required: true, message: '请输入邮箱' } ]
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
									<Form.Item label="新密码">
										{getFieldDecorator('passwords', {
											rules: [
												{ required: true, message: '请输入密码' },
												{
													validator: this.validatorPassword
												}
											]
										})(<Input type="password" placeholder="请输入密码" />)}
									</Form.Item>
								</Form>
							</div>
						) : (
							<div className="forget-container-email">
								<Input
									placeholder="请输入验证码"
									onChange={(e) => {
										this.state.code = e.target.value;
									}}
								/>
								<Button
									onClick={this.uploadCode}
									disabled={this.state.email == '' || this.state.sendStatus}
									type="dashed"
								>
									{this.state.sendEmail}
								</Button>
							</div>
						)}
					</div>
					<div className="forget-btn">
						{this.state.show ? (
							<Button type="primary" onClick={this.handelNext}>
								下一步
							</Button>
						) : (
							<div>
								<Button
									onClick={() => {
										this.setState({ show: true });
									}}
								>
									上一步
								</Button>
								<Button onClick={this.handelSave} type="primary" style={{ marginLeft: '10px' }}>
									确认修改
								</Button>
							</div>
						)}
					</div>
				</div>
			</Spin>
		);
	}
}

const Forgets = Form.create()(Forget);

export default Forgets;
