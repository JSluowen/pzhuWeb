import React, { Component } from 'react';
import { Spin, Tabs, Avatar, Button, Switch, Tag, Input, Pagination, message, Modal } from 'antd';
import './index.scss';
import { ArticleAPI } from '../../api'
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const confirm = Modal.confirm;
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            loading: true,
            pageSize: 8,//每页的条数
            total: 0,//默认的数据总数
            defaultCurrent: 1,//默认当前页
            articleList: [],//文章列表,
            tag: [],//技术标签列表
            tagName: '',
            color: ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"],
        };
    }
    componentDidMount() {
        this.getArticleInfo();
    }
    // 获取文章的信息
    getArticleInfo = () => {
        this.setState({
            loading: true
        })
        let params = {
            page: this.state.defaultCurrent,
            pageSize: this.state.pageSize
        }
        ArticleAPI.getArticleInfo(params).then(res => {
            if (res.success) {
                setTimeout(() => {
                    this.setState({
                        articleList: res.data.articleList,
                        total: res.data.total,
                        tag: res.data.tag,
                        loading: false
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
            this.getArticleInfo();
        })
    }
    // 文章是否置顶
    istop = (checked, event) => {
        let id = event.currentTarget.getAttribute('articleid');
        const params = {
            checked: checked,
            id: id
        }
        ArticleAPI.istop(params);
    }
    // 删除文章
    deleteArticle = (e) => {
        const id = e.target.getAttribute('articleid');
        const that = this;
        confirm({
            title: '删除提示',
            content: '是否确认删除该文章？',
            okType: 'danger',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                ArticleAPI.deleteArticle({ id }).then(res => {
                    if (res.success) {
                        that.getArticleInfo();
                    }
                })
            },
            onCancel() { }

        });
    }
    // 文章的搜索
    onSerachArticle = (value, event) => {
        const dom = event.currentTarget.parentNode.previousSibling
        const index = dom.getAttribute('index');
        if (value === '') {
            if (index === '1') {
                message.warning('请输入文章标题');
            } else if (index === '2') {
                message.warning('请输入技术标签');
            } else if (index === '3') {
                message.warning('请输入作者姓名');
            }
            return;
        }
        const params = {
            index,
            value
        }
        ArticleAPI.onSerachArticle(params).then(res => {
            if (res.success) {
                this.setState({
                    articleList: res.data,
                    total: 1
                })
            }
        })

    }
    // 删除技术标签
    delArticleTag = (e) => {
        const dom = e.currentTarget.parentNode
        const tagid = dom.getAttribute('tagid');
        const index = dom.getAttribute('index');
        const params = {
            tagid
        }
        ArticleAPI.delArticleTag(params).then(res => {
            if (res.success) {
                this.state.tag.splice(index, 1);
                this.setState({
                    tag: this.state.tag
                })
            }
        })
    }
    //添加技术标签
    addArticleTag = () => {
        this.setState({
            confirmLoading: true
        })
        let params = {
            tagName: this.state.tagName
        }
        ArticleAPI.addArticleTag(params).then(res => {
            if (res.success) {
                this.getArticleInfo()
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
    // 修改文章
    articleEdit = (e) => {
        const id = e.currentTarget.getAttribute('articleId');
        this.props.router.push(`/back/articleEdit/${id}`);
    }
    render() {
        return (
            <div className='back-article'>
                <div className='back-article-container'>
                    <Spin tip="数据加载中" size='large' spinning={this.state.loading} >
                        <Tabs defaultActiveKey="1"  >
                            <TabPane tab="文章列表" key="1">
                                <div className='back-article-container-list'>
                                    <div className='back-article-container-list-search'>
                                        <div className='back-article-container-list-search-item'>
                                            <span>文章标题：</span>
                                            <Search
                                                index='1'
                                                placeholder="请输入文章标题"
                                                onSearch={(value, e) => this.onSerachArticle(value, e)}
                                                style={{ width: 200 }}
                                            />
                                        </div>
                                    </div>
                                    <div className='back-article-container-list-header'>
                                        <div className='back-article-container-list-header-item'>
                                            标题
                                        </div>
                                        <div className='back-article-container-list-header-item'>
                                            关键字
                                        </div>
                                        <div className='back-article-container-list-header-item'>
                                            标签
                                        </div>
                                        <div className='back-article-container-list-header-item'>
                                            作者
                                        </div>
                                        <div className='back-article-container-list-header-item'>
                                            发布时间
                                        </div>
                                        <div className='back-article-container-list-header-item'>
                                            轮播
                                        </div>
                                        <div className='back-article-container-list-header-item'>
                                            操作
                                        </div>
                                    </div>
                                    <div className='back-article-container-list-body'>
                                        {
                                            this.state.articleList.length !== 0 ?
                                                <div>
                                                    {
                                                        this.state.articleList.map((item, index) => {
                                                            return <div key={item.id} className='back-article-container-list-body-list'>
                                                                <div className='back-article-container-list-body-list-item'>
                                                                    {item.title}
                                                                </div>
                                                                <div className='back-article-container-list-body-list-item'>
                                                                    {item.keywords}
                                                                </div>
                                                                <div className='back-article-container-list-body-list-item'>
                                                                    <Tag color={this.state.color[Math.floor(Math.random() * 10)]}>{item.Technology.name}</Tag>
                                                                </div>
                                                                <div className='back-article-container-list-body-list-item'>
                                                                    <Avatar src={item.UserInfo.avatar} size="small" icon="user" />
                                                                    {item.UserInfo.User.name}
                                                                </div>
                                                                <div className='back-article-container-list-body-list-item'>
                                                                    {item.created_at}
                                                                </div>
                                                                <div className='back-article-container-list-body-list-item'>
                                                                    <Switch articleid={item.id} onClick={this.istop} checkedChildren="是" unCheckedChildren="否" defaultChecked={item.top ? true : false} />
                                                                </div>
                                                                <div className='back-article-container-list-body-list-item'>
                                                                    <Button onClick={this.articleEdit} idnex={index} articleid={item.id} ghost type="primary">修改</Button>
                                                                    <Button onClick={this.deleteArticle} idnex={index} articleid={item.id} type="danger">删除</Button>
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
                                                <div className='back-article-container-list-body-nullData'>
                                                    暂无数据
                                                </div>
                                        }
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="标签列表" key="2">
                                <div className='back-article-container-tag'>
                                    <div className='back-article-container-tag-list'>
                                        {
                                            this.state.tag.map((item, index) => {
                                                return <Tag index={index} tagid={item.id} key={item.id} onClose={this.delArticleTag} closable color={this.state.color[Math.floor(Math.random() * 10)]} >
                                                    {item.name}
                                                </Tag>
                                            })
                                        }
                                    </div>
                                    <Button type='primary' onClick={() => { this.setState({ visible: true }) }} >添加标签</Button>
                                    <Modal
                                        title="添加技术标签"
                                        okText='添加'
                                        cancelText='取消'
                                        visible={this.state.visible}
                                        onOk={this.addArticleTag}
                                        confirmLoading={this.state.confirmLoading}
                                        onCancel={() => this.setState({ visible: false })}
                                    >
                                        <Input placeholder='请输入标签名' allowClear onChange={(e) => this.setState({ tagName: e.target.value })} ></Input>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Spin>
                </div>
            </div>
        );
    }
}
export default Article;