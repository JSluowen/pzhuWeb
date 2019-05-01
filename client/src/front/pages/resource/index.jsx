import React, { Component } from 'react'
import { Button, Card, Input, Icon, Avatar, Row, Col, Skeleton, message } from 'antd'
import './index.scss'
import ResourceAPI from '../../api/resource'
const Search = Input.Search;
const { Meta } = Card;

class Resource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,// 获取的数据量
            beg: 0,//截取后台数据开始的位置
            end: 10,//后台数据结束的位置
            resourceType: [],
            resource: [],
            index: 1,//默认查询选项第一个,
            flag: true,
            loading: true,
            isLoading: true
        };
        this.reourceTypeRef = React.createRef();

    }

    componentDidMount() {
        this.getResource()
        window.addEventListener('scroll', this.handelScroll)
    }
    // 设置初始化的资源分类
    setResourceTyep = () => {
        let e = this.reourceTypeRef.current;
        e = e.childNodes;
        e[1].classList.add('resourceActive')
        this.setState({
            flag:false
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
        if (height <= 10) {
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
            this.getResource()
        }
    }
    // 筛选资源类别
    filterResource = (e) => {
        let event
        if (e.target.tagName == "DIV") {
            event = e.target
        } else {
            event = e.target.parentNode
        }
        let parent = event.parentNode.children
        for (let i = 0; i < parent.length; i++) {
            parent[i].classList.remove("resourceActive");
        }
        event.classList.add('resourceActive')
        let index = event.getAttribute('index')

        if (this.state.index === parseInt(index)) {
            return
        } else {
            this.setState({
                index: parseInt(index),
                flag: false,
                loading: true,
                beg: 0,
                end: this.state.limit,
                resource:[]
            }, () => {
                this.getResource();
            })
        }
    }
    // 搜索资源
    handelSerach = (value) => {
        if (value === '') {
            message.warning('请先输入资源标题')
            return;
        }
        let params = {
            value: value
        }
        this.setState({
            loading: true
        })
        ResourceAPI.serachResource(params).then(res => {
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        resource: res.data
                    })
                    message.success('搜索成功')
                }, 500)
            } else {
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                    message.warning('未搜索到您想要的资源')
                }, 500)
            }
        })
    }
    getResource = () => {
        let params = {
            beg: this.state.beg,
            end: this.state.end,
            index: this.state.index,
        }
        ResourceAPI.getResource(params).then(res => {
            let arry = this.state.resource
            for (let item of res.data.resource) {
                arry.push(item)
            }
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        resourceType: res.data.resourceType,
                        resource: arry,
                        loading: false,
                        isLoading:true
                    })
                    if (this.state.flag) this.setResourceTyep()
                }, 500)
            } else {
                setTimeout(() => {
                    this.setState({
                        resourceType: res.data.resourceType,
                        resource: arry,
                        loading: false,
                        isLoading: false
                    })
                    if (this.state.flag) this.setResourceTyep()
                }, 500)
            }
        })
    }
    render() {
        return (
            <div className='resource'>
                <div className='resource-left' ref={this.reourceTypeRef} >
                    <div className='resource-left-header'  >
                        资源分类
                    </div>
                    {
                        this.state.resourceType.map(item => {
                            return <div className='resource-left-item' onClick={this.filterResource} index={item.id} key={item.id}>
                                <p>{item.name}</p>
                                <p>{item.index}</p>
                            </div>
                        })
                    }
                </div>
                <div className='resource-right'>
                    <Card
                        title={this.state.resourceType.map(item => {
                            if (item.id === this.state.index) {
                                return item.name
                            }
                        })}
                        style={{ width: '100%' }}
                        extra={<Search
                            placeholder="请输入资源标题"
                            onSearch={value => this.handelSerach(value)}
                            style={{ width: 200 }}
                        />}
                    >
                        <Skeleton loading={this.state.loading} active>
                            <Row style={{ width: '100%', margin: 0 }} gutter={16}>
                                {
                                    this.state.resource.map(item => {
                                        return <Col span={12} key={item.id} >
                                            <Card
                                                className="resource-right-item"
                                                hoverable={true}
                                                actions={[<span><Icon type="like" />{" "}2</span>, <span><Icon type="message" />{" "}10</span>, <Icon type="star" />]}
                                            >
                                                <div className='resource-right-item-header'>
                                                    <Avatar size={55} src={item.UserInfo.avatar} />
                                                    <div className='resource-right-item-header-info'>
                                                        <p style={{ fontWeight: '600', fontSize: '17px' }}>{item.UserInfo.User.name}</p>
                                                        <p> <Icon type="calendar" />{" "}{item.created_at}</p>
                                                    </div>
                                                    <Button link={item.link} type='primary' ghost >点击获取</Button>
                                                </div>
                                                <div className='resource-right-item-body'>
                                                    <p style={{ fontSize: '18px', fontWeight: '600' }}>{item.title}</p>
                                                    <p>
                                                        {
                                                            item.description
                                                        }
                                                    </p>
                                                    <div className='resource-right-item-body-cover'>
                                                        <img src={item.posterlink} alt="" />
                                                    </div>
                                                </div>

                                            </Card>
                                        </Col>

                                    })
                                }
                            </Row>
                        </Skeleton>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Resource;