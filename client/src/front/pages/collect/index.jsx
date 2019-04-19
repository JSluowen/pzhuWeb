import React, { Component } from 'react'
import { Menu, Dropdown, Icon, message, Input, Modal, Button, Spin } from 'antd';
import { CollectAPI } from '../../api';
import Cookies from '../../../http/cookies'
import './index.scss'

const Search = Input.Search;
const confirm = Modal.confirm;


class Collect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: true,
            labelList: [],
            labelName: '所有收藏',
            CollectList: [],
            newCollectList: [],
            isLoading: true,
            loading: false,
            isFooter: true,
            limit: 10,//每次加载的数
            offset: 0,//每次跳过的数
        };
    }
    componentWillMount() {
        this.getTechnologyLabel()
        this.getCollectList()

    }
    componentDidMount() {
        window.addEventListener('scroll', this.handelScroll)
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
        if (height <= 0) {
            this.handelLoading()
        }
    }
    handelLoading = () => {
        if (this.state.isLoading) {
            this.setState({
                isLoading: false,
                offset: this.state.offset + this.state.limit,
                loading: true
            })
            setTimeout(() => {
                this.getCollectList()
            }, 1000)
        }
    }
    //获取技术标签
    getTechnologyLabel = () => {
        CollectAPI.getMenuLabel().then(res => {
            if (res.success) {
                this.setState({
                    labelList: res.data
                })
            }
        })
    }
    // 获取文章列表
    getCollectList = () => {
        let params = {
            id: Cookies.getCookies('id'),
            limit: this.state.limit,
            offset: this.state.offset
        }
        CollectAPI.getCollectList(params).then(res => {
            let arry = this.state.CollectList
            for (let item of res.data) {
                arry.push(item)
            }
            this.setState({
                CollectList: arry,
                newCollectList: arry,
            })

            if (res.success) {

                this.setState({
                    isLoading: true,
                    loading: false
                })
            } else {
                this.setState({
                    isLoading: false,
                    loading: false,
                    isFooter: false
                })
            }
        })
    }
    // 收藏列表筛选
    handelMenuItem = (value) => {
        let labelKey = value.key
        let labelName = value.item.props.children
        if (labelKey === '0') {
            this.setState({
                newCollectList: this.state.CollectList,
                labelName: labelName
            })
            return;
        }

        this.setState({
            labelName: labelName
        })
        let newList = this.state.CollectList.filter(item => {
            return item.Article.Menu.id === parseInt(labelKey)
        })
        this.setState({
            newCollectList: newList
        })
    }
    //取消收藏
    cancelCollect = (e) => {
        let that = this;
        let id = e.target.getAttribute('id')
        let index = e.target.getAttribute('index')
        confirm({
            title: '友情提示',
            content: '确认取消收藏吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                CollectAPI.cancelCollect({ id: id }).then(res => {
                    if (res.success) {
                        message.success('成功取消')
                        that.state.CollectList.splice(index, 1);
                        that.setState({
                            newCollectList: that.state.CollectList
                        })
                    }
                })
            },
            onCancel() {
                console.log('Cancel')
            },
        });
    }
    // 点击搜索
    onSearch = (value) => {
        let id = Cookies.getCookies('id');
        let params = {
            id: id,
            value: value
        }
        CollectAPI.collectSearch(params).then(res => {
            if (res.success) {
                this.setState({
                    newCollectList: res.data
                })
            }
        })
    }

    render() {
        const menu = (
            <Menu onClick={this.handelMenuItem}>
                <Menu.Item key='0'>所有收藏</Menu.Item>
                {
                    this.state.labelList.map(item => {
                        return <Menu.Item key={item.id}>{item.name}</Menu.Item>
                    })
                }
            </Menu>
        );
        return (
            <div className='collect'>
                <div className="collect-container">
                    <div className='collect-container-header'>
                        <div className='collect-container-header-left'>
                            <Dropdown overlay={menu}>
                                <span className="ant-dropdown-link">
                                    {this.state.labelName}<Icon type="down" />
                                </span>
                            </Dropdown>
                        </div>
                        <div className='collect-container-header-right'>
                            <Search
                                placeholder="搜索文章名称"
                                onSearch={value => { this.onSearch(value) }}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>

                    <div className='collect-container-body'>
                        <div className='collect-container-body-top'>
                            <p style={{ width: '40%' }}>名称</p>
                            <p style={{ width: '25%' }}>归属</p>
                            <p style={{ width: '35%' }}>阅读量</p>
                        </div>
                        {
                            this.state.newCollectList.length != 0
                                ?
                                <div>
                                    {
                                        this.state.newCollectList.map((item, index) => {
                                            return <div className='collect-container-body-item' key={index} >
                                                <p style={{ width: '40%' }} id={item.Article.id} >
                                                    <span>
                                                        {item.Article.title}
                                                    </span>
                                                </p>
                                                <p style={{ width: '25%' }}>
                                                    {
                                                        item.Article.User.name
                                                    }
                                                </p>
                                                <p style={{ width: '20%' }}>
                                                    {
                                                        item.Article.readnumber
                                                    }
                                                </p>
                                                <p style={{ flex: 1 }}>
                                                    <span style={{ color: '#1890ff' }} onClick={this.cancelCollect} id={item.id} index={index} >取消收藏</span>
                                                </p>
                                            </div>
                                        })
                                    }
                                </div>
                                :
                                <div className='collect-container-body-null'>
                                    暂无数据
                         </div>
                        }
                    </div>
                    <Spin tip="Loading..." spinning={this.state.loading}>
                        {
                            this.state.isFooter && (this.state.newCollectList.length >= this.state.limit) ?
                                <div className='collect-container-footer'  >
                                    下滑加载
                                 </div>
                                : <div></div>
                        }
                    </Spin>
                </div>
            </div >
        );
    }
}

export default Collect;