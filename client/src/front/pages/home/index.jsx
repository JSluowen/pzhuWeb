import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactFullpage from '@fullpage/react-fullpage';
import './index.scss';

const Fullpage = () => (
	<ReactFullpage
		navigation
		loopBottom="true"
		loopTop="true"
		controlArrows="true"
		sectionsColor={["#282c34"]}
		render={({ state, fullpageApi }) => {
			return (
				<div>
					<div className="section">
						<div className="home-fullpageFive" style={{ backgroundImage: 'url(http://img.pzhuweb.cn/10.png)' }}>
							<div className='home-fullpageFive-container'>
								<div className='home-fullpageFive-container-top'>
									<div className='home-fullpageFive-container-top-title'>你的梦想，从这里开始</div>
									<div className='home-fullpageFive-container-top-tips'>WEB应用专业团队，欢迎你的加入！</div>
									{
										sessionStorage.getItem('token') ?
											''
											:
											<a href='http://www.pzhuweb.cn/#/articleInfo/109'>
												团队介绍
                                	</a>
									}
								</div>
								<div className='home-fullpageFive-container-footer'>
									CopyRight©2017 PZHU-WEB 蜀ICP备17013737号
								</div>
							</div>
						</div>

					</div>
					{/* <div className="section">
						<div className="home-fullpageOne">
							<div className="home-fullpageOne-left">
								<div
									className="home-fullpageOne-left-bgImg"
									style={{
										backgroundImage: 'url(http://img.pzhuweb.cn/05.jpg)'
									}}></div>
							</div>
							<div className="home-fullpageOne-right">
								<div className='home-fullpageOne-right-container'>
									<p className='home-fullpageOne-right-container-title'>
										你的梦想，从这里开始
                                </p>
									<p className='home-fullpageOne-right-container-context'>
										乐人发行，数字音乐全球发行计划 免费数字音乐发行渠道，遍布全球80多个国家，覆盖100多个优质音乐视听平台的数字音乐发行体系
										将音乐交给我们，我们会让TA唱响全世界每一个角落
                                </p>									
									{
										sessionStorage.getItem('token') ?
											''
											:
											<Link to='/register' className='home-fullpageOne-right-container-apply'>
												申请加入
                                	</Link>
									}

								</div>
							</div>
						</div>
					</div>
					 */}
					<div className="section">
						<div className="home-fullpageTwo">
							<div className="home-fullpageTwo-right">
								<div className='home-fullpageTwo-right-container'>
									<p className='home-fullpageTwo-right-container-title'>
										团队介绍
                                </p>
									<p className='home-fullpageTwo-right-container-context'>
										基础知识和算法研究，WEB 前端开发，JavaEE后台开发三个方向。平时主要以小组为单位开展以任务为驱动的社团活动，另外定期或不定期开展学习研究讨论会。
										团队还以学院教师的科研项目、教研教改项目、大学生创新创业项目等作为基础。开展一些综合性项目开发和实践锻炼。
                                </p>
								</div>
							</div>
							<div className="home-fullpageTwo-left">
								<div
									className="home-fullpageTwo-left-bgImg"
									style={{
										backgroundImage: 'url(http://img.pzhuweb.cn/02.jpg)'
									}}></div>
							</div>
						</div>
					</div>
					<div className="section">
						<div className="home-fullpageThree">
							<div className='home-fullpageThree-header'>
								<span>研究方向</span>
								<span>Research Interests</span>
							</div>
							<div className='home-fullpageThree-body'>
								<div className='home-fullpageThree-body-front'>
									<div className='home-fullpageThree-body-front-img'>
										<img src='http://img.pzhuweb.cn/08.jpg' alt="" />
									</div>
									<div className='home-fullpageThree-body-front-context'>
										<div className='home-fullpageThree-body-front-context-title'>
											前端开发技术
                                    </div>
										<div className='home-fullpageThree-body-front-context-desc'>
											掌握HTML，CSS，JavaScript三大基础知识，
											学习Node.js搭建后台服务，学习框架Vue或者React，以及它们的全家桶，
											能够进行单页面应用开发。最后学会webpack打包协议，能够独立构建项目。
										</div>
									</div>
								</div>
								<div className='home-fullpageThree-body-back'>
									<div className='home-fullpageThree-body-back-img'>
										<img src='http://img.pzhuweb.cn/07.jpg' alt="" />
									</div>
									<div className='home-fullpageThree-body-back-context'>
										<div className='home-fullpageThree-body-back-context-title'>
											后台开发技术
                                    </div>
										<div className='home-fullpageThree-body-back-context-desc'>
											掌握Java的基本知识，学习mysql数据库，能够通过Java提供的API访问数据库，并对数据库进行操作,
											学习JSP、Servlet，能够通过JSP和Servlet完成一个简单的小demo,
											学习基本框架：Spring、Mybatis、Hibernate、SpringMVC等。
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="section">
						<div className="home-fullpageFour">
							<div className='home-fullpageFour-header'>
								<span>我们的成果</span>
								<span>Our Achievement</span>
							</div>
							<div className='home-fullpageFour-body'>
								<div className='home-fullpageFour-body-item'
									style={{
										backgroundImage: 'url(http://img.pzhuweb.cn/home1.png)'
									}}>
									<div
										className='home-fullpageFour-body-item-desc'
										onMouseLeave={(e) => {
											if (e.target.tagName == 'DIV') {
												e.target.style.opacity = '0';
											}
										}}
										onMouseEnter={(e) => {
											if (e.target.tagName == 'DIV') {
												e.target.style.opacity = '1';
											}
										}}>
										<span>《音乐播放器》</span>
										<span>任云宏</span>
									</div>
								</div>
								<div className='home-fullpageFour-body-item'
									style={{
										backgroundImage: 'url(http://img.pzhuweb.cn/home2.png)'
									}}>
									<div
										className='home-fullpageFour-body-item-desc'
										onMouseLeave={(e) => {
											if (e.target.tagName == 'DIV') {
												e.target.style.opacity = '0';
											}
										}}
										onMouseEnter={(e) => {
											if (e.target.tagName == 'DIV') {
												e.target.style.opacity = '1';
											}
										}}>
										<span>《转角咖啡店》</span>
										<span>罗文</span>
									</div>
								</div>
								<div className='home-fullpageFour-body-item'
									style={{
										backgroundImage: 'url(http://img.pzhuweb.cn/home3.png)'
									}}>
									<div
										className='home-fullpageFour-body-item-desc'
										onMouseLeave={(e) => {
											if (e.target.tagName == 'DIV') {
												e.target.style.opacity = '0';
											}
										}}
										onMouseEnter={(e) => {
											if (e.target.tagName == 'DIV') {
												e.target.style.opacity = '1';
											}
										}}>
										<span>《自由世界》</span>
										<span>姚添译</span>
									</div>
								</div>
								<div className='home-fullpageFour-body-item'
									style={{
										backgroundImage: 'url(http://img.pzhuweb.cn/home4.png)'
									}}>
									<div
										className='home-fullpageFour-body-item-desc'
										onMouseLeave={(e) => {
											if (e.target.tagName == 'DIV') {
												e.target.style.opacity = '0';
											}
										}}
										onMouseEnter={(e) => {
											if (e.target.tagName == 'DIV') {
												e.target.style.opacity = '1';
											}
										}}>
										<span>《小红帽》</span>
										<span>寇国钊</span>
									</div>
								</div>

							</div>


						</div>
					</div>

				</div>
			);
		}} />
);
class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<div className="home">
				<Fullpage />
			</div>
		);
	}
}
export default Home;
