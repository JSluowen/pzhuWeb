import React, { Component } from 'react';
import { Progress, Tabs, Avatar, Button, Pagination } from 'antd';
import {UserAPI} from '../../api';
import './index.scss';
const TabPane = Tabs.TabPane;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,//每页的条数
            total: 1,//默认的数据总数

        };
    }
    componentDidMount() {
        this.getUserInfo();
    }
    //获取用户的基本信息
    getUserInfo = () => {
        UserAPI.getUserInfo().then(res => {
            if (res.success) {
                console.log(res.data)
            }
        })
    }
    //跳转某页
    onChange = (page, pageSize) => {
        console.log(page, pageSize);
    }
    render() {
        return (
            <div className='back-user'>
                <div className='back-user-header'>
                    <div className='back-user-header-item'>
                        <Progress strokeLinecap="square" type="circle" percent={75} />
                        <p>大四成员</p>
                    </div>
                    <div className='back-user-header-item'>
                        <Progress strokeLinecap="square" type="circle" percent={75} />
                        <p>大三成员</p>
                    </div>
                    <div className='back-user-header-item'>
                        <Progress strokeLinecap="square" type="circle" percent={75} />
                        <p>大二成员</p>
                    </div>
                    <div className='back-user-header-item'>
                        <Progress strokeLinecap="square" type="circle" percent={0} />
                        <p>大一成员</p>
                    </div>
                </div>
                <div className='back-user-body'>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="全部" key="1">
                            <div className='back-user-body-userinfo'>
                                <div className='back-user-body-userinfo-header'>
                                    <div className='back-user-body-userinfo-header-item'>
                                        学号
                                    </div>
                                    <div className='back-user-body-userinfo-header-item'>
                                        姓名
                                    </div>
                                    <div className='back-user-body-userinfo-header-item'>
                                        专业
                                    </div>
                                    <div className='back-user-body-userinfo-header-item'>
                                        联系方式
                                    </div>
                                    <div className='back-user-body-userinfo-header-item'>
                                        研究方向
                                    </div>
                                    <div className='back-user-body-userinfo-header-item'>
                                        加入时间
                                    </div>
                                    <div className='back-user-body-userinfo-header-item'>
                                        操作
                                    </div>
                                </div>
                                <div className='back-user-body-userinfo-body'>
                                    <div className='back-user-body-userinfo-body-list'>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            201610804032
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            <Avatar size="small" icon="user" />
                                            张三
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            软件工程
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            13118310939
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            前端
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            2019-5-26
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            <Button type='primary'>通知</Button>
                                            <Button type='danger'>删除</Button>
                                        </div>
                                    </div>

                                    <div className='back-user-body-userinfo-body-list'>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            201610804032
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            <Avatar size="small" icon="user" />
                                            张三
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            软件工程
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            13118310939
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            前端
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            2019-5-26
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            <Button type='primary'>通知</Button>
                                            <Button type='danger'>删除</Button>
                                        </div>
                                    </div>
                                    <div className='back-user-body-userinfo-body-list'>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            201610804032
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            <Avatar size="small" icon="user" />
                                            张三
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            计算机科学与技术
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            13118310939
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            前端
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            2019-5-26
                                    </div>
                                        <div className='back-user-body-userinfo-body-list-item'>
                                            <Button type='primary'>通知</Button>
                                            <Button type='danger'>删除</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className='back-user-body-userinfo-pagination'>
                                    <Pagination
                                        pageSize={this.state.pageSize}
                                        showQuickJumper
                                        onChange={this.onChange}
                                        defaultCurrent={1}//默认当前页数
                                        total={this.state.total}
                                    />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="审核中" key="2">
                            <div className='back-user-body-review-header'>
                                <div className='back-user-body-review-header-item'>
                                    学号
                                    </div>
                                <div className='back-user-body-review-header-item'>
                                    姓名
                                    </div>
                                <div className='back-user-body-review-header-item'>
                                    邮箱
                                    </div>
                                <div className='back-user-body-review-header-item'>
                                    申请时间
                                    </div>
                                <div className='back-user-body-review-header-item'>
                                    操作
                                    </div>
                            </div>
                            <div className='back-user-body-review-body'>
                                <div className='back-user-body-review-body-list'>
                                    <div className='back-user-body-review-body-list-item'>
                                        201610804032
                                    </div>
                                    <div className='back-user-body-review-body-list-item'>
                                        张三
                                    </div>
                                    <div className='back-user-body-review-body-list-item'>
                                        1291962779@qq.com
                                    </div>
                                    <div className='back-user-body-review-body-list-item'>
                                        2019-5-26
                                    </div>
                                    <div className='back-user-body-review-body-list-item'>
                                        <Button type='primary'>审核通过</Button>
                                        <Button type='danger'>拒绝加入</Button>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Index;