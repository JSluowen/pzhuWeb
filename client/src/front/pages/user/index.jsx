import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router';
import './index.scss'
import UserAPI from '../../api/user'
import Cookies from '../../../http/cookies'
class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userinfo:{},
            school:'',
            major:'',
            domain:'',
        }
    }
    
    componentWillMount(){
      this.getUserInfo()
    }
    
    getUserInfo=()=>{
        UserAPI.getUserInfo({id:Cookies.getCookies('id')}).then(res=>{
            if(res.success){
               console.log(res.data)
               this.setState({
                   userinfo:res.data,
                   school:res.data.School.name,
                   major:res.data.Major.name,
                   domain:res.data.Domain.name,
               })
            }
        })
    }

    render() {
        return (
            <div className="user">
                <div className='user-left'>
                    <div className='user-left-header'>
                        <div className='user-left-header-avatar'>
                            <div className='user-left-header-avatar-img'>
                                <img src={this.state.userinfo.avatar||'http://img.pzhuweb.cn/1556260506598'} alt="" /></div>
                        </div>
                        <div className='user-left-header-info'>
                            <div className='user-left-header-info-name'>
                                {Cookies.getCookies('name')}
                            </div>
                            <div className='user-left-header-info-mes'>
                                <Icon type="phone" />{this.state.userinfo.phone||'联系方式'}
                            </div>
                            <div className='user-left-header-info-mes'>
                                <Icon type="idcard" />{this.state.school||'学院'}{'/'}{this.state.major||'专业'}
                            </div>
                            <div className='user-left-header-info-mes'>
                                <Icon type="smile" />{this.state.userinfo.description||'自我描述'}
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
                        <Icon style={{ marginRight: '10px' }} theme="twoTone" type="eye" />  文章被阅读了{this.state.userinfo.readNum||'0'}次
                    </div>
                    <div className='user-right-ach'>
                        <div className='user-right-ach-item'>
                            <p>文章</p>
                            <p>{this.state.userinfo.articleNum||0}</p>
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
                            <p>{this.state.userinfo.favoriteNum||'0'}</p>
                        </div>
                        <div className='user-right-info-item'>
                            <p>研究方向</p>
                            <p>{this.state.domain}</p>
                        </div>
                        <div className='user-right-info-item'>
                            <p>加入时间</p>
                            <p>{this.state.userinfo.created_at}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User