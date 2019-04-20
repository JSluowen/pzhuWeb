import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router';
import './index.scss'
import avatar from './443625372.png'
class User extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="user">
                <div className='user-left'>
                    <div className='user-left-header'>
                        <div className='user-left-header-avatar'>
                            <div className='user-left-header-avatar-img'>
                                <img src={avatar} alt="" /></div>
                        </div>
                        <div className='user-left-header-info'>
                            <div className='user-left-header-info-name'>
                                小丑面具
                            </div>
                            <div className='user-left-header-info-mes'>
                                <Icon type="phone" />13118310939
                            </div>
                            <div className='user-left-header-info-mes'>
                                <Icon type="idcard" />数学与计算机学院{'/'}软件工程
                            </div>
                            <div className='user-left-header-info-mes'>
                                <Icon type="smile" />热爱生活，热爱敲代码
                            </div>
                        </div>
                        <div className='user-left-header-edit'>
                            <Link to='setting' ><Button type='primary' ghost>编辑个人资料</Button></Link>
                        </div>
                    </div>
                    <div className='user-left-body'>
                        <div className='user-left-body-navbar'>
                            <div className='user-left-body-navbar-item'>
                                <Link activeClassName='userActive'>动态</Link>
                            </div>
                            <div className='user-left-body-navbar-item'>
                                <Link activeClassName='userActive' >文章</Link>
                            </div>
                            <div className='user-left-body-navbar-item'>
                                <Link activeClassName='userActive' >成果</Link>
                            </div>
                            <div className='user-left-body-navbar-item'>
                                <Link activeClassName='userActive' >资源</Link>
                            </div>
                            <div className='user-left-body-navbar-item'>
                                <Link activeClassName='userActive' to='/user/collect'>收藏</Link>
                            </div>
                        </div>
                        <div className='user-left-body-container'>
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <div className='user-right'>
                    <div className='user-right-title'>
                        个人成就
                    </div>
                    <div className='user-right-article'>
                        <Icon style={{ marginRight: '10px' }} theme="twoTone" type="eye" />  文章被阅读了20次
                    </div>
                    <div className='user-right-ach'>
                        <div className='user-right-ach-item'>
                            <p>文章</p>
                            <p>10</p>
                        </div>
                        <div className='user-right-ach-item'>
                            <p>成果</p>
                            <p>10</p>
                        </div>
                        <div className='user-right-ach-item'>
                            <p>资源</p>
                            <p>10</p>
                        </div>
                    </div>
                    <div className='user-right-info'>
                        <div className='user-right-info-item'>
                            <p>收藏集</p>
                            <p>20</p>
                        </div>
                        <div className='user-right-info-item'>
                            <p>研究方向</p>
                            <p>前端</p>
                        </div>
                        <div className='user-right-info-item'>
                            <p>加入时间</p>
                            <p>2016年9月1日</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User