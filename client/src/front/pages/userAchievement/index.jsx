import React, { Component } from 'react';
import { Input, Tag, Select, Skeleton, message, Icon, Modal } from 'antd';
import './index.scss'
import UserAPI from '../../api/user'
import Cookies from '../../../http/cookies'
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;
class UserAchievement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,// 获取的数据量
            beg: 0,//截取后台数据开始的位置
            end: 10,//后台数据结束的位置
            loading: true,
            index: 0,
            acType: [],
            ac: [],
            color: ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"],
            isLoading: true //是否滚动监听
        };
    }

    componentDidMount() {
        this.getUserAchievement()
        window.addEventListener('scroll', this.handelScroll)
    }
    getUserAchievement = () => {

        let params = {
            index: this.state.index,
            id: Cookies.getCookies('id'),
            value: this.state.searchValue,
            beg: this.state.beg,
            end: this.state.end
        }
        UserAPI.getUserAchievement(params).then(res => {
            let arry = this.state.ac
            for (let item of res.data.ac) {
                arry.push(item)
            }
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        acType: res.data.acType,
                        ac: arry,
                        isLoading: true
                    })
                }, 500)
            } else {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        acType: res.data.acType,
                        ac: arry,
                        isLoading: false
                    })
                }, 500)
            }


        })
    }
     //搜索资源
     onSearch = (value) => {
        if (value === '') {
            message.warning('请输入成果名称');
            return;
        }
        this.setState({
            loading: true
        })
        let params = {
            id: Cookies.getCookies('id'),
            value: value,
        }
        UserAPI.searchUserAchievement(params).then(res => {
            if (!res.success) message.warning('为搜索到您想要的资源')
            setTimeout(() => {
                this.setState({
                    loading: false,
                    ac: res.data
                })
            }, 500)
        })
    }
    // 筛选资源
    handleChange = (value) => {
        this.setState({
            index: value,
            loading: true,
            beg: 0,
            end: this.state.limit,
            ac: []
        }, () => {
            this.getUserAchievement()
        })

    }
    //监听滚动条
    handelScroll = (e) => {
        // 滚动的高度
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        // 视窗高度
        const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
        // 页面高度
        const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
        // 距离页面底部的高度
        const height = scrollHeight - scrollTop - clientHeight;
        if (height <= 50) {
            this.handelLoading()
        }
    }
    handelLoading = (e) => {
        if (this.state.isLoading) {
            this.setState({
                isLoading: false,
                beg: this.state.end,
                end: this.state.end + this.state.limit
            })
            this.getUserAchievement()
        }
    }
    handelDel = (e) => {
        let event;
        if (e.target.tagName === 'svg') {
            event = e.target.parentNode.parentNode
        } else if (e.target.tagName === 'path') {
            event = e.target.parentNode.parentNode.parentNode
        } else {
            event = e.target
        }
        let id = event.getAttribute('primary');
        let index = event.getAttribute('index')
        let params = {
            id: id
        }
        let that = this;
        confirm({
            title: '删除警告',
            content: '是否删除资源？',
            okText: '立即删除',
            okType: 'danger',
            cancelText: '考虑一下',
            onOk() {
                UserAPI.delUserAchievement(params).then(res => {
                    if (res.success) {
                        message.success('删除成功')
                        that.state.ac.splice(index, 1)
                        that.setState({
                            ac: that.state.ac

                        })
                    }
                })
            }
        });
    }


    render() {
        return (
            <div className='userAchievement'>
                <div className='userAchievement-container'>
                    <div className='userAchievement-container-header'>
                        <div className='userAchievement-container-header-left'>
                            <Select defaultValue="全部资源" style={{ width: 120 }} onChange={this.handleChange} loading={this.state.loading}>
                                <Option value="0">全部资源</Option>
                                {
                                    this.state.acType.map(item => {
                                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className='userAchievement-container-header-right'>
                            <Search
                                placeholder="搜索成果名称"
                                onSearch={value => { this.onSearch(value) }}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>

                    <div className='userAchievement-container-body'>
                        <div className='userAchievement-container-body-top'>
                            <p style={{ width: '50%' }}>成果名称</p>
                            <p style={{ width: '20%' }}>成果类别</p>
                            <p style={{ width: '20%' }}>更新时间</p>
                        </div>
                        <Skeleton loading={this.state.loading} active >
                            {
                                this.state.ac.length === 0 ?
                                    <p style={{ lineHeight: "50px", textAlign: 'center' }}>暂无数据</p>
                                    :
                                    <div>
                                        {
                                            this.state.ac.map(((item, index) => {
                                                return <div key={item.id}>
                                                    <div className='userAchievement-container-body-item' >
                                                        <div style={{ width: '50%' }}  >
                                                            <span>{item.title}</span>
                                                        </div>
                                                        <div style={{ width: '20%' }}>
                                                            <Tag color={this.state.color[Math.floor(Math.random() * 10)]}>{item.AchievementType.name}</Tag>
                                                        </div>
                                                        <div style={{ width: '20%' }}>
                                                            {item.updated_at}
                                                        </div>
                                                        <div className='userAchievement-container-body-item-work' style={{ flex: 1 }}>
                                                            <p index={item.id} >
                                                                <Icon type="edit" />
                                                            </p>
                                                            <p primary={item.id} index={index} onClick={this.handelDel} >
                                                                <Icon type="delete" />
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            }))
                                        }
                                    </div>
                            }
                        </Skeleton>
                    </div>

                </div>
            </div>

        );
    }
}

export default UserAchievement;