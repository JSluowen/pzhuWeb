import React, { Component } from 'react';
import {Link,browserHistory } from 'react-router'
import "./index.scss"

// const { SubMenu } = Menu;
// const { Header, Content, Sider } = Layout;


import { Layout, Menu, Breadcrumb, Icon,Avatar,Collapse } from 'antd';
const Panel = Collapse.Panel;
const {Header, Content, Footer, Sider,} = Layout;
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
	 genExtra = () => (
		<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
	 )
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
			<Menu theme="dark" defaultSelectedKeys={['statistic']} mode="inline">
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
				key="sub2"
				title={<span><Icon type="team" /><span>团队管理</span></span>}
			  >
					<Menu.Item key="6"></Menu.Item>
					<Menu.Item key="8"></Menu.Item>
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
			  <Menu.Item key="resource">
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
			<Header style={{ background: '#fff', padding: 0 }} >
			<Collapse  bordered className = 'right_col' >
				<Panel showArrow={false} key="1" extra = {this.genExtra()} >
					<div>管理员信息展示以及设置界面</div>
				</Panel>
			</Collapse>
			</Header>
			<Content style={{ margin: '0 16px' }}>
			  <Breadcrumb style={{ margin: '16px 0' }}>
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
	 