import React, { Component } from 'react';
import {Link,browserHistory } from 'react-router'
import "./index.scss"
// const { SubMenu } = Menu;
// const { Header, Content, Sider } = Layout;


import {
	Layout, Menu, Breadcrumb, Icon,
  } from 'antd';
  
  const {
	Header, Content, Footer, Sider,
  } = Layout;
  const SubMenu = Menu.SubMenu;
  
  class index extends Component {
	  constructor(props){
		  super(props);
		  this.state={
			collapsed: false,
			struct:{
						menber:[
								{title:"申请列表",route:"/apply",},
								{title:"全员信息",route:"/menberlist",},
								{title:"成员分布",route:"/distribution",},
						] ,
						article:[
								{title:"所有文章",route:"/articles"},
								{title:"置顶文章",route:"/articles"},
								{title:"推送设置",route:"/articles"},

						],
						resource:[
								{title:"首页轮播图管理",route:"/resultlist"},
								{title:"文章管理",route:"/articles"},
								{title:"成果管理",route:"/articles"},
						],
						analysis:[
						{title:"成员分析",route:"/menber_analysis"},
						{title:"成果分析",route:"/result_analysis"},
						{title:"时间轴",route:"/time_analysis"},
						]
						,
						Pathname:'home'
				}
		};
	}
	
  
	onCollapse = (collapsed) => {
	  console.log(collapsed);
	  this.setState({ collapsed });
	}
  
	render() {
		const {menber,resource} = this.state.struct;
	  return (
		<Layout style={{ minHeight: '100vh' }}>
		  <Sider
			collapsible
			collapsed={this.state.collapsed}
			onCollapse={this.onCollapse}
		  >
			<div className="logo"/>
			<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
			  
			  <Menu.Item key="2">
				<Icon type="desktop" />
				<span>Option 2</span>
			  </Menu.Item>
			  {/* 成员管理 */}
				<SubMenu
					key="menber"
					title={
						<span>
							<Icon type="user" />成员管理</span>
					}
				>
				{menber && menber.map((Item,key)=>{
					return (<Menu.Item key={`menber${key}`}><Link to = {Item.route}>{Item.title}</Link></Menu.Item>);
				})}
				</SubMenu>
			  <SubMenu
				key="user"
				title={<span><Icon type="user" /><span>User</span></span>}
			  >
				<Menu.Item key="3">Tom</Menu.Item>
				<Menu.Item key="4">Bill</Menu.Item>
				<Menu.Item key="5">Alex</Menu.Item>
			  </SubMenu>
			  <SubMenu
				key="sub2"
				title={<span><Icon type="team" /><span>Team</span></span>}
			  >
				<Menu.Item key="6">Team 1</Menu.Item>
				<Menu.Item key="8">Team 2</Menu.Item>
			  </SubMenu>
			  {/* 资源管理，包括，轮播图管理、文章置顶、新闻置顶以及增删查改、评论管理 */}
			  <SubMenu
				key="file"
				title={<span><Icon type="file" /><span>资源管理</span></span>}
			  >
				{
						resource && resource.map((item,key)=>{
							return (<Menu.Item key={`resource${key}`}>
											<Link to={item.route}><Icon type="file" /><span>{item.title}</span></Link>
										</Menu.Item>);
						})
				}
			  <Menu.Item key="">
				<Icon type="file" />
				<span>资源管理</span>
			  </Menu.Item>
			  
			  </SubMenu>
			  
			  {/* 统计分析，数据可视化 */}
			  <Menu.Item key="statistic">
				<Icon type="pie-chart" />
				<span>统计分析</span>
			  </Menu.Item>
			</Menu>
		  </Sider>
		  <Layout>
			<Header style={{ background: '#fff', padding: 0 }} />
			<Content style={{ margin: '0 16px' }}>
			  <Breadcrumb style={{ margin: '16px 0' }}>
				<Breadcrumb.Item>User</Breadcrumb.Item>
				<Breadcrumb.Item>Bill</Breadcrumb.Item>
			  </Breadcrumb>
			  {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
				Bill is a cat.
			  </div> */}
			  {this.props.children}
			</Content>
			<Footer style={{ textAlign: 'center' }}>
			  pzhuweb Back Design ©2019 Created by PZHUWEB Team
			</Footer>
		  </Layout>
		</Layout>
	  );
	}
  }
   export default index;




