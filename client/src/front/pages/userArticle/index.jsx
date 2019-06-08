import React, { Component } from 'react';
import { Input, Tag, Select, Skeleton, message, Icon, Modal } from 'antd';
import './index.scss'
import UserAPI from '../../api/user'
import { Link } from 'react-router'
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;
class UserArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,// 获取的数据量
            beg: 0,//截取后台数据开始的位置
            end: 10,//后台数据结束的位置
            loading: true,
            index: 0,
            articleType: [],
            article: [],
            color: ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"],
            isLoading: true //是否滚动监听
        };
    }

    componentDidMount() {
        this.getUserArticle()
        window.addEventListener('scroll', this.handelScroll)
    }
    getUserArticle = () => {
        let params = {
            index: this.state.index,
            beg: this.state.beg,
            end: this.state.end
        }
        UserAPI.getUserArticle(params).then(res => {
            let arry = this.state.article
            for (let item of res.data.article) {
                arry.push(item)
            }
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        articleType: res.data.articleType,
                        article: arry,
                        isLoading: true
                    })
                }, 500)
            } else {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        articleType: res.data.articleType,
                        article: arry,
                        isLoading: false
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
            loading: true
        })
        let params = {
            value: value,
        }
        UserAPI.searchUserArticle(params).then(res => {
            if (!res.success) message.warning('为搜索到您想要的资源')
            setTimeout(() => {
                this.setState({
                    loading: false,
                    article: res.data
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
            article: []
        }, () => {
            this.getUserArticle()
        })

    }
    // 监听滚动条
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
            this.getUserArticle()
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
                UserAPI.delUserArticle(params).then(res => {
                    if (res.success) {
                        message.success('删除成功')
                        that.state.article.splice(index, 1)
                        that.setState({
                            article: that.state.article

                        })
                    } else {
                        message.warning('删除失败')
                    }
                })
            }
        });
    }

    render() {
        return (
            <div className='userArticle'>
                <div className='userArticle-container'>

                    <div className='userArticle-container-header'>
                        <div className='userArticle-container-header-left'>
                            <Select defaultValue="全部资源" style={{ width: 120 }} onChange={this.handleChange} loading={this.state.loading}>
                                <Option value="0">全部资源</Option>
                                {
                                    this.state.articleType.map(item => {
                                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                                    })
                                }


                            </Select>
                        </div>
                        <div className='userArticle-container-header-right'>
                            <Search
                                placeholder="搜索文章名称"
                                onSearch={value => { this.onSearch(value) }}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>

                    <div className='userArticle-container-body'>
                        <div className='userArticle-container-body-top'>
                            <p style={{ width: '50%' }}>文章名称</p>
                            <p style={{ width: '20%' }}>技术标签</p>
                            <p style={{ width: '20%' }}>更新时间</p>
                        </div>
                        <Skeleton loading={this.state.loading} active >
                            {
                                this.state.article.length === 0 ?
                                    <p style={{ lineHeight: "50px", textAlign: 'center' }}>暂无数据</p>
                                    :
                                    <div>
                                        {
                                            this.state.article.map(((item, index) => {
                                                return <div key={item.id}>
                                                    <div className='userArticle-container-body-item' >
                                                        <div style={{ width: '50%' }} >
                                                            <Link  target='_blank' style={{ color: 'rgba(0, 0, 0, 0.65)' }}  to={`/articleInfo/${item.id}`}>{item.title}</Link>
                                                        </div>
                                                        <div style={{ width: '20%' }}>
                                                            <Tag color={this.state.color[Math.floor(Math.random() * 10)]}>{item.Technology.name}</Tag>
                                                        </div>
                                                        <div style={{ width: '20%' }}>
                                                            {item.updated_at}
                                                        </div>
                                                        <div className='userArticle-container-body-item-work' style={{ flex: 1 }}>
                                                            <Link style={{ color: 'rgba(0, 0, 0, 0.65)' }} to={`/articleEdit/${item.id}`}>
                                                                <Icon type="edit" />
                                                            </Link>
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

export default UserArticle;