import React, { Component } from 'react'
import { Icon, Card, Button, Avatar, Row, Col } from 'antd'
import './index.scss'
const { Meta } = Card
class Achievement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='achievement'>
                <div className='achievement-left'>
                    <div className='achievement-left-header'>
                        成果分类
                    </div>
                    <div className='achievement-left-item'>
                        <p> 全部</p>
                    </div>
                    <div className='achievement-left-item'>
                        <p> 学术论文</p>
                        <p>10份</p>
                    </div>
                    <div className='achievement-left-item'>

                        <p> 科研项目</p>
                        <p>10份</p></div>
                    <div className='achievement-left-item'>

                        <p> 软件成果</p>
                        <p>10份</p></div>
                    <div className='achievement-left-item'>

                        <p> 竞赛获奖</p>
                        <p>10份</p></div>
                    <div className='achievement-left-item'>

                        <p> 教研教改</p>
                        <p>10份</p></div>
                    <div className='achievement-left-item'>

                        <p> 大创项目</p>
                        <p>10份</p></div>
                </div>
                <div className='achievement-right'>
                    <Card
                        title="全部"
                        style={{ width: '100%' }}
                    >

                        <Row gutter={16}>
                            <Col span={8}>
                                <Card
                                    className="achievement-right-item"
                                    hoverable={true}
                                    loading={false}
                                    style={{ width: '100%' }}
                                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    actions={[<span><Icon type="user" />{" "}张小三</span>, <span><Icon type="calendar" />{" "}2019-4-23</span>]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title="Card title"
                                        description=""
                                    />
                                </Card>

                            </Col>
                            <Col span={8}>
                                <Card
                                    className="achievement-right-item"
                                    hoverable={true}
                                    loading={false}
                                    style={{ width: '100%' }}

                                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    actions={[<span><Icon type="user" />{" "}张小三</span>, <span><Icon type="calendar" />{" "}2019-4-23</span>]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title="Card title"
                                        description="这是测试文件这是测试文件这是测试文件"
                                    />
                                </Card>

                            </Col>
                            <Col span={8}>
                                <Card
                                    className="achievement-right-item"
                                    hoverable={true}
                                    loading={false}
                                    style={{ width: '100%' }}
                                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    actions={[<span><Icon type="user" />{" "}张小三</span>, <span><Icon type="calendar" />{" "}2019-4-23</span>]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title="Card title"
                                        description="这是测试文件这是测试文件这是测试文件这是测试文件这是测试文件这是测试文件这是测试文件"
                                    />
                                </Card>

                            </Col>
                            <Col span={8}>
                                <Card
                                    className="achievement-right-item"
                                    hoverable={true}
                                    loading={false}
                                    style={{ width: '100%' }}

                                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    actions={[<span><Icon type="user" />{" "}张小三</span>, <span><Icon type="calendar" />{" "}2019-4-23</span>]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title="Card title"
                                        description=""
                                    />
                                </Card>

                            </Col>

                            <Col span={8}>
                                <Card
                                    className="achievement-right-item"
                                    hoverable={true}
                                    loading={false}
                                    style={{ width: '100%' }}

                                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    actions={[<span><Icon type="user" />{" "}张小三</span>, <span><Icon type="calendar" />{" "}2019-4-23</span>]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title="Card title"
                                        description="这是测试文件这是测试文件这是测试文件"
                                    />
                                </Card>

                            </Col>
                            <Col span={8}>
                                <Card
                                    className="achievement-right-item"
                                    hoverable={true}
                                    loading={false}
                                    style={{ width: '100%' }}

                                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    actions={[<span><Icon type="user" />{" "}张小三</span>, <span><Icon type="calendar" />{" "}2019-4-23</span>]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title="Card title"
                                        description=""
                                    />
                                </Card>

                            </Col>
                           
                        </Row>


                    </Card>

                </div>
            </div>
        );
    }
}

export default Achievement;