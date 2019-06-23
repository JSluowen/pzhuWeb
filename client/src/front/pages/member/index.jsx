import React, { Component } from 'react'
import { Icon, Card, Button, Skeleton } from 'antd'
import { Link } from 'react-router';
import './index.scss'
import MemberAPI from '../../api/member'
import ma5 from 'md5'
class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: [],
            userInfoList: [],
            newUserinfoList: [],
            grade: [],//获取成员的年级
            teacherInfo: [],
            loading: true
        };
    }

    componentWillMount() {
        this.getMemberInfo()
    }
    getMemberInfo = () => {
        MemberAPI.getMemberInfo().then(res => {
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        domain: this.filterDomainNum(res.domain, res.data),
                        userInfoList: res.data,
                        newUserInfoList: res.data,
                        teacherInfo: this.filterTeacherInfo(res.data),
                        grade: this.filterGrade(res.data),
                        loading: false
                    })
                }, 200)

            }
        })
    }
    //过滤研究方向的个数
    filterDomainNum = (domain, data) => {
        return domain.map(item => {
            let num = 0;
            for (let i of data) {
                if (item.id === i.domain && i.User.status !== 3) {
                    num++
                }
            }
            return {
                id: item.id,
                name: item.name,
                index: num
            }
        })
    }
    //过滤刷选老师的信息
    filterTeacherInfo = (data) => {
        return data.filter(item => {
            return item.User.status === 3
        })
    }
    //过滤刷选成员的年级类别
    filterGrade = (data) => {
        let val = data.map(item => {
            if (item.User !== 3) {
                return parseInt(item.id.substring(0, 4))
            }
        })
        val = val.sort((a, b) => { return b - a })
        let temp = []
        for (let i = 0; i < val.length; i++) {
            if (temp.indexOf(val[i]) == -1) {
                temp.push(val[i]);
            }
        }
        return temp
    }
    //过滤刷选成员研究方向
    filterUser = (e) => {
        let event
        if (e.target.tagName == "DIV") {
            event = e.target
        } else {
            event = e.target.parentNode
        }
        let parent = event.parentNode.children
        for (let i = 0; i < parent.length; i++) {
            parent[i].classList.remove("memberActive");
        }
        event.classList.add('memberActive')


        let index = event.getAttribute('index')

        if (parseInt(index) === 0) {
            this.setState({
                newUserInfoList: this.state.userInfoList
            })
            return
        }
        let user = this.state.userInfoList.filter(item => {
            return item.domain === parseInt(index) && item.User.status !== 3
        })
        this.setState({
            newUserInfoList: user
        })
    }
    render() {
        return (
            <div className='member'>
                <div className='member-left'>
                    <div className='member-left-header'>
                        成员分类
                    </div>
                    <div className='member-left-item' index='0' onClick={this.filterUser} >
                        <p index='0'>全部</p>
                    </div>
                    {
                        this.state.domain.map(item => {
                            return <div className='member-left-item' index={item.id} key={item.id} onClick={this.filterUser} >
                                <p index={item.id}>{item.name}</p>
                                <p index={item.id}>{item.index}</p>
                            </div>
                        })

                    }
                </div>
                <div className='member-right'>
                    <Skeleton loading={this.state.loading} active>
                        {
                            this.state.teacherInfo.length !== 0 ?
                                <Card
                                    title="指导教师"
                                    style={{ width: '100%' }}
                                >
                                    {
                                        this.state.teacherInfo.map((item, index) => {
                                            return <div className='member-right-item' key={index}>

                                                <div className='member-right-item-left'>
                                                    <div className='member-right-item-left-avatar'>
                                                        <img src={item.avatar} alt="这是头像" />
                                                    </div>
                                                    <Button index={ma5(item.id)} type='primary'>
                                                        <Link to={`/tourist/${item.id}`} >点击查看</Link>
                                                    </Button>
                                                </div>
                                                <div className='member-right-item-right'>
                                                    <p>{item.User.name}</p>
                                                    <p> <Icon type="phone" />{item.phone}</p>
                                                    <p> <Icon type="mail" />{item.User.email}</p>
                                                    <p> <Icon type="idcard" />{item.School.name}{'/'}{item.Major.name}</p>
                                                    <p> <Icon type="smile" />{item.description}</p>
                                                </div>
                                            </div>
                                        })
                                    }
                                </Card> : ''
                        }
                        {
                            this.state.grade.map((item, index) => {
                                return <Card
                                    title={item + "届"}
                                    style={{ width: '100%' }}
                                    key={index}
                                >
                                    {
                                        this.state.newUserInfoList.map((useritem, index) => {
                                            if (item === parseInt(useritem.id.substring(0, 4)) && useritem.User.status !== 3) {
                                                return <div className='member-right-item' key={index}>

                                                    <div className='member-right-item-left'>
                                                        <div className='member-right-item-left-avatar'>
                                                            <img src={useritem.avatar} alt="这是头像" />
                                                        </div>
                                                        <Button index={ma5(useritem.User.id)} type='primary'>
                                                            <Link to={`/tourist/${useritem.id}`} >点击查看</Link>
                                                        </Button>
                                                    </div>
                                                    <div className='member-right-item-right'>
                                                        <p>{useritem.User.name}</p>
                                                        <p> <Icon type="phone" />{useritem.phone}</p>
                                                        <p> <Icon type="mail" />{useritem.User.email}</p>
                                                        <p> <Icon type="idcard" />{useritem.School.name}{'/'}{useritem.Major.name}</p>
                                                        <p> <Icon type="smile" />{useritem.description}</p>
                                                    </div>
                                                </div>
                                            }
                                        })
                                    }
                                </Card>
                            })
                        }
                    </Skeleton>
                </div>
            </div>
        );
    }
}

export default Member;