import React, { Component } from 'react';
import {
    Progress, Tabs, Avatar, Button, Modal, Pagination, Spin,
} from 'antd';
import AddUserInfo from './adduserinfo';
import UpdateUserInfo from './updateuserinfo'; 
import { UserAPI } from '../../api';
import './index.scss';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,//用户id
            loading: true,//加载
            pageSize: 10,//每页的条数
            total: 0,//默认的数据总数
            defaultCurrent: 1,//默认当前页
            allUser: [],
            reviewUser: [],
            gradeGroup: [],
            activeKey: '1',// 默认第一页
        };
    }
    componentDidMount() {
        this.getUserInfo();
    }
    //获取用户的基本信息
    getUserInfo = () => {
        this.setState({
            loading: true
        })
        let params = {
            page: this.state.defaultCurrent,
            pageSize: this.state.pageSize
        }
        UserAPI.getUserInfo(params).then(res => {
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        allUser: res.data.allUser,
                        reviewUser: res.data.reviewUser,
                        loading: false,
                        gradeGroup: res.data.gradeGroup,
                        total: res.data.total
                    })
                }, 200)
            }
        })
    }
    //跳转某页
    onChange = (page, pageSize) => {
        this.setState({
            defaultCurrent: page,
            pageSize: pageSize
        }, () => {
            this.getUserInfo();
        })
    }
    // 审核通过
    userReviewPass = (e) => {
        const userid = e.target.getAttribute('userid');
        const index = e.target.getAttribute('index');
        UserAPI.userReviewPass({ id: userid }).then(res => {
            if (res.success) {
                this.getUserInfo();
            }
        })
    }
    // 拒绝用户加入
    userRefuseJoin = (e) => {
        const userid = e.target.getAttribute('userid');
        const index = e.target.getAttribute('index');
        const that = this;
        confirm({
            title: '警告提示',
            content: '是否确认拒绝该用户的请求？',
            okType: 'danger',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                UserAPI.userRefuseJoin({ id: userid }).then(res => {
                    if (res.success) {
                        that.setState({
                            reviewUser: that.state.reviewUser.splice(0, index)
                        })
                    }
                })
            },
            onCancel() { }

        });
    }
    // 删除用户信息
    deleteUser = (e) => {
        const userid = e.target.getAttribute('userid');
        const index = e.target.getAttribute('index');
        const that = this;
        confirm({
            title: '删除警告',
            content: '是否确认踢出改成员',
            okType: 'danger',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                UserAPI.deleteUser({ id: userid }).then(res => {
                    if (res.success) {
                        that.getUserInfo();
                    }
                })
            },
            onCancel() { }

        });
    }
    // 标签页切换
    activeKey = (key) => {
        this.setState({
            activeKey: key
        })
        this.getUserInfo();
    }
    onChangeActiveKey = (activeKey) => {
        this.setState({
            activeKey: activeKey,
            id: undefined,
        })
    }
    updateUserInfo = (e) => {
        let id = e.currentTarget.getAttribute('userid');
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0;
        this.setState({
            activeKey: '4',
            id: id,
        })
    }
    render() {
        return (
            <div className='back-user'>
                <Spin tip="数据加载中" size='large' spinning={this.state.loading} >
                    <div className='back-user-header'>
                        <div className='back-user-header-item'>
                            <Progress strokeLinecap="square" strokeColor='#f50' type="circle" percent={this.state.gradeGroup[0] || 0} />
                            <p>前端</p>
                        </div>
                        <div className='back-user-header-item'>
                            <Progress strokeLinecap="square" strokeColor='#2db7f5' type="circle" percent={this.state.gradeGroup[1] || 0} />
                            <p>后台</p>
                        </div>
                        <div className='back-user-header-item'>
                            <Progress strokeLinecap="square" strokeColor='#87d068' type="circle" percent={this.state.gradeGroup[2] || 0} />
                            <p>算法</p>
                        </div>
                        <div className='back-user-header-item'>
                            <Progress strokeLinecap="square" strokeColor='#108ee9' type="circle" percent={this.state.gradeGroup[3] || 0} />
                            <p>全栈</p>
                        </div>
                    </div>
                    <div className='back-user-body'>
                        <Tabs activeKey={this.state.activeKey} onChange={this.onChangeActiveKey} >
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
                                        {
                                            this.state.allUser.length !== 0 ?
                                                <div>
                                                    {
                                                        this.state.allUser.map((item, index) => {
                                                            return <div key={item.id} className='back-user-body-userinfo-body-list'>
                                                                <div className='back-user-body-userinfo-body-list-item'>
                                                                    {item.id}
                                                                </div>
                                                                <div className='back-user-body-userinfo-body-list-item'>
                                                                    <Avatar src={item.avatar} size="small" icon="user" />
                                                                    {item.User.name}
                                                                </div>
                                                                <div className='back-user-body-userinfo-body-list-item'>
                                                                    {item.Major.name}
                                                                </div>
                                                                <div className='back-user-body-userinfo-body-list-item'>
                                                                    {item.phone}
                                                                </div>
                                                                <div className='back-user-body-userinfo-body-list-item'>
                                                                    {item.Domain.name}
                                                                </div>
                                                                <div className='back-user-body-userinfo-body-list-item'>
                                                                    {item.created_at}
                                                                </div>
                                                                <div className='back-user-body-userinfo-body-list-item'>
                                                                    <Button index={index} userid={item.id} onClick={this.updateUserInfo} type='primary'>修改成员</Button>
                                                                    <Button index={index} userid={item.id} onClick={this.deleteUser} type='danger'>踢出成员</Button>
                                                                </div>
                                                            </div>

                                                        })
                                                    }
                                                    <div className='back-user-body-userinfo-pagination'>
                                                        <Pagination
                                                            pageSize={this.state.pageSize}
                                                            showQuickJumper
                                                            onChange={this.onChange}
                                                            defaultCurrent={this.state.defaultCurrent}//默认当前页数
                                                            total={this.state.total}
                                                        />
                                                    </div>

                                                </div>
                                                :
                                                <div className='back-user-body-userinfo-body-nullData'>
                                                    暂无数据
                                                </div>
                                        }
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="审核成员" key="2">
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
                                    {
                                        this.state.reviewUser.length !== 0 ?
                                            <div>
                                                {
                                                    this.state.reviewUser.map((item, index) => {
                                                        return <div key={item.id} className='back-user-body-review-body-list'>
                                                            <div className='back-user-body-review-body-list-item'>
                                                                {item.id}
                                                            </div>
                                                            <div className='back-user-body-review-body-list-item'>
                                                                {item.name}
                                                            </div>
                                                            <div className='back-user-body-review-body-list-item'>
                                                                {item.email}
                                                            </div>
                                                            <div className='back-user-body-review-body-list-item'>
                                                                {item.created_at}
                                                            </div>
                                                            <div className='back-user-body-review-body-list-item'>
                                                                <Button index={index} userid={item.id} onClick={this.userReviewPass} type='primary'>审核通过</Button>
                                                                <Button index={index} userid={item.id} onClick={this.userRefuseJoin} type='danger'>拒绝加入</Button>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                            :
                                            <div className='back-user-body-review-body-nullData'>
                                                暂无审核信息
                                            </div>
                                    }

                                </div>
                            </TabPane>
                            <TabPane tab='添加成员' key='3'>
                                <AddUserInfo activeKey={this.activeKey} />
                            </TabPane>
                            <TabPane tab='修改成员'  disabled key='4' >
                                <UpdateUserInfo id={this.state.id} activeKey={this.activeKey} />
                            </TabPane>
                        </Tabs>
                    </div>
                </Spin>
            </div >
        );
    }
}

export default User;