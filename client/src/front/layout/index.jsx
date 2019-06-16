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
			isHidden: true,
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
	getSonAvatar = (avatar) => {
		this.setState({
			avatar: avatar
		})
	}
	//显示菜单
	avatarShowMenu = (e) => {
		const dom = e.currentTarget.lastChild;
		this.setState({
			isHidden: false
		})
		dom.style.display = 'block';
		setTimeout(() => {
			dom.style.opacity = '1';
		}, 200)
	}
	//隐藏菜单
	avatarHiddenMenu = (e) => {
		const dom = e.currentTarget.lastChild;
		this.setState({
			isHidden:true
		})
		setTimeout(() => {
			if (this.state.isHidden) {
				dom.style.opacity = '0';
				setTimeout(() => {
					dom.style.display = 'none';
				}, 200)
			}
		}, 200)
	}
	ShowMenu = (e) => {
		const dom = e.currentTarget;
		this.setState({
			isHidden: false
		})
		dom.style.opacity = '1';
		dom.style.display = 'block';
	}
	hiddenMenu = (e) => {
		const dom = e.currentTarget;
		this.setState({
			isHidden: true
		})
		setTimeout(() => {
			if (this.state.isHidden) {
				dom.style.opacity = '0';
				setTimeout(() => {
					dom.style.display = 'none';
				}, 200)
			}
		}, 200)
	}
	render() {
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
						{this.state.status ? (
							<div className="nav-bar-right-userinfo" onMouseEnter={this.avatarShowMenu} onMouseLeave={this.avatarHiddenMenu} >
								<Avatar
									className="nav-bar-right-userinfo-avator"
									size={35}
									style={{
										backgroundColor: '#87d068',
									}}
									icon="user"
									src={this.state.avatar}
								/>
								<div className='nav-bar-right-userinfo-menu' onMouseEnter={this.ShowMenu} onMouseLeave={this.hiddenMenu} >
									<div className='nav-bar-right-userinfo-menu-content'>
										<ul className='nav-bar-right-userinfo-menu-content-menu'>
											<li>
												<Link to='user'>
													<Icon type="user" />
													<span>个人主页</span>
												</Link>
											</li>
											<li>
												<Link to='/articleEdit'>
													<Icon type="project" />
													<span>文章发布</span>
												</Link>
											</li>
											<li>
												<Link to="/resourceIssue">
													<Icon type="share-alt" />
													<span>资源发布</span>
												</Link>
											</li>
											<li>
												<Link to="/achievementIssue">
													<Icon type="book" />
													<span>成果发布</span>
												</Link>
											</li>
											<li>
												<a href="javascript:void(0)" onClick={this.handleExit}>
													<Icon type="logout" />
													<span>退出登录</span>
												</a>
											</li>
										</ul>
									</div>
								</div>
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
