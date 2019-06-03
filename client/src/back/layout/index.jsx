import React, { Component } from 'react';
import { Link } from 'react-router'
import { Avatar, Icon, Menu, Layout, Tooltip } from 'antd';
import { UserAPI } from '../api'
import "./index.scss"
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,// 是否收缩导航栏
			avatar: 'http://img.pzhuweb.cn/1555671955194',//默认头像
			name: '',
			router: [
				'/back/user',
				'/back/article',
				'/back/resource',
				'/back/achievement',
			]
		}
	};
	componentDidMount() {
		this.getadminInfo();
	}
	getadminInfo = () => {
		UserAPI.getadminInfo().then(res => {
			if (res.success) {
				this.setState({
					avatar: res.data[0].avatar,
					name: res.data[0].User.name
				})
			}
		})
	}
	// 退出登录
	logout = () => {
		sessionStorage.removeItem('token');
		this.props.router.push('/')
	}
	// 点击菜单跳转
	selectMenu = (e) => {
		const key = parseInt(e.key);
		this.props.router.push(this.state.router[key]);
	}
	render() {
		return (
			<div className='back-container'>
				<div className='back-container-layout'>
					<div className='back-container-layout-header'>
						<div className='back-container-layout-header-logo' />
						<div className='back-container-layout-header-menu' onClick={this.logout} >
							<Tooltip title='点击退出登录' placement="bottom"  >
								<Avatar size="large" size={40} src={this.state.avatar} />
								<span>{this.state.name}</span>
							</Tooltip>
						</div>
					</div>
					<div className='back-container-layout-body'>
						<div className='back-container-layout-body-aside'>
							<Sider collapsed={this.state.collapsed}>
								<div className='back-container-layout-body-aside-collapsed' onClick={() => { this.setState({ collapsed: !this.state.collapsed }) }} >
									{
										this.state.collapsed ?
											<Icon type="right" />
											:
											<Icon type="left" />
									}
								</div>
								<Menu
								
									mode="inline"
									theme="dark"
									inlineCollapsed={this.state.collapsed}
								>
									<Menu.Item key='0' onClick={this.selectMenu} >
										<Icon type="user" />
										<span>
											用户管理
										</span>
									</Menu.Item>
									<Menu.Item key="1" onClick={this.selectMenu}>
										<Icon type="read" />
										<span>
											文章管理
										</span>
									</Menu.Item>
									<Menu.Item key="2" onClick={this.selectMenu}>
										<Icon type="book" />
										<span>
											资源管理
										</span>
									</Menu.Item>
									<Menu.Item key="3" onClick={this.selectMenu}>
										<Icon type="folder" />
										<span>
											成果管理
										</span>
									</Menu.Item>
								</Menu>
							</Sider>
						</div>
						<div className='back-container-layout-body-main'>
							<div className='back-container-layout-body-main-container'>
								{
									this.props.children
								}
							</div>
						</div>
					</div>
					<div className='back-container-layout-footer'>
						<p>WEB团队官网管理系统</p>
						<p>CopyRight©2017 PZHU-WEB 蜀ICP备17013737号</p>
					</div>
				</div>
			</div>
		)
	}
}
export default Index;
