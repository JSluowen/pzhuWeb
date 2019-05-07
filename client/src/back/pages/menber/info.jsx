import React, { Component } from 'react'
import User from '../../api/user'
import { Avatar, Table, Divider, Tag } from 'antd'
import './info.scss';
const { Column, ColumnGroup } = Table;
class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo:{
                User:{},
            },
        };
    }
    componentDidMount() {
        // console.log(`在info 组件中获取get 传值`);
        // console.log(this.props.location.query.id);
        // 使用从父组件传递来的id 去动态请求接口
        this.getUserInfo();
    }
    getUserInfo = () => {
        User.info({ userid: this.props.location.query.id }).then((data) => {
            let result = data.data[0];
            for (let i = 0; i < result.Achievements.length; i++) {
                result.Achievements[i].type = result.Achievements[i].AchievementType.name;
            }

            for (let i = 0; i < result.Articles.length; i++) {
                if (result.Articles[i].Technology) {
                    result.Articles[i].technology = result.Articles[i].Technology.name;
                }
            }
            this.setState({ userinfo: result })
        }, (error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className='info_content'>
                {/* 信息展示区 */}
                <div className='info_info'>
                    {/* <Avatar src={data.avatar} className = 'info_avatar' /> */}
                    <Avatar className = 'info_avatar' src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'></Avatar>
                    <div className='userinfo'>
                        <div className='userinfo_top'>
                            <span className='id_name'>
                                <span><label htmlFor='id'>学号：</label><span name='id'>{this.state.userinfo.User.id}</span></span>
                                <br />
                                <span><label htmlFor='name'>名字：</label><span name='name'>{this.state.userinfo.User.name}</span></span>
                            </span>
                            <span className='id_name'>
                                <span > <label htmlFor="">phone: </label><span>{this.state.userinfo.phone}</span></span>
                                <br></br>
                                <span> <label htmlFor="">Email: </label><span>{this.state.userinfo.User.email}</span></span>
                            </span>
                        </div>
                        <div className='userinfo_bottom'>
                            <label>个性签名：</label>
                            <p >{this.state.userinfo.description}</p>
                        </div>
                    </div>
                </div>
                {/* 文章列表展示区 */}
                <div className='info_article'>
                    <div>
                        <Table dataSource={this.state.userinfo.Articles}>
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
                <div className='info_achivement'>
                    <Table dataSource={this.state.userinfo.Achievements}>
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

export default Info;


// //个人数据项，数据格式结构
// {
//    user:{
//     id:'2016108040255',
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