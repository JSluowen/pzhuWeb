import React, { Component } from 'react';
import { Link } from 'react-router';
import { Avatar, Input, BackTop, Modal, Icon,message } from 'antd';
import Cookies from '../../http/cookies';
import PersonApi from '../api/person';
import './index.scss';

const Search = Input.Search;
const confirm = Modal.confirm;

export default class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: false,
			show: true,
			name:'',
			avatar:'',
			flag:true
		};
	}

	getUserinfo() {
		let id = Cookies.getCookies('id');
		let name = Cookies.getCookies('name');
		PersonApi.getUserinfo({ id: id }).then((res) => {
			this.setState({
				status: true,
				name:name,
			});
			if(res.success){
				this.setState({
					avatar:res.data.avatar
				})
			}else{
				message.warning(res.message)
			}
		});
	}

	componentDidMount() {
		if (sessionStorage.getItem('token')) {
			this.getUserinfo()
		}
	}
	componentWillReceiveProps(props) {
		if (props.location.pathname == '/index') {
			if (sessionStorage.getItem('token')) {
				this.getUserinfo()
			}
		}
	}

	handelShow = () => {
		this.setState({
			show: !this.state.show
		});
	};
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
					show: !_this.state.show
				});
				sessionStorage.removeItem('token');
				_this.props.router.push('/login');
			},
			onCancel() {
				console.log('Cancel');
			}
		});
	};
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
							<div className="nav-bar-menu-item">技术交流</div>
							<div className="nav-bar-menu-item">
								<Link to="/article">文章动态</Link>
							</div>
							<div className="nav-bar-menu-item">成员展示</div>
							<div className="nav-bar-menu-item">成果展示</div>
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
								<Avatar
									className="nav-bar-right-userinfo-avator"
									size={35}
									style={{
										backgroundColor: '#87d068'
									}}
									icon="user"
									src={this.state.avatar}
								/>
								<div className="nav-bar-right-userinfo-name" onClick={this.handelShow}>
									{this.state.name}
									<Icon type="caret-down" />
								</div>
								<div
									className="nav-bar-right-userinfo-content"
									style={this.state.show ? { display: 'none' } : { display: 'block' }}
								>
									<div className="nav-bar-right-userinfo-content-header">
										<div className="nav-bar-right-userinfo-content-header-user">
											<Avatar
												size={43}
												style={{
													backgroundColor: '#87d068'
												}}
												icon="user"
												src={this.state.avatar}
											/>
											<div className="nav-bar-right-userinfo-content-header-user-name">{
												this.state.name
											}</div>
										</div>
										<div className="nav-bar-right-userinfo-content-header-btn">
											<Icon style={{ fontSize: '25px' }} size="large" type="setting" />
										</div>
									</div>
									<div className="nav-bar-right-userinfo-content-body">
										<div className="nav-bar-right-userinfo-content-body-item">
											<div className="nav-bar-right-userinfo-content-body-item-num">1</div>
											<div className="nav-bar-right-userinfo-content-body-item-text">文章</div>
										</div>
										<div className="nav-bar-right-userinfo-content-body-item">
											<div className="nav-bar-right-userinfo-content-body-item-num">1</div>
											<div className="nav-bar-right-userinfo-content-body-item-text">资源</div>
										</div>
										<div className="nav-bar-right-userinfo-content-body-item">
											<div className="nav-bar-right-userinfo-content-body-item-num">1</div>
											<div className="nav-bar-right-userinfo-content-body-item-text">成果</div>
										</div>
									</div>
									<div className="nav-bar-right-userinfo-content-footer">
										<div className="nav-bar-right-userinfo-content-footer-item">
											<Icon type="file-pdf" />
											<span>
												<Link to='/edit'>文章发布</Link>
											</span>
										</div>
										<div className="nav-bar-right-userinfo-content-footer-item">
											<Icon type="file-pdf" />
											<span>成果发布</span>
										</div>
										<div className="nav-bar-right-userinfo-content-footer-item">
											<Icon type="file-pdf" />
											<span>资源分享</span>
										</div>
										<div className="nav-bar-right-userinfo-content-footer-item">
											<Icon type="file-pdf" />
											<span>个人收藏</span>
										</div>
										<div className="nav-bar-right-userinfo-content-footer-item">
											<Icon type="file-pdf" />
											<span>回收站</span>
										</div>
										<div
											className="nav-bar-right-userinfo-content-footer-item"
											onClick={this.handleExit}
										>
											<Icon type="file-pdf" />
											<span>退出登录</span>
										</div>
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
