import React, { Component } from 'react'
import { Icon, Card, Button } from 'antd'
import './index.scss'
class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='member'>
                <div className='member-left'>
                    <div className='member-left-header'>
                        成员分类
                    </div>
                    <div className='member-left-item'>
                        <p> 前端</p>
                        <p>10人</p>
                    </div>
                    <div className='member-left-item'>

                        <p> 后台</p>
                        <p>10人</p></div>
                    <div className='member-left-item'>

                        <p> 算法</p>
                        <p>10人</p></div>
                    <div className='member-left-item'>

                        <p> 动画</p>
                        <p>10人</p></div>
                    <div className='member-left-item'>

                        <p> 全栈</p>
                        <p>10人</p></div>
                </div>
                <div className='member-right'>
                    <Card
                        title="指导教师"
                        style={{ width: '100%' }}
                    >
                        <div className='member-right-item'>

                            <div className='member-right-item-left'>
                                <div className='member-right-item-left-avatar'>
                                    <img src="http://img.pzhuweb.cn/443625372.jpeg" alt="这是头像" />
                                </div>
                                <Button type='primary'>立即查看</Button>
                            </div>
                            <div className='member-right-item-right'>
                                <p>李四</p>
                                <p> <Icon type="phone" />13118310939</p>
                                <p> <Icon type="mail" />1291962779@qq.com</p>
                                <p> <Icon type="idcard" />数学与计算机学院{'/'}软件工程</p>
                                <p> <Icon type="smile" />热爱生活，热爱敲代码</p>
                            </div>
                        </div>
                        <div className='member-right-item'>

                            <div className='member-right-item-left'>
                                <div className='member-right-item-left-avatar'>
                                    <img src="http://img.pzhuweb.cn/443625372.jpeg" alt="这是头像" />
                                </div>
                                <Button type='primary'>立即查看</Button>
                            </div>
                            <div className='member-right-item-right'>
                                <p>李四</p>
                                <p> <Icon type="phone" />13118310939</p>
                                <p> <Icon type="mail" />1291962779@qq.com</p>
                                <p> <Icon type="idcard" />数学与计算机学院{'/'}软件工程</p>
                                <p> <Icon type="smile" />热爱生活，热爱敲代码</p>
                            </div>
                        </div>

                    </Card>
                    <Card
                        title="2018"
                        style={{ width: '100%' }}
                    >
                        <div className='member-right-item'>

                            <div className='member-right-item-left'>
                                <div className='member-right-item-left-avatar'>
                                    <img src="http://img.pzhuweb.cn/443625372.jpeg" alt="这是头像" />
                                </div>
                                <Button type='primary'>立即查看</Button>
                            </div>
                            <div className='member-right-item-right'>
                                <p>李四</p>
                                <p> <Icon type="phone" />13118310939</p>
                                <p> <Icon type="mail" />1291962779@qq.com</p>
                                <p> <Icon type="idcard" />数学与计算机学院{'/'}软件工程</p>
                                <p> <Icon type="smile" />热爱生活，热爱敲代码</p>
                            </div>
                        </div>

                    </Card>
                    <Card
                        title="2017"
                        style={{ width: '100%' }}
                    >
                        <div className='member-right-item'>

                            <div className='member-right-item-left'>
                                <div className='member-right-item-left-avatar'>
                                    <img src="http://img.pzhuweb.cn/443625372.jpeg" alt="这是头像" />
                                </div>
                                <Button type='primary'>立即查看</Button>
                            </div>
                            <div className='member-right-item-right'>
                                <p>李四</p>
                                <p> <Icon type="phone" />13118310939</p>
                                <p> <Icon type="mail" />1291962779@qq.com</p>
                                <p> <Icon type="idcard" />数学与计算机学院{'/'}软件工程</p>
                                <p> <Icon type="smile" />热爱生活，热爱敲代码</p>
                            </div>
                        </div>

                    </Card>
                </div>
            </div>
        );
    }
}

export default Member;