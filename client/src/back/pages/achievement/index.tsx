import React, { Component } from 'react';
import { Spin, Tabs, Avatar, Button, Tag, Input, Pagination, message, Modal, Select, Switch, Icon } from 'antd';
import AchievementIssue from './components/AchievementIssue';
import './index.scss';
import { Base, Post } from 'back/api';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const confirm = Modal.confirm;
const Search = Input.Search;
export interface IProps {}
export interface IState {
  visible: boolean;
  confirmLoading: boolean;
  loading: boolean;
  pageSize: number;
  total: number;
  defaultCurrent: number;
  achievementList: Array<{ [key: string]: any }>;
  tag: Array<{ [key: string]: any }>;
  tagName: string;
  tagId: number;
  color: Array<string>;
  activeKey: string;
}
class Achievement extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      loading: false,
      pageSize: 8, // 每页的条数
      total: 0, // 默认的数据总数
      defaultCurrent: 1, // 默认当前页
      achievementList: [], // 文章列表,
      tag: [], // 技术标签列表
      tagName: '', // 添加的标签名
      tagId: 0, // 筛选成果
      color: ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'],
      activeKey: '1',
    };
  }
  componentDidMount() {
    this.getAchievementInfo();
  }
  // 获取资源信息
  getAchievementInfo = () => {
    this.setState({
      loading: true,
    });
    const params = {
      page: this.state.defaultCurrent,
      pageSize: this.state.pageSize,
      tagId: this.state.tagId,
    };
    Post(Base.getAchievementInfo, params).then(res => {
      if (res.success) {
        console.log(res.data.achievement);
        setTimeout(() => {
          this.setState({
            loading: false,
            achievementList: res.data.achievement,
            total: res.data.total,
            tag: res.data.tag,
          });
        }, 200);
      }
    });
  };
  // 点击分页
  onChange = (page, pageSize) => {
    this.setState(
      {
        pageSize,
        defaultCurrent: page,
      },
      () => {
        this.getAchievementInfo();
      },
    );
  };
  // 删除资源
  delAchievement = e => {
    const resourceid = e.currentTarget.getAttribute('data-resourceid');
    const that = this;
    confirm({
      title: '删除提示',
      content: '是否确认删除该资源？',
      okType: 'danger',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        Post(Base.delAchievement, { id: resourceid }).then(res => {
          if (res.success) {
            that.getAchievementInfo();
          }
        });
      },
      onCancel() {},
    });
  };
  // 添加资源类别
  addAchievementTag = () => {
    this.setState({
      confirmLoading: true,
    });
    const params = {
      tagName: this.state.tagName,
    };
    Post(Base.addAchievementTag, params).then(res => {
      if (res.success) {
        this.getAchievementInfo();
        this.setState({
          confirmLoading: false,
          visible: false,
        });
      } else {
        message.warning(res.message);
        this.setState({
          confirmLoading: false,
        });
      }
    });
  };
  // 删除技术标签
  delAchievementTag = e => {
    const dom = e.currentTarget.parentNode;
    const tagid = dom.getAttribute('data-tagid');
    const index = dom.getAttribute('data-index');
    const params = {
      tagid,
    };
    Post(Base.delAchievementTag, params).then(res => {
      if (res.success) {
        this.state.tag.splice(index, 1);
        this.setState({
          tag: this.state.tag,
        });
      }
    });
  };
  // 筛选资源
  handleChange = value => {
    this.setState(
      {
        tagId: value,
      },
      () => {
        this.getAchievementInfo();
      },
    );
  };
  // 成果搜索
  onSerachAchievement = value => {
    if (value === '') {
      message.warning('请输入成果标题');
      return;
    }
    const params = {
      value,
    };
    this.setState({
      loading: true,
    });
    Post(Base.onSerachAchievement, params).then(res => {
      if (res.success) {
        setTimeout(() => {
          this.setState({
            achievementList: res.data,
            total: 1,
            loading: false,
          });
        }, 200);
      }
    });
  };
  // 是否首页显示成果
  isShow = (checked, event) => {
    const id = event.currentTarget.getAttribute('data-achid');
    const params = {
      checked,
      id,
    };
    Post(Base.isShow, params);
  };
  render() {
    return (
      <div className="back-achievement">
        <div className="back-achievement-container">
          <Spin tip="数据加载中" size="large" spinning={this.state.loading}>
            <Tabs
              defaultActiveKey="1"
              activeKey={this.state.activeKey}
              onChange={activeKey => {
                this.setState({ activeKey });
              }}
            >
              <TabPane tab="成果列表" key="1">
                <div className="back-achievement-container-list">
                  <div className="back-achievement-container-list-search">
                    <div className="back-article-container-list-search-item">
                      <span>成果标题：</span>
                      <Search
                        data-index="1"
                        placeholder="请输入成果标题"
                        onSearch={value => this.onSerachAchievement(value)}
                        style={{ width: 200 }}
                      />
                    </div>
                    <div className="back-article-container-list-search-item">
                      <span>成果类别：</span>
                      <Select
                        defaultValue="全部资源"
                        style={{ width: 150 }}
                        onChange={this.handleChange}
                        loading={this.state.loading}
                      >
                        <Option value="0">全部资源</Option>
                        {this.state.tag.map(item => {
                          return (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className="back-achievement-container-list-header">
                    <div className="back-achievement-container-list-header-item">标题</div>
                    <div className="back-achievement-container-list-header-item">类别</div>
                    <div className="back-achievement-container-list-header-item">附件</div>
                    <div className="back-achievement-container-list-header-item">展示</div>
                    <div className="back-achievement-container-list-header-item">作者</div>
                    <div className="back-achievement-container-list-header-item">发布时间</div>
                    <div className="back-achievement-container-list-header-item">操作</div>
                  </div>
                  <div className="back-achievement-container-list-body">
                    {this.state.achievementList.length !== 0 ? (
                      <div>
                        {this.state.achievementList.map((item, index) => {
                          return (
                            <div key={item.id} className="back-achievement-container-list-body-list">
                              <div className="back-achievement-container-list-body-list-item">{item.title}</div>
                              <div className="back-achievement-container-list-body-list-item">
                                <Tag color={this.state.color[Math.floor(Math.random() * 10)]}>
                                  {item.AchievementType.name}
                                </Tag>
                              </div>
                              <div className="back-achievement-container-list-body-list-item">
                                {item.attachment ? (
                                  <a target="_blank" href={item.attachment}>
                                    附件下载
                                  </a>
                                ) : (
                                  '无附件'
                                )}
                              </div>
                              <div className="back-achievement-container-list-body-list-item">
                                <Switch
                                  data-achid={item.id}
                                  onClick={this.isShow}
                                  checkedChildren="是"
                                  unCheckedChildren="否"
                                  defaultChecked={!!item.show}
                                />
                              </div>
                              <div className="back-achievement-container-list-body-list-item">
                                <Avatar src={item.UserInfo.avatar} size="small" icon="user" />
                                {item.UserInfo.User.name}
                              </div>
                              <div className="back-achievement-container-list-body-list-item">{item.created_at}</div>
                              <div className="back-achievement-container-list-body-list-item">
                                {item.achievementlink ? (
                                  <Button type="primary">
                                    <a target="_blank" href={item.achievementlink}>
                                      查看
                                    </a>
                                  </Button>
                                ) : (
                                  ''
                                )}
                                <Button
                                  onClick={this.delAchievement}
                                  data-resourceid={item.id}
                                  data-index={index}
                                  type="danger"
                                >
                                  删除
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                        <div className="back-user-body-userinfo-pagination">
                          <Pagination
                            pageSize={this.state.pageSize}
                            showQuickJumper
                            onChange={this.onChange}
                            defaultCurrent={this.state.defaultCurrent} // 默认当前页数
                            total={this.state.total}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="back-achievement-container-list-body-nullData">暂无数据</div>
                    )}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="成果类别" key="2">
                <div className="back-achievement-container-tag">
                  <div className="back-achievement-container-tag-list">
                    {this.state.tag.map((item, index) => {
                      return (
                        <Tag
                          key={item.id}
                          data-tagid={item.id}
                          data-index={index}
                          onClose={this.delAchievementTag}
                          closable
                          color={this.state.color[Math.floor(Math.random() * 10)]}
                        >
                          {item.name}
                        </Tag>
                      );
                    })}
                  </div>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.setState({ visible: true });
                    }}
                  >
                    添加类别
                  </Button>
                  <Modal
                    title="添加成果类别"
                    okText="添加"
                    cancelText="取消"
                    visible={this.state.visible}
                    onOk={this.addAchievementTag}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={() => this.setState({ visible: false })}
                  >
                    <Input
                      placeholder="请输入成果类别"
                      allowClear
                      onChange={e => this.setState({ tagName: e.target.value })}
                    ></Input>
                  </Modal>
                </div>
              </TabPane>
              <TabPane tab="添加成果" key="3">
                {this.state.activeKey === '3' && (
                  <AchievementIssue
                    onSuccess={() => {
                      this.setState({ activeKey: '1' });
                    }}
                  />
                )}
              </TabPane>
            </Tabs>
          </Spin>
        </div>
        {/* <AddAchievementModal visible={this.state.addVisible} onChangeVisible={(visible) => this.setState({ addVisible: visible })} /> */}
      </div>
    );
  }
}

export default Achievement;
