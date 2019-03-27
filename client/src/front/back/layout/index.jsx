import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon ,Image} from 'antd';
import {Link,browserHistory } from 'react-router'
import "./index.scss"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
           achievements:[
                {title:"所有成果",route:"/resultlist"},
                {title:"上传成果",route:"/articles"},
                {title:"成果统计",route:"/articles"},
           ],
           analysis:[
            {title:"成员分析",route:"/menber_analysis"},
            {title:"成果分析",route:"/result_analysis"},
            {title:"时间轴",route:"/time_analysis"},
           ]
           ,
           Pathname:'home'
        };
    }
    componentDidMount(){
        console.log(browserHistory.getCurrentLocation());
    }
    handle=()=>{
        this.setState({Pathname:browserHistory.getCurrentLocation().hash})
        console.log(browserHistory.getCurrentLocation().hash);
    }
	render() {
        const  {menber,article,achievements,analysis,Pathname} = this.state; 
		return (
			<Layout>
                
				<Layout>
                
					<Sider width={200} height = {800} theme={"light"} style={{ background: '#abcdef',paddingTop:"30"}} onClick={this.handle}>
                        <div><a style={{height:"30px",lineHeight:"30px"}}>Web Team controller</a></div>
                        <Menu
							mode="inline"
							defaultSelectedKeys={[  ]}
							defaultOpenKeys={[ 'menber','article' ]}
							style={{ height: '100%', borderRight: 0 ,backgroundColor:"#abcdef"}}
						>
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
                            {/* 文章管理 */}
							<SubMenu
								key="article"
								title={
									<span>
										<Icon type="laptop" />文章管理
									</span>
								}
							>
								{article && article.map((item,key)=>{
                                    return (<Menu.Item key={`article${key}`}><Link to = {item.route}>{item.title}</Link></Menu.Item>);
                                })}
								
							</SubMenu>
							{/* 成果管理 */}
                            <SubMenu
								key="achievements"
								title={
									<span>
										<Icon type="notification" />成果管理
									</span>
								}
							>
								{achievements && achievements.map((item,key)=>{
                                    return (<Menu.Item key={`achievements${key}`}><Link to = {item.route}>{item.title}</Link></Menu.Item>);
                                })}
							</SubMenu>
                           {/* 统计 */}
                            <SubMenu
								key="sub4"
								title={
									<span>
										<Icon type="notification" />统计分析
									</span>
								}
							>
								{analysis && analysis.map((item,key)=>{
                                    return (<Menu.Item key={`analysis${key}`}><Link to = {item.route}>{item.title}</Link></Menu.Item>);
                                })}
							</SubMenu>
						</Menu>
					</Sider>
					<Layout style={{ padding: '0 24px 24px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							
							<Breadcrumb.Item>App</Breadcrumb.Item>
                            <Breadcrumb.Item>Back Admin</Breadcrumb.Item>
                            <Breadcrumb.Item>{Pathname}</Breadcrumb.Item>
							
						</Breadcrumb>
						<Content
							style={{
								background: '#fff',
								padding: 24,
								margin: 0,
								minHeight: 600
							}}
						>
							Content{this.props.children}
						</Content>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}

export default index;