// 2019-4-23 前布局 old
// class index extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
//             menber:[
//                 {title:"申请列表",route:"/apply",},
//                 {title:"全员信息",route:"/menberlist",},
//                 {title:"成员分布",route:"/distribution",},
//            ] ,
//            article:[
//                {title:"所有文章",route:"/articles"},
//                {title:"置顶文章",route:"/articles"},
//                {title:"推送设置",route:"/articles"},

//            ],
//            achievements:[
//                 {title:"所有成果",route:"/resultlist"},
//                 {title:"上传成果",route:"/articles"},
//                 {title:"成果统计",route:"/articles"},
//            ],
//            analysis:[
//             {title:"成员分析",route:"/menber_analysis"},
//             {title:"成果分析",route:"/result_analysis"},
//             {title:"时间轴",route:"/time_analysis"},
//            ]
//            ,
//            Pathname:'home'
//         };
//     }
//     componentDidMount(){
//         // console.log(browserHistory.getCurrentLocation());
//     }
//     handle=()=>{
//         this.setState({Pathname:browserHistory.getCurrentLocation().hash})
//         // console.log(browserHistory.getCurrentLocation().hash);
//     }
// 	render() {
//         const  {menber,article,achievements,analysis,Pathname} = this.state; 
// 		return (
// 			<Layout>
                
// 				<Layout>
                
// 					<Sider width={200} height = {800} theme={"light"} style={{ background: '#abcdef',paddingTop:"30"}} onClick={this.handle}>
//                         <div><a style={{height:"30px",lineHeight:"30px"}}>Web Team controller</a></div>
//                         <Menu
// 							mode="inline"
// 							defaultSelectedKeys={[  ]}
// 							defaultOpenKeys={[ 'menber','article' ]}
// 							style={{ height: '100%', borderRight: 0 ,backgroundColor:"#abcdef"}}
// 						>
//                         {/* 成员管理 */}
// 							<SubMenu
// 								key="menber"
// 								title={
// 									<span>
// 										<Icon type="user" />成员管理</span>
// 								}
// 							>
//                             {menber && menber.map((Item,key)=>{
//                                 return (<Menu.Item key={`menber${key}`}><Link to = {Item.route}>{Item.title}</Link></Menu.Item>);
//                             })}
								
								
// 							</SubMenu>
//                             {/* 文章管理 */}
// 							<SubMenu
// 								key="article"
// 								title={
// 									<span>
// 										<Icon type="laptop" />文章管理
// 									</span>
// 								}
// 							>
// 								{article && article.map((item,key)=>{
//                                     return (<Menu.Item key={`article${key}`}><Link to = {item.route}>{item.title}</Link></Menu.Item>);
//                                 })}
								
// 							</SubMenu>
// 							{/* 成果管理 */}
//                             <SubMenu
// 								key="achievements"
// 								title={
// 									<span>
// 										<Icon type="notification" />成果管理
// 									</span>
// 								}
// 							>
// 								{achievements && achievements.map((item,key)=>{
//                                     return (<Menu.Item key={`achievements${key}`}><Link to = {item.route}>{item.title}</Link></Menu.Item>);
//                                 })}
// 							</SubMenu>
//                            {/* 统计 */}
//                             <SubMenu
// 								key="sub4"
// 								title={
// 									<span>
// 										<Icon type="notification" />统计分析
// 									</span>
// 								}
// 							>
// 								{analysis && analysis.map((item,key)=>{
//                                     return (<Menu.Item key={`analysis${key}`}><Link to = {item.route}>{item.title}</Link></Menu.Item>);
//                                 })}
// 							</SubMenu>
// 						</Menu>
// 					</Sider>
// 					<Layout style={{ padding: '0 24px 24px' }}>
// 						<Breadcrumb style={{ margin: '16px 0' }}>
							
// 							<Breadcrumb.Item>App</Breadcrumb.Item>
//                             <Breadcrumb.Item>Back Admin</Breadcrumb.Item>
//                             <Breadcrumb.Item>{Pathname}</Breadcrumb.Item>
							
// 						</Breadcrumb>
// 						<Content
// 							style={{
// 								background: '#fff',
// 								padding: 24,
// 								margin: 0,
// 								minHeight: 600
// 							}}
// 						>
// 							{/* Content */}
							
// 							{this.props.children}
// 						</Content>
// 					</Layout>
// 				</Layout>
// 			</Layout>
// 		);
// 	}
// }
// export default index;