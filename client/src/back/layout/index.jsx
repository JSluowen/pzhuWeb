import React, { Component } from 'react';
import { Link } from 'react-router'
import { Avatar, Icon, Menu, Layout, Tooltip } from 'antd';
import "./index.scss"
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,// 是否收缩导航栏
		}
	};
	render() {
		return (
			<div className='back-container'>
				<div className='back-container-layout'>
					<div className='back-container-layout-header'>
						<div className='back-container-layout-header-logo' />
						<div className='back-container-layout-header-menu'>
							<Tooltip title='点击退出登录' placement="bottom"  >
								<Avatar shape="square" size={40} src="http://img.pzhuweb.cn/1555671955194" />
								<span>张三</span>
							</Tooltip>
						</div>
					</div>
					<div className='back-container-layout-body'>
						<div className='back-container-layout-body-aside'>
							<Sider collapsed={this.state.collapsed}>
								<div className='back-container-layout-body-aside-collapsed' onClick={() => { this.setState({ collapsed: !this.state.collapsed }) }} >
									{
										this.state.collapsed ?
											<Icon type="left" />
											:
											<Icon type="right" />
									}
								</div>
								<Menu
									defaultSelectedKeys={['1']}
									defaultOpenKeys={['sub1']}
									mode="inline"
									theme="dark"
									inlineCollapsed={this.state.collapsed}
								>
									<Menu.Item key="1">
										<Icon type="user" />
										<span>
											<Link to='/user'>用户管理</Link>
										</span>
									</Menu.Item>
									<SubMenu
										key="sub1"
										title={
											<span>
												<Icon type="read" />
												<span><Link to='/article'>文章管理</Link></span>
											</span>
										}
									>
										<Menu.Item key="2">
											文章列表
										</Menu.Item>
										<Menu.Item key="3">
											评论列表
										</Menu.Item>
									</SubMenu>
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
