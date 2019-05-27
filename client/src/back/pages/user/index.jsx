import React, { Component } from 'react';
import { Progress, Tabs, Avatar, Button, Modal, Pagination, Spin } from 'antd';
import { UserAPI } from '../../api';
import './index.scss';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,//加载
            pageSize: 10,//每页的条数
            total: 0,//默认的数据总数
            defaultCurrent: 1,//默认当前页
            allUser: [],
            reviewUser: [],
            gradeGroup: []
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
                console.log(res.data.gradeGroup)
                setTimeout(() => {
                    this.setState({
                        allUser: res.data.allUser,
                        reviewUser: res.data.reviewUser,
                        loading: false,
                        gradeGroup: res.data.gradeGroup,
                        total: res.data.total
                    })

                }, 500)
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
                this.setState({
                    reviewUser: this.state.reviewUser.splice(0, index)
                })
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
    render() {
        return (
            <div className='back-user'>
                <Spin size='large' spinning={this.state.loading} >
                    <div className='back-user-header'>
                        <div className='back-user-header-item'>
                            <Progress strokeLinecap="square" strokeColor='#f50' type="circle" percent={this.state.gradeGroup[3]} />
                            <p>大四成员</p>
                        </div>
                        <div className='back-user-header-item'>
                            <Progress strokeLinecap="square" strokeColor='#2db7f5' type="circle" percent={this.state.gradeGroup[2]} />
                            <p>大三成员</p>
                        </div>
                        <div className='back-user-header-item'>
                            <Progress strokeLinecap="square" strokeColor='#87d068' type="circle" percent={this.state.gradeGroup[1]} />
                            <p>大二成员</p>
                        </div>
                        <div className='back-user-header-item'>
                            <Progress strokeLinecap="square" strokeColor='#108ee9' type="circle" percent={this.state.gradeGroup[0]} />
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
                        </Tabs>
                    </div>
                </Spin>
            </div>
        );
    }
}

export default Index;