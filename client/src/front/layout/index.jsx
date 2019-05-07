import React, { Component } from 'react';
import { Link } from 'react-router';
import { Avatar, Input, BackTop, Modal, Menu, Icon, Dropdown, message, Button } from 'antd';
import Cookies from '../../http/cookies';
import PersonApi from '../api/person';
import './index.scss';

const Search = Input.Search;
const confirm = Modal.confirm;
const ButtonGroup = Button.Group;
export default class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: false,
			avatar: 'http://img.pzhuweb.cn/443625372.jpeg',
			flag: true,
		};
	}

	getUserinfo() {
		let id = Cookies.getCookies('id');
		PersonApi.getUserinfo({ id: id }).then((res) => {
			this.setState({
				status: true
			});
			if (res.success) {
				this.setState({
					avatar: res.data.avatar
				});
			} else {
				message.warning(res.message);
			}
		});
	}

	componentDidMount() {
		if (sessionStorage.getItem('token')) {
			this.getUserinfo();
		}
	}
	componentWillReceiveProps(props) {
		if (props.location.pathname == '/index') {
			if (sessionStorage.getItem('token')) {
				this.getUserinfo();
			}
		}
	}
	//退出登录
	handleExit = () => {
		let _this = this;
		confirm({
			title: '确认提示',
			content: '是否确认退出当前账号？',
			okText: '退出',
			cancelText: '取消',
			onOk() {
				_this.setState({
					status: !_this.state.status,
				});
				sessionStorage.removeItem('token');
				_this.props.router.push('/login');
			},
			onCancel() {
				console.log('Cancel');
			}
		});
	};
	//文章，资源，成果选择
	handleMenuClick = (value) => {

	}
	getSonAvatar=(avatar)=>{
		this.setState({
			avatar:avatar
		})
	}
	render() {
		const menu = (
			<Menu onClick={this.handleMenuClick}>
				<Menu.Item key="1">
					<Link to='/resourceIssue'>资源分享</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link to='/achievementIssue'>成果发布</Link>
				</Menu.Item>
			</Menu>
		);


		return (
			<div className="container">
				{/* 回到顶部 */}
				<BackTop visibilityHeight={100} />

				<div className="nav-bar">
					<div className="nav-bar-left">
						<a className="app-logo" href="/" target="_self">
							Web应用专业团队
						</a>
						<div className="nav-bar-menu">

							<div className="nav-bar-menu-item">
								<Link to="/article" activeClassName="active">
									文章动态
								</Link>
							</div>
							<div className="nav-bar-menu-item">
								<Link to='/resource' activeClassName='active' >
									资源分享
								</Link>
							</div>
							<div className="nav-bar-menu-item">
								<Link to='/achievement' activeClassName='active' >
									成果展示
								</Link>
							</div>
							<div className="nav-bar-menu-item">
								<Link to='/member' activeClassName="active">
									成员展示
								</Link>
							</div>
						</div>
					</div>
					<div className="nav-bar-right">
						<Search
							className="nav-bar-right-search"
							placeholder="input search text"
							onSearch={(value) => console.log(value)}
							style={{
								width: 200
							}}
						/>


						{this.state.status ? (
							<div className="nav-bar-right-userinfo">
								<ButtonGroup style={{ marginRight: '20px' }}>
									<Button type='primary' ghost >文章发布</Button>
									<Dropdown overlay={menu}>
										<Button type='primary' ghost icon="down" >
										</Button>
									</Dropdown>

								</ButtonGroup>
								<Link to='user'>
									<Avatar
										className="nav-bar-right-userinfo-avator"
										size={35}
										style={{
											backgroundColor: '#87d068',
										}}
										icon="user"
										src={this.state.avatar}
									/>
								</Link>
								<p onClick={this.handleExit}>注销</p>
							</div>
						
						) : (
								<div className="nav-bar-right-user">
									<div className="login">
										<Link to="login">登录</Link>
									</div>
									/
								<div className="register">
										<Link to="register">注册</Link>
									</div>
								</div>
							)}
					</div>
				</div>
				<div className="content">{this.props.children}</div>
				
				<div className="pzhu-web-copyright">
					<div className="copyright">
						<div className="about-us">
							<Link to="/">关于我们</Link>
							<Link to="/">联系我们</Link>
							<Link to="/">加入我们</Link>
						</div>
						<div className="link-wrap">
							<a href="">论坛</a>
							<a href="">论坛</a>
							<a href="">论坛</a>
							<a href="">论坛</a>
							<a href="">二手市场</a>
							<a href="">二手市场</a>
							<a href="">二手市场</a>
							<a href="">二手市场</a>
							<a href="">二手市场</a>
							<a href="">二手市场</a>
						</div>
						<p className="web-auth">地址：攀枝花市东区机场路10号</p>
						<p className="web-auth">联系方式：lanquanxiang@gmail.com</p>
						<p className="web-auth">
							© 2017-2019 pzhuweb.cn 版权所有
							<img
								src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
								style={{
									width: '20px'
								}}
							/>
							ICP认证：蜀17013737
						</p>
					</div>
				</div>
			</div>
		);
	}
}
