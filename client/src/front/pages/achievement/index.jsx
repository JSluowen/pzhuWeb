import React, { Component } from 'react'
import { Icon, Card, Button, Avatar, Row, Col, Input, Skeleton, message } from 'antd'
import './index.scss'
import AchievementAPI from '../../api/achievement'
const { Meta } = Card;
const Search = Input.Search;
class Achievement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,// 获取的数据量
            beg: 0,
            end: 10,
            loading: true,
            isLoading: true,
            acType: [], // 成果类别
            ac: [], // 成果资源
            flag: true,
            index: 0,
            total: 0,//获取总的资源数目
        };
        this.achievementTypeRef = React.createRef();
    }
    componentDidMount() {
        this.getAchievement()
        window.addEventListener('scroll', this.handelScroll)
    }
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
            this.getAchievement()
        }
    }
    // 设置初始化的资源分类
    setAchievementTyep = () => {
        let e = this.achievementTypeRef.current;
        e = e.childNodes;
        e[1].classList.add('achievementActive');
        this.setState({
            flag: false
        })
    }

    getAchievement = () => {
        let params = {
            beg: this.state.beg,
            end: this.state.end,
            index: this.state.index
        }
        AchievementAPI.getAachievement(params).then(res => {
            let arry = this.state.ac;
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
                    if (this.state.flag) {
                        this.setAchievementTyep();
                        this.setState({
                            total: arry.length
                        })
                    }
                }, 500)
            } else {
                setTimeout(() => {
                    this.setState({
                        acType: res.data.acType,
                        ac: arry,
                        loading: false,
                        isLoading: false
                    })
                    if (this.state.flag) {
                        this.setAchievementTyep();
                        this.setState({
                            total: arry.length
                        })
                    }
                }, 500)
            }
        })
    }
    // 筛选成果类别
    filterAchievement = (e) => {
        let event
        if (e.target.tagName == "DIV") {
            event = e.target
        } else {
            event = e.target.parentNode
        }
        let parent = event.parentNode.children
        for (let i = 0; i < parent.length; i++) {
            parent[i].classList.remove("achievementActive");
        }
        event.classList.add('achievementActive')
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
                ac: []
            }, () => {
                this.getAchievement();
            })
        }

    }
    // 搜索资源
    handelSerach = (value) => {
        if (value === '') {
            message.warning('请先输入成果标题')
            return;
        }
        let params = {
            value: value
        }
        this.setState({
            loading: true
        })
        AchievementAPI.searchAchievement(params).then(res => {
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        ac: res.data
                    })
                }, 500)
                message.success('搜索成功')
            } else {
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                }, 500)
                message.warning('为搜索到您想要的资源')
            }
        })
    }

    render() {
        return (
            <div className='achievement'>
                <div className='achievement-left' ref={this.achievementTypeRef}>
                    <div className='achievement-left-header'>
                        成果分类
                    </div>
                    <div className='achievement-left-item' index="0" key="0" onClick={this.filterAchievement} >
                        <p>全部</p>
                        <p>{this.state.total}</p>
                    </div>
                    {
                        this.state.acType.map(item => {
                            return <div className='achievement-left-item' index={item.id} key={item.id} onClick={this.filterAchievement} >
                                <p> {item.name}</p>
                                <p>{item.index}</p>
                            </div>

                        })
                    }
                </div>
                <div className='achievement-right'>
                    <Card
                        title={this.state.acType.map(item => {
                            if (item.id === this.state.index) {
                                return item.name
                            }
                        })}
                        style={{ width: '100%' }}
                        extra={<Search
                            placeholder="请输入成果标题"
                            onSearch={value => this.handelSerach(value)}
                            style={{ width: 200 }}
                        />}
                    >
                        <Skeleton loading={this.state.loading} active>
                            <Row style={{ width: '100%', margin: 0 }} gutter={16}>
                                {
                                    this.state.ac.length === 0 ?
                                        <div className='achievement-right-null'>
                                            暂无数据
                                        </div>
                                        :
                                        <div>
                                            {
                                                this.state.ac.map(item => {
                                                    return <Col span={12} key={item.id} >
                                                        <a style={{ display: 'block' }} href={item.achievementlink || item.attachment} target='_blank'>
                                                            <Card
                                                                className="achievement-right-item"
                                                                hoverable={true}
                                                                loading={false}
                                                                style={{ width: '100%' }}
                                                                cover={<img alt="example" src={item.posterlink} />}
                                                                actions={[<span><Icon type="user" />{" "}{item.UserInfo.User.name}</span>, <span><Icon type="calendar" />{" "}{item.created_at}</span>]}
                                                            >
                                                                <Meta
                                                                    style={{ width: '100%' }}
                                                                    avatar={<Avatar src={item.UserInfo.avatar} />}
                                                                    title={item.title}
                                                                    description={item.abstract}
                                                                />
                                                            </Card>
                                                        </a>

                                                    </Col>
                                                })
                                            }
                                        </div>
                                }
                            </Row>

                        </Skeleton>

                    </Card>

                </div>
            </div>
        );
    }
}

export default Achievement;