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
            loading: true,
            pageSize: 10,//每页的条数
            total: 0,//默认的数据总数
            defaultCurrent: 1,//默认当前页
            articleList: [],//文章列表,
            articleLabel: [],//技术标签列表
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
                console.log(res.data)
                setTimeout(() => {
                    this.setState({
                        articleList: res.data.articleList,
                        total: res.data.total,
                        loading: false
                    })
                }, 500)
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
        const idnex = e.target.getAttribute('index');
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
                        that.state.articleList.splice(idnex, 1)
                        that.setState({
                            articleList: that.state.articleList
                        })
                    }
                })
            },
            onCancel() { }

        });
    }
    render() {
        return (
            <div className='back-article'>
                <div className='back-article-container'>
                    <Spin size='large' spinning={this.state.loading} >
                        <Tabs defaultActiveKey="1"  >
                            <TabPane tab="文章列表" key="1">
                                <div className='back-article-container-list'>
                                    <div className='back-article-container-list-search'>
                                        <div className='back-article-container-list-search-item'>
                                            <span>文章标题：</span>
                                            <Search
                                                placeholder="请输入文章标题"
                                                onSearch={value => console.log(value)}
                                                style={{ width: 200 }}
                                            />
                                        </div>
                                        <div className='back-article-container-list-search-item'>
                                            <span>技术标签：</span>
                                            <Search
                                                placeholder="请输入标签名"
                                                onSearch={value => console.log(value)}
                                                style={{ width: 200 }}
                                            />
                                        </div>
                                        <div className='back-article-container-list-search-item'>
                                            <span>作者姓名：</span>
                                            <Search
                                                placeholder="请输入作者姓名"
                                                onSearch={value => console.log(value)}
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
                                        <div className='back-article-container-list-header-item'>置顶</div>
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
                                                                    {item.updated_at}
                                                                </div>
                                                                <div className='back-article-container-list-body-list-item'>
                                                                    <Switch articleid={item.id} onClick={this.istop} checkedChildren="是" unCheckedChildren="否" defaultChecked={item.top ? true : false} />
                                                                </div>
                                                                <div className='back-article-container-list-body-list-item'>
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
                            </TabPane>
                        </Tabs>
                    </Spin>
                </div>
            </div>
        );
    }
}
export default Article;