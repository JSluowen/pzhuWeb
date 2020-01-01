import React, { Component } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import PageFour from './page-four'
import './index.scss';
import HomeAPI from '../../api/home'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fourPageContent:[]
    }
  }
  componentDidMount(){
    this.getHomeInfo()
  }
  // 获取首页信息
  getHomeInfo(){  
    HomeAPI.getHomeInfo().then(res=>{
      if(res.success){
        this.setState({
          fourPageContent:res.data
        })
      }
    })
  }
  render() {
    const fourePageInfo ={
      title:'团队荣誉',
      desc:'Team Honour',
      content:this.state.fourPageContent
    }
    return (
      <div className="home">
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
                          <img src='http://img.pzhuweb.cn/pagefoutr1.jpeg' alt="" />
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
                          <img src='http://img.pzhuweb.cn/fourpage2.jpeg' alt="" />
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
                  <PageFour {...fourePageInfo} />
                </div>
              </div>
            );
          }} />
      </div>
    );
  }
}
export default Home;
