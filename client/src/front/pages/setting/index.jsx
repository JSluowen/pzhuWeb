import React, { Component } from 'react'
import { Form, Input, Button, Cascader, Modal, message, Spin } from 'antd'
import Cropper from '../../components/cropper'
import qiniu from '../../common/qiniu'
import Cookies from '../../../http/cookies'
import PersonAPI from '../../api/person'
import './index.scss'


class Setting extends Component {
	constructor(props) {
		super(props)
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
	//初始化信息搜索过滤
	filter = (inputValue, path) => {
		return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
	}
	handleCancel = (e) => {
		this.setState({
			visible: false
		})
	}
	componentWillMount() {
		this.getInitMessage();
	}
	// 初始化获取
	getInitInfo = () => {
		PersonAPI.getInitInfo({}).then(res => {
			if (res.success) {
				let { setFieldsValue } = this.props.form;
				setFieldsValue({ "phone": res.data.phone })
				setFieldsValue({ "description": res.data.description })
				this.setState({
					src: res.data.avatar || this.state.src,
					initSchoolMajor: [res.data.School.id, res.data.Major.id],
					initDomain: [res.data.Domain.id]
				})

			} else {
				message.warning('请立即完善个人信息')
			}
		})
	}
	//获取初始信息：学院专业，研究方向
	getInitMessage = () => {
		PersonAPI.getInitMessage().then((res) => {
			if (res.success) {
				this.setState({
					schoolMajor: res.data.schoolmajor,
					domain: res.data.domain
				}, () => {
					this.getInitInfo()
				});

			}
		})
	}

	//base64转换成Blob对象
	dataURLtoBlob = (dataurl) => {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	};
	//上传头像
	uploadAvatar = (dataUrl) => {
		this.setState({
			src: dataUrl,
			visible: false,
		})
	}
	//保存用户信息
	handelSave = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading: true
				})
				// 判断图片资源是本地的,还是第三方资源链接
				var strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
				var re = new RegExp(strRegex);
				if (!re.test(this.state.src)) {
					let dataBlob = this.dataURLtoBlob(this.state.src);
					qiniu(dataBlob)
						.then((res) => {
							values.avatar = res.key;
							values.status = 1;
							PersonAPI.uploadUserInfo(values).then((res) => {
								if (res.success) {
									this.setState({
										loading: false
									})
									message.success('信息保存成功');
									this.props.router.push('/user');
								}
							})
						})
						.catch((err) => {
							console.log(err)
						})
				}
				else {
					values.avatar = this.state.src;
					values.status = 0;
					PersonAPI.uploadUserInfo(values).then((res) => {
						if (res.success) {
							this.setState({
								loading: false
							})
							message.success('信息保存成功');
							this.props.router.push('/user');
						}
					})
				}


			}
		})
	}
	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<div className="personinfo">
				<div className="personinfo-container">
					<div className="personinfo-container-pageheader">编辑个人信息</div>
					<Spin tip="个人信息上传中" spinning={this.state.loading} delay="200">
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
											initialValue: this.state.initSchoolMajor,
											rules: [
												{
													type: 'array',
													required: true,
													message: '请选择学院专业'
												},
											],

										})(
											<Cascader
												placeholder="请选择学院专业"
												showSearch={this.filter}
												options={this.state.schoolMajor}
											/>
										)}
									</Form.Item>
									<Form.Item label="研究方向">
										{getFieldDecorator('domain', {
											initialValue: this.state.initDomain,
											rules: [
												{
													type: 'array',
													required: true,
													message: '请选择研究方向'
												}
											]
										})(
											<Cascader
												placeholder="请选择研究方向"
												showSearch={this.filter}
												options={this.state.domain}
											/>
										)}
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
									</Form.Item>
								</Form>
							</div>
							<div className="personinfo-container-context-right">
								<div className="personinfo-container-context-right-avatar">
									<img src={this.state.src} alt="" />
								</div>
								<Button
									onClick={() => {
										this.setState({ visible: true })
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
		)
	}
}

const Settings = Form.create()(Setting);

export default Settings;
