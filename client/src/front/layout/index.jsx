import React, { Component } from 'react';
import { Link } from 'react-router';
import { Avatar, Input, Button, BackTop } from 'antd';
import ReactFullpage from '@fullpage/react-fullpage';

import './index.scss';
import './override.scss';
const Search = Input.Search;
class HeadInfo extends React.Component {
	render() {
		const status = false;
		const user = 'Name';
		return (
			<div className="section headInfo">
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
						/>{' '}
						{status ? (
							<Avatar
								className="nav-bar-right-avator"
								size="large"
								style={{
									backgroundColor: '#87d068'
								}}
								icon="user"
							/>
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
				<div className="fullpage-content">
					<div className="tempDiv">
						<div className="img" style={{ backgroundImage: `url(http://cdn.niuxingxing.com/2.jpg)` }}>
							{/* <img height='550px' src={require('../pages/home/banner1.jpg')}/> */}
						</div>
					</div>
					<div className="information">
						<h1 className="title">Web应用专业团队</h1>
						<p>
							比如淘宝，要求店铺主上传产品封面图片是正方形的，为什么，因为图片宝贝展示列表都是正方形的排版布局，这样要求上传合适正方形宝贝封面图片，也是让图片不变形。所以有条件的情况下，大家将首页、图片列表页的布局宽度高度保持一致，上传图片时候将图片先进行处理为布局宽度高度时等比例放大尺寸的。第二种，使用CSS
							max-width和max-height实现图片自动等比例缩小很简单我们要使用到max-width和max-height,这样即可设置对象图片最大宽度和最大高度，这样图片就会等比例缩放图片，然图片相对不变形清晰。以下DIVCSS5通过实例对比方法让大家掌握CSS控制图片缩小不变形技巧。
						</p>
					</div>
				</div>
			</div>
		);
	}
}
class TeamInfo extends React.Component {
	render() {
		const data = this.props.data;
		return (
			<div className="section">
				<img src={data.imgUrl} />
				<h3>{data.title}</h3>
				<p>{data.content} </p>
			</div>
		);
	}
}

const Fullpage = (props) => (
	<ReactFullpage
		navigation
		loopBottom="true"
		loopTop="true"
		controlArrows="true"
		sectionsColor={[ '#282c34', '#ff5f45', '#0798ec', '#abcdef' ]}
		render={({ state, fullpageApi }) => {
			const teamInfo = props.teamInfo;

			return (
				<div>
					<HeadInfo />
					{teamInfo.map((v, i) => {
						return <TeamInfo data={v} key={i} />;
					})}
					<div className="section ">
						<Button type="primary">home</Button>
						<div>
							<div className="slide fp-noscroll">
								<video data-keepplaying autoPlay loop>
									<source
										data-src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
										type="video/mp4"
									/>
								</video>{' '}
							</div>
							<div className="slide"> 222 </div>
							<div className="slide"> 3123333333 </div>
						</div>
					</div>
				</div>
			);
		}}
	/>
);

export default class Layout extends Component {
	state = {
		status: false,
		teamInfo: [
			{
				imgUrl:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552618271468&di=9f907d8da9a161a73035c002f80ba32a&imgtype=0&src=http%3A%2F%2Fp4.so.qhmsg.com%2Ft01355bda5988c43034.jpg',
				title: 'team',
				content: 'web专业应用团队'
			},
			{
				imgUrl:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552618271468&di=9f907d8da9a161a73035c002f80ba32a&imgtype=0&src=http%3A%2F%2Fp4.so.qhmsg.com%2Ft01355bda5988c43034.jpg',
				title: 'team',
				content: 'web专业应用团队'
			},
			{
				imgUrl:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552618271468&di=9f907d8da9a161a73035c002f80ba32a&imgtype=0&src=http%3A%2F%2Fp4.so.qhmsg.com%2Ft01355bda5988c43034.jpg',
				title: 'team',
				content: 'web专业应用团队'
			},
			{
				imgUrl:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552618271468&di=9f907d8da9a161a73035c002f80ba32a&imgtype=0&src=http%3A%2F%2Fp4.so.qhmsg.com%2Ft01355bda5988c43034.jpg',
				title: 'team',
				content: 'web专业应用团队'
			}
		]
	};

	render() {
		return (
			<div className="container">
				<Fullpage teamInfo={this.state.teamInfo} />
			</div>
		);
	}
}
