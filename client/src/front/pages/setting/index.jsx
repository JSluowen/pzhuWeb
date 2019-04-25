import React, { Component } from 'react'
import { Form, Input, Button, Cascader, Modal, message, Spin } from 'antd'
import Cropper from '../../components/cropper'
import qiniu from '../../common/qiniu'
import Cookies from '../../../http/cookies'
import PersonAPI from '../../api/person'
import './index.scss'

const confirm = Modal.confirm

class Setting extends Component {
	constructor(props) {
		super(props)
		this.state = {
			defaultSchoolMajor:[],
			visible: false,
			src: 'http://img.pzhuweb.cn/2.jpg',
			loading: false,
			schoolMajor: [],
			phone:'',
			introduction:''

		}
	}
	//学院专业搜索过滤
	filter = (inputValue, path) => {
		return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
	}
	handleCancel = (e) => {
		console.log(e)
		this.setState({
			visible: false
		})
	}
	componentWillMount() {
		this.selectSchoolMajor()
	}
	//获取学院专业
	selectSchoolMajor = () => {
		PersonAPI.selectSchoolMajor().then((res) => {
			if (res.success) {
				this.setState({
					schoolMajor: res.data.schoolmajor
				})
			}
		})
	}
	//上传头像
	uploadAvatar = (dataBlob) => {
		this.setState({
			loading: true
		})
		qiniu(dataBlob)
			.then((res) => {
				let params = {
					avatar: res.key,
					id: Cookies.getCookies('id')
				}
				PersonAPI.uploadAvatar(params).then((res) => {
					if (res.success) {
						message.success('头像上传成功')
						this.setState({
							src: res.data.avatar,
							visible: false,
							loading: false
						})
					}
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}
	//保存用户信息
	handelSave = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				values.id = Cookies.getCookies('id');
				PersonAPI.uploadUserInfo(values).then((res) => {
					if (res.success) {
						message.success('保存成功');
					}
				})
			}
		})
	}
	//取消用户信息修改
	cancelSave=(e)=>{
		let that = this
		confirm({
			title: '修改未保存',
			content: '修改的信息尚未保存，是否保存后离开？',
			okText: '保存',
			cancelText: '取消',
			onOk() {
				that.handelSave(e)
			},
			onCancel() {
				that.props.router.push('/index')
			},
		  })
	}
	render() {
		const { getFieldDecorator } = this.props.form
		const {getFieldsValue} = this.props.form
		const valuesChange = getFieldsValue(['phone','schoolMajor','description'])
		console.log(valuesChange)
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
									})(<Input placeholder="请输入联系方式"  />)}
								</Form.Item>
								<Form.Item label="学院专业">
									{getFieldDecorator('schoolMajor', {
										initialValue: this.state.defaultSchoolMajor,
										rules: [
											{
												type: 'array',
												required: true,
												message: '请选择学院专业'
											}
											
										]
									})(
										<Cascader
											placeholder="请选择学院专业"
											showSearch={this.filter}
											options={this.state.schoolMajor}
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
									<Button onClick={this.cancelSave} disabled={
										(valuesChange.phone===undefined||valuesChange.phone==='')&&
										(valuesChange.schoolMajor === undefined ||valuesChange.schoolMajor.length===0)&&
										(valuesChange.description===undefined||valuesChange.description==='')?true:false
									} >取消</Button>
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
							<Spin tip="头像上传中..." spinning={this.state.loading} delay="200">
								<Cropper src={this.state.src} uploadImg={this.uploadAvatar} />
							</Spin>
						</Modal>
					</div>
				</div>
			</div>
		)
	}
}

const Settings = Form.create()(Setting);

export default Settings;
