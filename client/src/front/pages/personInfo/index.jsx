import React, { Component } from 'react';
import { Form, Input, Button, Cascader, Modal, message, Spin } from 'antd';
import Cropper from '../../components/cropper';
import qiniu from '../../common/qiniu';
import Cookies from '../../../http/cookies';
import PersonAPI from '../../api/person';
import './index.scss';

class Person extends Component {
	constructor(props) {
		super(props);
		this.state = {
			schoolMajorValue: [ '数学与计算机学院', '软件工程' ],
			visible: false,
			src: 'http://img.pzhuweb.cn/2.jpg',
			loading: false
		};
	}
	//保存
	handelSave = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log(values);
			}
		});
	};
	//学院专业搜索过滤
	filter = (inputValue, path) => {
		return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
	};
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false
		});
	};
	//上传头像
	uploadAvatar = (dataBlob) => {
		this.setState({
			loading: true
		});
		qiniu(dataBlob)
			.then((res) => {
				let params = {
					avatar: res.key,
					id: Cookies.getCookies('id')
				};
				PersonAPI.uploadAvatar(params)
					.then((res) => {
						if (res.success) {
							message.success('头像上传成功');
							this.setState({
								src: res.data.avatar,
								visible: false,
								loading: false
							});
						}
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		const schoolMajor = [
			{
				value: '数学与计算机学院',
				label: '数学与计算机学院',
				children: [
					{
						value: '软件工程',
						label: '软件工程'
					},
					{
						value: '计算机科学与技术',
						label: '计算机科学与技术'
					}
				]
			},
			{
				value: '人文学院',
				label: '人文学院',
				children: [
					{
						value: '秘书',
						label: '秘书'
					}
				]
			}
		];

		return (
			<div className="personinfo">
				<div className="personinfo-container">
					<div className="personinfo-container-pageheader">编辑个人信息</div>
					<div className="personinfo-container-context">
						<div className="personinfo-container-context-left">
							<Form layout="inline" className="personinfo-container-context-left-form">
								<Form.Item label="联系方式.">
									{getFieldDecorator('phone', {
										rules: [
											{
												required: true,
												message: '请输入联系方式'
											}
										]
									})(<Input placeholder="请输入联系方式" />)}
								</Form.Item>
								<Form.Item label="学院专业">
									{getFieldDecorator('schoolMajor', {
										initialValue: this.state.schoolMajorValue,
										rules: [
											{
												type: 'array',
												required: true,
												message: '请选择学院专业'
											}
										]
									})(<Cascader showSearch={this.filter} options={schoolMajor} />)}
								</Form.Item>

								<Form.Item label="个人介绍." style={{ minHeight: 120 }}>
									{getFieldDecorator('description', {
										rules: [
											{
												required: true,
												message: '请简单描述下自己'
											}
										]
									})(<textarea cols="50" rows="4" placeholder="请简单描述下自己" />)}
								</Form.Item>
								<Form.Item style={{ alignItems: 'center' }}>
									<Button type="primary" onClick={this.handelSave}>
										保存
									</Button>
									<Button>取消</Button>
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
							<Spin tip="头像上传中..." spinning={this.state.loading} delay='200'>
								<Cropper src={this.state.src} uploadImg={this.uploadAvatar} />
							</Spin>
						</Modal>
					</div>
				</div>
			</div>
		);
	}
}

const Persons = Form.create()(Person);

export default Persons;
