import React, { Component } from 'react'
import { Button, Card, Input, Icon, Avatar, Row, Col } from 'antd'
import './index.scss'
import ResourceAPI from '../../api/resource'
const Search = Input.Search;
const { Meta } = Card;

class Resource extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getResource()
    }

    getResource = () => {
        ResourceAPI.getResource().then(res => {
            if (res.success) {
                console.log(res.data)
            }
        })
    }

    render() {
        return (
            <div className='resource'>
                <div className='resource-left'>
                    <div className='resource-left-header'>
                        资源分类
                    </div>
                    <div className='resource-left-item'>
                        <p>绿色软件</p>
                        <p>10</p>
                    </div>
                    <div className='resource-left-item'>

                        <p>科学上网</p>
                        <p>10</p></div>
                    <div className='resource-left-item'>

                        <p>视频教程</p>
                        <p>10</p></div>
                    <div className='resource-left-item'>

                        <p>生产工具</p>
                        <p>10</p></div>
                </div>
                <div className='resource-right'>
                    <Card
                        title="全部"
                        style={{ width: '100%' }}
                        extra={<Search
                            placeholder="请输入资源标题"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />}
                    >
                        <Row style={{ width: '100%', margin: 0 }} gutter={16}>
                            <Col span={12}>
                                <Card
                                    className="resource-right-item"
                                    hoverable={true}
                                    actions={[<span><Icon type="like" />{" "}2</span>, <span><Icon type="message" />{" "}10</span>, <Icon type="star" />]}
                                >
                                    <div className='resource-right-item-header'>
                                        <Avatar size={55} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <div className='resource-right-item-header-info'>
                                            <p style={{ fontWeight: '600', fontSize: '17px' }}>张三</p>
                                            <p> <Icon type="calendar" />{" "}2018-12-10</p>
                                        </div>
                                        <Button type='primary' ghost >点击获取</Button>
                                    </div>
                                    <div className='resource-right-item-body'>
                                        <p>
                                            于命令行图形界面的网络协议分析器 。亮点：
                                            读取 pcap 文件或嗅探实时接口（支持 tshark）。
                                            使用类 Wireshark 视图检查每个数据包
                                            使用 Wireshark 的显示过滤器过滤 pcaps 或实时捕获
                                            将数据包范围从终端复制到剪贴板
                                        </p>
                                        <div className='resource-right-item-body-cover'>
                                            <img src="http://img.pzhuweb.cn/2.jpg" alt="" />
                                        </div>
                                    </div>

                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card
                                    className="resource-right-item"
                                    hoverable={true}
                                    actions={[<span><Icon type="like" />{" "}2</span>, <span><Icon type="message" />{" "}10</span>, <Icon type="star" />]}
                                >
                                    <div className='resource-right-item-header'>
                                        <Avatar size={55} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <div className='resource-right-item-header-info'>
                                            <p style={{ fontWeight: '600', fontSize: '17px' }}>张三</p>
                                            <p> <Icon type="calendar" />{" "}2018-12-10</p>
                                        </div>
                                        <Button type='primary' ghost >点击获取</Button>
                                    </div>
                                    <div className='resource-right-item-body'>
                                        <p>
                                            于命令行图形界面的网络协议分析器 。亮点：
                                            读取 pcap 文件或嗅探实时接口（支持 tshark）。
                                            使用类 Wireshark 视图检查每个数据包
                                            使用 Wireshark 的显示过滤器过滤 pcaps 或实时捕获
                                            将数据包范围从终端复制到剪贴板
                                        </p>
                                        <div className='resource-right-item-body-cover'>
                                            <img src="http://img.pzhuweb.cn/2.jpg" alt="" />
                                        </div>
                                    </div>

                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card
                                    className="resource-right-item"
                                    hoverable={true}
                                    actions={[<span><Icon type="like" />{" "}2</span>, <span><Icon type="message" />{" "}10</span>, <Icon type="star" />]}
                                >
                                    <div className='resource-right-item-header'>
                                        <Avatar size={55} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <div className='resource-right-item-header-info'>
                                            <p style={{ fontWeight: '600', fontSize: '17px' }}>张三</p>
                                            <p> <Icon type="calendar" />{" "}2018-12-10</p>
                                        </div>
                                        <Button type='primary' ghost >点击获取</Button>
                                    </div>
                                    <div className='resource-right-item-body'>
                                        <p>
                                            于命令行图形界面的网络协议分析器 。亮点：
                                            读取 pcap 文件或嗅探实时接口（支持 tshark）。
                                            使用类 Wireshark 视图检查每个数据包
                                            使用 Wireshark 的显示过滤器过滤 pcaps 或实时捕获
                                            将数据包范围从终端复制到剪贴板
                                        </p>
                                        <div className='resource-right-item-body-cover'>
                                            <img src="http://img.pzhuweb.cn/2.jpg" alt="" />
                                        </div>
                                    </div>

                                </Card>
                            </Col>


                        </Row>


                    </Card>
                </div>
            </div>
        );
    }
}

export default Resource;