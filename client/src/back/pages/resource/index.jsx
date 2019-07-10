import React, { Component } from 'react';
import { Spin, Tabs, Avatar, Button, Switch, Tag, Input, Pagination, message, Modal, Select } from 'antd';
import './index.scss';
import { ResourceAPI } from '../../api';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Search = Input.Search;
const Option = Select.Option;
class Resource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            loading: false,
            pageSize: 8,//每页的条数
            total: 0,//默认的数据总数
            defaultCurrent: 1,//默认当前页
            resourceList: [],//文章列表,
            tag: [],//技术标签列表
            tagName: '',
            tagId: 0,// 筛选资源的id
            color: ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"],

        };
    }
    componentDidMount() {
        this.getResourceInfo();
    }
    // 获取资源信息
    getResourceInfo = () => {
        this.setState({
            loading: true
        })
        let params = {
            page: this.state.defaultCurrent,
            pageSize: this.state.pageSize,
            tgaId: this.state.tagId
        }
        ResourceAPI.getResourceInfo(params).then(res => {
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        resourceList: res.data.resource,
                        total: res.data.total,
                        tag: res.data.tag
                    })
                }, 200)
            }
        })
    }
    // 点击分页
    onChange = (page, pageSize) => {
        this.setState({
            pageSize: pageSize,
            defaultCurrent: page
        }, () => {
            this.getResourceInfo();
        })
    }
    // 删除资源
    delResource = (e) => {
        const resourceid = e.currentTarget.getAttribute('resourceid');
        const that = this;
        confirm({
            title: '删除提示',
            content: '是否确认删除该资源？',
            okType: 'danger',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                ResourceAPI.delResource({ id: resourceid }).then(res => {
                    if (res.success) {
                        that.getResourceInfo();
                    }
                })
            },
            onCancel() { }
        });
    }
    //添加资源类别
    addResourceTag = () => {
        this.setState({
            confirmLoading: true
        })
        let params = {
            tagName: this.state.tagName
        }
        ResourceAPI.addResourceTag(params).then(res => {
            if (res.success) {
                this.getResourceInfo()
                this.setState({
                    confirmLoading: false,
                    visible: false
                })
            } else {
                message.warning(res.message);
                this.setState({
                    confirmLoading: false,
                })
            }
        })
    }
    // 删除技术标签
    delResourceTag = (e) => {
        const dom = e.currentTarget.parentNode
        const tagid = dom.getAttribute('tagid');
        const index = dom.getAttribute('index');
        const params = {
            tagid
        }
        ResourceAPI.delResourceTag(params).then(res => {
            if (res.success) {
                this.state.tag.splice(index, 1);
                this.setState({
                    tag: this.state.tag
                })
            }
        })
    }
    // 筛选资源
    handleChange = (value) => {
        this.setState({
            tagId: value
        }, () => {
            this.getResourceInfo();
        })
    }
    // 成果搜索
    onSerachResource = (value) => {
        if (value === '') {
            message.warning('请输入资源标题');
            return;
        }
        const params = {
            value
        }
        this.setState({
            loading: true
        })
        ResourceAPI.onSerachResource(params).then(res => {
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        resourceList: res.data,
                        total: 1,
                        loading: false
                    })
                }, 200)
            }
        })
    }
    render() {
        return (
            <div className='back-resource'>
                <div className='back-resource-container'>
                    <Spin size='large' tip="数据加载中" spinning={this.state.loading} >
                        <Tabs defaultActiveKey="1"  >
                            <TabPane tab="资源列表" key="1">
                                <div className='back-resource-container-list'>
                                    <div className='back-achievement-container-list-search'>
                                        <div className='back-article-container-list-search-item'>
                                            <span>资源标题：</span>
                                            <Search
                                                index='1'
                                                placeholder="请输入成果标题"
                                                onSearch={(value) => this.onSerachResource(value)}
                                                style={{ width: 200 }}
                                            />
                                        </div>
                                        <div className='back-article-container-list-search-item'>
                                            <span>类别类别：</span>
                                            <Select defaultValue="全部资源" style={{ width: 150 }} onChange={this.handleChange} loading={this.state.loading}>
                                                <Option value="0">全部资源</Option>
                                                {
                                                    this.state.tag.map(item => {
                                                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='back-resource-container-list-header'>

                                        <div className='back-resource-container-list-header-item'>
                                            标题
                                        </div>
                                        <div className='back-resource-container-list-header-item'>
                                            类别
                                        </div>
                                        <div className='back-resource-container-list-header-item'>
                                            附件
                                        </div>
                                        <div className='back-resource-container-list-header-item'>
                                            作者
                                        </div>
                                        <div className='back-resource-container-list-header-item'>
                                            发布时间
                                        </div>
                                        <div className='back-resource-container-list-header-item'>
                                            操作
                                        </div>
                                    </div>
                                    <div className='back-resource-container-list-body'>
                                        {
                                            this.state.resourceList.length !== 0
                                                ?
                                                <div>
                                                    {
                                                        this.state.resourceList.map((item, index) => {
                                                            return <div key={item.id} className='back-resource-container-list-body-list'>
                                                                <div className='back-resource-container-list-body-list-item'>
                                                                    {item.title}
                                                                </div>
                                                                <div className='back-resource-container-list-body-list-item'>
                                                                    <Tag color={this.state.color[Math.floor(Math.random() * 10)]}>{item.ResourceType.name}</Tag>
                                                                </div>
                                                                <div className='back-resource-container-list-body-list-item'>
                                                                    {
                                                                        item.attachment ?
                                                                            <a target='_blank' href={item.attachment}>附件下载</a>
                                                                            :
                                                                            '无附件'
                                                                    }
                                                                </div>
                                                                <div className='back-resource-container-list-body-list-item'>
                                                                    <Avatar src={item.UserInfo.avatar} size="small" icon="user" />
                                                                    {item.UserInfo.User.name}
                                                                </div>
                                                                <div className='back-resource-container-list-body-list-item'>
                                                                    {item.updated_at}
                                                                </div>
                                                                <div className='back-resource-container-list-body-list-item'>
                                                                    {
                                                                        item.link ?
                                                                            <Button type='primary'>
                                                                                <a target='_blank' href={item.link}>查看</a>
                                                                            </Button>
                                                                            :
                                                                            ''
                                                                    }
                                                                    <Button onClick={this.delResource} resourceid={item.id} index={index} type="danger">删除</Button>
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                    <div className='back-user-body-userinfo-pagination'>
                                                        <Pagination
                                                            pageSize={this.state.pageSize}
                                                            showQuickJumper
                                                            onChange={this.onChange}
                                                            defaultCurrent={this.state.defaultCurrent}//默认当前页数
                                                            total={this.state.total}
                                                        />
                                                    </div>

                                                </div>
                                                :
                                                <div className='back-resource-container-list-body-nullData'>
                                                    暂无数据
                                                </div>
                                        }


                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="资源类别" key="2">
                                <div className='back-resource-container-tag'>
                                    <div className='back-resource-container-tag-list'>
                                        {
                                            this.state.tag.map((item, index) => {
                                                return <Tag key={item.id} tagid={item.id} index={index} onClose={this.delResourceTag} closable color={this.state.color[Math.floor(Math.random() * 10)]} >
                                                    {item.name}
                                                </Tag>
                                            })
                                        }
                                    </div>
                                    <Button type='primary' onClick={() => { this.setState({ visible: true }) }} >添加类别</Button>
                                    <Modal
                                        title="添加资源类别"
                                        okText='添加'
                                        cancelText='取消'
                                        visible={this.state.visible}
                                        onOk={this.addResourceTag}
                                        confirmLoading={this.state.confirmLoading}
                                        onCancel={() => this.setState({ visible: false })}
                                    >
                                        <Input placeholder='请输入资源类别' allowClear onChange={(e) => this.setState({ tagName: e.target.value })} ></Input>
                                    </Modal>
                                </div>

                            </TabPane>
                        </Tabs>
                    </Spin>

                </div>
            </div >
        );
    }
}

export default Resource;