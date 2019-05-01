import React, { Component } from 'react';
import { Input, Tag, Select, Skeleton, message } from 'antd';
import './index.scss'
import UserAPI from '../../api/user'
import Cookies from '../../../http/cookies'
const Option = Select.Option;
const Search = Input.Search;
class UserResource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,// 获取的数据量
            beg: 0,//截取后台数据开始的位置
            end: 10,//后台数据结束的位置
            loading: true,
            index: 0,
            resourceType: [],
            resource: [],
            color: ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"],
            isLoading: true //是否滚动监听
        };
    }

    componentDidMount() {
        this.getUserResource()
        window.addEventListener('scroll', this.handelScroll)
    }
    getUserResource = () => {
        let params = {
            index: this.state.index,
            id: Cookies.getCookies('id'),
            value: this.state.searchValue,
            beg: this.state.beg,
            end: this.state.end
        }
        UserAPI.getUserResource(params).then(res => {
            let arry = this.state.resource
            for (let item of res.data.resource) {
                arry.push(item)
            }
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        resourceType: res.data.resourceType,
                        resource: arry,
                        isLoading:true
                    })
                }, 500)
            }else{
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        resourceType: res.data.resourceType,
                        resource: arry,
                        isLoading:false
                    })
                }, 500)
            }
           
               
        })
    }
    //搜索资源
    onSearch = (value) => {
        if (value === '') {
            message.warning('请输入资源名称');
            return;
        }
        this.setState({
            loading:true
        })
        let params ={
            id:Cookies.getCookies('id'),
            value:value,
        }
        UserAPI.searchUserResource(params).then(res=>{
            if(!res.success) message.warning('为搜索到您想要的资源')
            setTimeout(()=>{
                this.setState({
                    loading:false,
                    resource:res.data
                })
            },500)
        })
    }
    // 筛选资源
    handleChange = (value) => {
        this.setState({
            index: value,
            loading: true,
            beg: 0,
            end: this.state.limit,
            resource: []
        }, () => {
            this.getUserResource()
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
    handelLoading = () => {
        if (this.state.isLoading) {
            this.setState({
                isLoading: false,
                beg: this.state.end,
                end: this.state.end + this.state.limit
            })
            this.getUserResource()
        }
    }
    render() {
        return (
            <div className='userResource'>
                <div className='userResource-container'>

                    <div className='userResource-container-header'>
                        <div className='userResource-container-header-left'>
                            <Select defaultValue="全部资源" style={{ width: 120 }} onChange={this.handleChange} loading={this.state.loading}>
                                <Option value="0">全部资源</Option>
                                {
                                    this.state.resourceType.map(item => {
                                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                                    })
                                }


                            </Select>
                        </div>
                        <div className='userResource-container-header-right'>
                            <Search
                                placeholder="搜索资源名称"
                                onSearch={value => { this.onSearch(value) }}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>

                    <div className='userResource-container-body'>
                        <div className='userResource-container-body-top'>
                            <p style={{ width: '50%' }}>资源名称</p>
                            <p style={{ width: '20%' }}>资源类别</p>
                            <p style={{ width: '30%' }}>更新时间</p>
                        </div>
                        <Skeleton loading={this.state.loading} active >
                            {
                                this.state.resource.length === 0 ?
                                    <p style={{ lineHeight: "50px", textAlign: 'center' }}>暂无数据</p>
                                    :
                                    <div>
                                        {
                                            this.state.resource.map((item => {
                                                return <div key={item.id}>
                                                    <div className='userResource-container-body-item' >
                                                        <div className='userResource-container-body-item-title' style={{ width: '50%' }}  >
                                                            {item.title}
                                                        </div>
                                                        <div style={{ width: '20%' }}>
                                                            <Tag color={this.state.color[Math.floor(Math.random() * 10)]}>{item.ResourceType.name}</Tag>
                                                        </div>
                                                        <div style={{ width: '20%' }}>
                                                            {item.updated_at}
                                                        </div>
                                                        <div style={{ flex: 1 }}>
                                                            <span index={item.id} style={{ color: '#1890ff' }} >编辑</span>
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

export default UserResource;