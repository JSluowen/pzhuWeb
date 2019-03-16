import React, { Component } from 'react';
import { Row, Col, Icon, Tooltip, message, Button, Divider, Carousel } from 'antd';
import { Link } from 'react-router';
import './index.scss';
import cn from 'classnames';
export default class Article extends Component {
	state = {
		active: false
	};
	// 点击收藏heart变红
	handleHeart = (event) => {
		event.preventDefault();
		if (!this.state.active) {
			this.setState(
				{
					active: true
				},
				() => {
					message.success('收藏成功');
				}
			);
		} else {
			this.setState(
				{
					active: false
				},
				() => {
					message.warning('取消收藏');
				}
			);
		}
	};
	render() {
		return (
			<div className="article-container">
				<Row>
					<Col span={18}>
						<div className="article-left">
							<div className="carousel">
								<Carousel autoplay>
									<div className="carousel-item">
										<div
											className="carousel-container"
											style={{
												backgroundImage:
													'url(http://cdn.niuxingxing.com/144535sbpfgf7pfis6afhf.jpg)'
											}}
										>
											<div className="shadow" />
											<div className="title">
												<Link to="">这是文章标题</Link>
											</div>
										</div>
									</div>
									<div className="carousel-item">
										<div
											className="carousel-container"
											style={{
												backgroundImage:
													'url(http://cdn.niuxingxing.com/144535sbpfgf7pfis6afhf.jpg)'
											}}
										>
											<div className="shadow" />
											<div className="title">
												<Link to="">这是文章标题</Link>
											</div>
										</div>
									</div>
									<div className="carousel-item">
										<div
											className="carousel-container"
											style={{
												backgroundImage: 'url(http://cdn.niuxingxing.com/1.jpg)'
											}}
										>
											<div className="shadow" />
											<div className="title">
												<Link to="">这是文章标题</Link>
											</div>
										</div>
									</div>
									<div className="carousel-item">
										<div
											className="carousel-container"
											style={{
												backgroundImage: 'url(http://cdn.niuxingxing.com/1.jpg)'
											}}
										>
											<div className="shadow" />
											<div className="title">
												<Link to="">这是文章标题</Link>
											</div>
										</div>
									</div>
								</Carousel>,
							</div>
							{/* 文章列表 */}
							<div className="article-item">
								<div className="article-cover">
									<img src="http://cdn.niuxingxing.com/144535sbpfgf7pfis6afhf.jpg" alt="这是封面图" />
								</div>
								<div className="article-content">
									<div className="article-top">
										<div className="article-title">我是新闻标题我是新闻标题我是新闻标题我是新闻标题</div>
										<div className="article-summary">我是新闻摘要 我是新闻摘要 我是新闻摘要 我是新闻摘要 我是新闻摘要 我是新闻摘要</div>
									</div>
									<div className="article-bottom">
										<Tooltip placement="bottom" title={'阅读量123'}>
											<div className="read-number">
												<Icon type="eye" />
												123
											</div>
										</Tooltip>
										<Tooltip placement="bottom" title={'点击收藏'}>
											<div className="person-collect" onClick={this.handleHeart}>
												<Icon
													type="heart"
													className={cn({ isHeart: this.state.active })}
													theme="filled"
												/>
												2
											</div>
										</Tooltip>
										<Tooltip placement="bottom" title={'访问作者'}>
											<div className="autor">
												<div className="avatar">
													<img src="http://cdn.niuxingxing.com/avatar.jpg" alt="这是用户头像" />
												</div>
												<div className="name">我是作者</div>
											</div>
										</Tooltip>
										<div className="date">
											<Icon type="schedule" />
											2019-2-27
										</div>
									</div>
								</div>
							</div>
							{/* 分页按钮 */}
							<div className="article-pagination">
								<Button type="primary" ghost size="large">
									<Icon type="arrow-left" />
									更新文章
								</Button>
								<Button type="primary" ghost size="large">
									更早文章
									<Icon type="arrow-right" />
								</Button>
							</div>
						</div>
					</Col>
					<Col span={6}>
						<div className="article-right">
							{/* 文章标签 */}

							<div className="label">
								<Divider orientation="left">推荐标签</Divider>
								<div className="label-container">
									<Button ghost>Default</Button>
									<Button ghost>Default</Button>
									<Button ghost>Default</Button>
									<Button ghost>Default</Button>
								</div>
							</div>

							{/* 热门文章推荐 */}
							<div className="hot">
								<Divider orientation="left">热门文章</Divider>
								<div className="article-hot">
									<div className="article-item">
										<div className="title">我是标题我是标题我是标题</div>
										<div className="action">
											<div className="read">
												<Icon type="eye" />
												&nbsp; 2
											</div>
											<div className="comment">
												<Icon type="message" />
												&nbsp; 2
											</div>
										</div>
									</div>
									<div className="article-item">
										<div className="title">我是标题我是标题我是标题</div>
										<div className="action">
											<div className="read">
												<Icon type="eye" />
												&nbsp; 2
											</div>
											<div className="comment">
												<Icon type="message" />
												&nbsp; 2
											</div>
										</div>
									</div>
									<div className="article-item">
										<div className="title">我是标题我是标题我是标题</div>
										<div className="action">
											<div className="read">
												<Icon type="eye" />
												&nbsp; 2
											</div>
											<div className="comment">
												<Icon type="message" />
												&nbsp; 2
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
