import React, { useState, useEffect, FC, useRef } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Button, Card, Input, Icon, Avatar, Row, Col, Skeleton, message } from 'antd';
import { Base, Post } from 'front/api';
import './index.scss';

export type TState = {
  beg: number;
  end: number;
  isScroll: boolean;
  resource: Array<any>;
};
const Resource: FC = () => {
  const [limit, setLimit] = useState<number>(12); // 获取的数据量
  const [state, setState] = useState<TState>({ beg: 0, end: 6, isScroll: false, resource: [] });
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [resourceType, setResourceType] = useState<Array<any>>([]); //成果类别
  const [flag, setFlag] = useState<boolean>(true);
  const isLoading = useRef(true);
  const resourceTypeRef = useRef(null);
  // 设置初始化的资源分类

  const setSourceTyep = () => {
    if (resourceTypeRef.current) return;
    let e = resourceTypeRef.current.childNodes;
    e[1].classList.add('resourceActive');
    setFlag(false);
  };
  // 筛选资源类别
  const filterResource = e => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    let event;
    if (e.target.tagName === 'DIV') {
      event = e.target;
    } else {
      event = e.target.parentNode;
    }
    const parent = event.parentNode.children;
    for (let i = 0; i < parent.length; i++) {
      parent[i].classList.remove('resourceActive');
    }
    event.classList.add('resourceActive');
    const num = event.dataset.index;
    if (index == parseInt(num)) {
      return;
    }

    setIndex(num);
    setFlag(false);
    setState(prev => {
      return { ...prev, beg: 0, end: limit, resource: [], isScroll: false, isLoading: true };
    });
    setLoading(true);
  };
  // 获取成果资源
  const getResource = () => {
    const params = {
      beg: state.beg,
      end: state.end,
      index: index,
    };
    Post(Base.getResource, params).then(res => {
      let arry: Array<any> = state.resource;
      for (const item of res.data.resource) {
        arry.push(item);
      }
      if (res.success) {
        setTimeout(() => {
          setResourceType(res.data.resourceType);
          setState(prev => {
            return { ...prev, isScroll: false, resource: arry };
          });
          setLoading(false);
          isLoading.current = true;
          if (flag) {
            setSourceTyep();
          }
        }, 500);
      } else {
        setTimeout(() => {
          setResourceType(res.data.resourceType);
          setLoading(false);
          setState(prev => {
            return { ...prev, isLoading: false, isScroll: false, resource: arry };
          });
          isLoading.current = false;
          // setAc(arry);
          if (flag) {
            setSourceTyep();
          }
        }, 500);
      }
    });
  };
  const handelScroll = () => {
    // 滚动的高度
    const scrollTop =
      (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
      window.pageYOffset ||
      (event.srcElement ? event.srcElement.body.scrollTop : 0);
    // 视窗高度
    const clientHeight =
      (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
    // 页面高度
    const scrollHeight =
      (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
    // 距离页面底部的高度
    const height = scrollHeight - scrollTop - clientHeight;
    if (height <= 400) {
      handelLoading();
    }
  };
  const handelLoading = () => {
    if (isLoading.current) {
      isLoading.current = false;
      setState(prev => {
        return { ...prev, isScroll: true, beg: prev.end, end: prev.end + limit };
      });
    }
  };
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  // 获取页面初始化数据和条件筛选数据
  useEffect(() => {
    if (loading) getResource();
  }, [loading]);
  //滚动条加载数据
  useEffect(() => {
    if (state.isScroll) {
      getResource();
    }
  }, [state]);
  useEffect(() => {
    window.addEventListener('scroll', handelScroll);
    return () => {
      window.removeEventListener('scroll', handelScroll);
    };
  }, []);
  return (
    <div className="resource">
      <div className="resource-left" ref={resourceTypeRef}>
        <div className="resource-left-header">资源分类</div>
        <div
          className="resource-left-item resourceActive"
          onClick={e => {
            !loading && filterResource(e);
          }}
          data-index="0"
          key="0"
        >
          <p>全部</p>
        </div>
        {resourceType &&
          resourceType.map(item => {
            return (
              <div className="resource-left-item" onClick={filterResource} data-index={item.id} key={item.id}>
                <p>{item.name}</p>
                <p>{item.index}</p>
              </div>
            );
          })}
      </div>
      <div className="resource-right">
        <Card
          title={
            index == 0
              ? '全部'
              : resourceType &&
                resourceType.map(item => {
                  if (item.id == index) {
                    return item.name;
                  }
                  return '';
                })
          }
          // style={{ width: '100%' }}
          // extra={
          //   <Search placeholder="请输入资源标题" onSearch={value => this.handelSerach(value)} style={{ width: 200 }} />
          // }
        >
          <Skeleton loading={loading} active>
            <Row style={{ width: '100%', margin: 0 }} gutter={16}>
              {state.resource.length === 0 ? (
                <div className="resource-right-null">暂无数据</div>
              ) : (
                <div>
                  {state.resource.map(item => {
                    return (
                      <Col span={12} key={item.id}>
                        <Card className="resource-right-item" hoverable={true}>
                          <div className="resource-right-item-header">
                            <Avatar size={55} src={item.UserInfo.avatar} />
                            <div className="resource-right-item-header-info">
                              <p style={{ fontWeight: 'bold', fontSize: '17px' }}>{item.UserInfo.User.name}</p>
                              <p>
                                {' '}
                                <Icon type="calendar" /> {item.created_at}
                              </p>
                            </div>
                            <Button type="primary" ghost>
                              <a href={item.link} target="_blank">
                                点击获取
                              </a>
                            </Button>
                          </div>
                          <div className="resource-right-item-body">
                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.title}</p>
                            <p>{item.description}</p>
                            <div className="resource-right-item-body-cover">
                              <img src={item.posterlink} alt="" />
                            </div>
                            <div className="resource-right-item-body-attachment">
                              {item.attachment === '' || item.attachment === null ? (
                                ''
                              ) : (
                                <p style={{ color: '#1890ff' }}>
                                  <Icon type="paper-clip" />{' '}
                                  <a style={{ color: '#1890ff' }} href={item.attachment}>
                                    附件下载
                                  </a>
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </div>
              )}
            </Row>
          </Skeleton>
        </Card>
      </div>
    </div>
  );
};

export default Resource;
