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
            beg: 0,
            end: 10,
            loading: false,
            acType: [], // 成果类别
            ac: [], // 成果资源
            flag: true,
            index: 1
        };
        this.achievementTypeRef = React.createRef();
    }
    componentDidMount() {
        this.getAchievement()
    }
    // 设置初始化的资源分类
    setAchievementTyep = () => {
        let e = this.achievementTypeRef.current;
        e = e.childNodes;
        e[1].classList.add('achievementActive')
    }
    getAchievement = () => {
        let params = {
            beg: this.state.beg,
            end: this.state.end,
            index: this.state.index
        }
        this.setState({
            loading: true
        })
        AchievementAPI.getAachievement(params).then(res => {
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        acType: res.data.acType,
                        ac: res.data.ac
                    })
                    if (this.state.flag) this.setAchievementTyep()
                }, 1000)
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

        if (this.state.index === index) {
            return
        } else {
            this.setState({
                index: parseInt(index),
                flag: false,
                loading: true
            }, () => {
                this.getAchievement();
            })
        }

    }
    // 搜索资源
    handelSerach = (value) => {
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
                            <Row gutter={16}>
                                {
                                    this.state.ac.map(item => {
                                        return <Col span={12} key={item.id} >
                                            <Card
                                                className="achievement-right-item"
                                                hoverable={true}
                                                loading={false}
                                                style={{ width: '100%' }}
                                                cover={<img alt="example" src={item.posterlink} />}
                                                actions={[<span><Icon type="user" />{" "}{item.UserInfo.User.name}</span>, <span><Icon type="calendar" />{" "}{item.updated_at}</span>]}
                                            >
                                                <Meta
                                                    style={{ width: '100%' }}
                                                    avatar={<Avatar src={item.UserInfo.avatar} />}
                                                    title={item.title}
                                                    description={item.abstract}
                                                />
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

export default Achievement;