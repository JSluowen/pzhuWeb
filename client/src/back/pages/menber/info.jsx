import React, {Component} from 'react'
import User from '../../api/user'
import {Avatar, Table, Divider, Tag} from 'antd'

const { Column, ColumnGroup } = Table;
// //个人数据项，数据格式结构
// {
//    user:{
//        id:'2016108040255',
//     name:'任云宏',
//     email:"4910859332@qq.com",
//     'created_at':'2019-4-5',
//   }
//     
//    phone:'18090412022',
//    avator:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//    description:'呵呵，写代码，不喜欢说话！呵呵，写代码，不喜欢说话呵呵，写代码，不喜欢说话呵呵，写代码，不喜欢说话呵呵，写代码，不喜欢说话呵呵，写代码，不喜欢说话呵呵，写代码，不喜欢说话呵呵，写代码，不喜欢说话呵呵，写代码，不喜欢说话',

//     article:[
//         {
//             title:'javascript 指南',
//             technology:'Javascript',
//             publish_time:'2019-4-5',
//             read_number:'22',
//         },
//         {
//             title:'javascript 指南',
//             technology:'Javascript',
//             publish_time:'2019-4-5',
//             read_number:'22',
//         },
//         {
//             title:'javascript 指南',
//             technology:'Javascript',
//             publish_time:'2019-4-5',
//             read_number:'22',
//         }
//     ],
//     achivement:[
//         {
//             title:'在线点餐系统的设计与实现',
//             type:'软件',
//             publish_time:'2019-4-5', 
//         },
//         {
//             title:'基于***技术的应用与分析',
//             type:'论文',
//             publish_time:'2019-4-5', 
//         }
//     ]
// }
class info extends Component {
    constructor(props){
        super(props);
        let InfoPromise = User.info({userid:this.props.location.query.id});
        InfoPromise.then((data)=>{
            this.setState({userinfo:data.data[0]})
            console.log(data.data[0])
        },(error)=>{
            console.log(error);
        })
    }
    state = {
        userinfo:null,
    }

    componentDidMount(){
        // console.log(`在info 组件中获取get 传值`);
        // console.log(this.props.location.query.id);
        // 使用从父组件传递来的id 去动态请求接口

        let InfoPromise = User.info({userid:this.props.location.query.id});
        InfoPromise.then((data)=>{
            let result = data.data[0];
            for(let i = 0;i<result.Achivements.length;i++){
                result.Achivements[i].type= result.Achivements[i].AchievementType.name;
            }

            for(let i = 0;i<result.Articles.length;i++){
                result.Articles[i].technology= result.Articles[i].Technology.name;
            }

            this.setState({userinfo:result})
        },(error)=>{
            console.log(error);
        })
    }

    render() {
         const data = this.state.userinfo;
        return (
            <div className='info_content'>
            {/* 信息展示区 */}
                <div className = 'info_info'>
                    {/* <Avatar src={data.avatar} className = 'info_avatar' /> */}
                    <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'></Avatar>
                    <div className = 'userinfo'>
                        <div className = 'userinfo_top'> 
                            <span className = 'id_name'> 
                                <span><label htmlFor ='id'>学号：</label><span name = 'id'>{data.user.id}</span></span>
                                    <br/>
                                <span><label htmlFor = 'name'>名字：</label><span name='name'>{data.user.name}</span></span>
                            </span>
                            <span className = 'id_name'>
                                <span > <label htmlFor="">phone: </label><span>{data.phone}</span></span>
                                <br></br>
                                <span> <label htmlFor="">Email: </label><span>{data.user.email}</span></span>
                            </span>
                        </div>
                        <div className='userinfo_bottom'>
                            <label>个性签名：</label>
                            <p >{data.description}</p>
                        </div>
                    </div>
                </div>
                {/* 文章列表展示区 */}
                <div className='info_article'>
                    <div>
                        <Table dataSource={data.Articles}>
                            <ColumnGroup title="TA写过的文章">
                                <Column
                                title="文章名字"
                                dataIndex="title"
                                key="title"
                                />
                                <Column
                                title="技术分类"
                                dataIndex="technology"
                                key="technology"
                                />
                                <Column
                                title="发表时间"
                                dataIndex="publish_time"
                                key="publish_time"
                                />
                                <Column
                                    title="阅读量"
                                    dataIndex="read_number"
                                    key="read_number"
                                />
                            </ColumnGroup>
                        </Table>
                    </div>
                </div>
                {/* 成果展示区 */}
                <div className = 'info_achivement'>
                    <Table dataSource={data.Achivements}>
                        <ColumnGroup title="TA的成果">
                            <Column
                            title="成果名称"
                            dataIndex="title"
                            key="title"
                            />
                            <Column
                            title="成果类型"
                            dataIndex="type"
                            key="type"
                            />
                            <Column
                            title="完成时间"
                            dataIndex="publish_time"
                            key="publish_time"
                            />
                            
                        </ColumnGroup>
                    </Table>
                </div>
                {/* <div>分享资源展示区</div> */}
            </div>
        );
    }
}

export default info;
