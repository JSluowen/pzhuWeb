import React, { useState, useEffect, FC, useRef, useCallback } from 'react';
import { Icon, Card, Button, Avatar, Row, Col, Input, Skeleton, message } from 'antd';
import AchievementAPI from 'front/api/achievement';
const { Meta } = Card;
const Search = Input.Search;
import './index.scss';
export type TAc = {
  id: number;
  achievementlink: string;
  attachment: string;
  posterlink: string;
  UserInfo: any;
  created_at: string;
  title: string;
  abstract: string;
};
export type TAcType = { id: number; name: string; index: number };

export type TState = {
  beg: number;
  end: number;
  isScroll: boolean;
  ac: Array<TAc>;
};

const Achievement: FC = () => {
  const [limit, setLimit] = useState<number>(12); // 获取的数据量
  const [state, setState] = useState<TState>({ beg: 0, end: 6, isScroll: false, ac: [] });
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [acType, setAcType] = useState<Array<TAcType>>([]); //成果类别
  const [flag, setFlag] = useState<boolean>(true);

  const isLoading = useRef(true);

  const achievementTypeRef = useRef(null);
  // 设置初始化的资源分类
  const setAchievementTyep = () => {
    let e = achievementTypeRef.current;
    e = e.childNodes;
    e[1].classList.add('achievementActive');
    setFlag(false);
  };
  // 筛选成果类别
  const filterAchievement = e => {
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
      parent[i].classList.remove('achievementActive');
    }
    event.classList.add('achievementActive');
    const index = event.dataset.index;
    if (index === parseInt(index)) {
      return;
    }

    setIndex(index);
    setFlag(false);
    setState(prev => {
      return { ...prev, beg: 0, end: limit, ac: [], isScroll: false, isLoading: true };
    });
    setLoading(true);
  };
  // 获取成果资源
  const getAchievement = () => {
    const params = {
      beg: state.beg,
      end: state.end,
      index: index,
    };
    AchievementAPI.getAachievement(params).then(res => {
      let arry: Array<TAc> = state.ac;
      for (const item of res.data.ac) {
        arry.push(item);
      }
      if (res.success) {
        setTimeout(() => {
          setAcType(res.data.acType);
          setState(prev => {
            return { ...prev, isScroll: false, ac: arry };
          });
          setLoading(false);
          isLoading.current = true;
          if (flag) {
            setAchievementTyep();
          }
        }, 500);
      } else {
        setTimeout(() => {
          setAcType(res.data.acType);
          setLoading(false);
          setState(prev => {
            return { ...prev, isLoading: false, isScroll: false, ac: arry };
          });
          isLoading.current = false;
          // setAc(arry);
          if (flag) {
            setAchievementTyep();
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

  // 获取页面初始化数据和条件筛选数据
  useEffect(() => {
    if (loading) getAchievement();
  }, [loading]);

  //滚动条加载数据
  useEffect(() => {
    if (state.isScroll) {
      getAchievement();
    }
  }, [state]);

  useEffect(() => {
    window.addEventListener('scroll', handelScroll);
    return () => {
      window.removeEventListener('scroll', handelScroll);
    };
  }, []);
  return (
    <div className="achievement">
      <div className="achievement-left" ref={achievementTypeRef}>
        <div className="achievement-left-header">成果分类</div>
        <div
          className="achievement-left-item"
          data-index="0"
          key="0"
          onClick={e => {
            !loading && filterAchievement(e);
          }}
        >
          <p>全部</p>
        </div>
        {acType &&
          acType.map(item => {
            return (
              <div
                className="achievement-left-item"
                data-index={item.id}
                key={item.id}
                onClick={e => {
                  !loading && filterAchievement(e);
                }}
              >
                <p> {item.name}</p>
                <p>{item.index}</p>
              </div>
            );
          })}
      </div>
      <div className="achievement-right">
        <Card
          title={acType.map(item => {
            if (item.id === index) {
              return item.name;
            }
            return '';
          })}
          style={{ width: '100%' }}
          extra={
            <Search placeholder="请输入成果标题" onSearch={value => this.handelSerach(value)} style={{ width: 200 }} />
          }
        >
          <Skeleton loading={loading} active>
            <Row style={{ width: '100%', margin: 0 }} gutter={16}>
              {state.ac.length === 0 ? (
                <div className="achievement-right-null">暂无数据</div>
              ) : (
                <div>
                  {state.ac &&
                    state.ac.map(item => {
                      return (
                        <Col span={12} key={item.id}>
                          <a
                            style={{ display: 'block' }}
                            href={item.achievementlink || item.attachment}
                            target="_blank"
                          >
                            <Card
                              className="achievement-right-item"
                              hoverable={true}
                              loading={false}
                              style={{ width: '100%' }}
                              cover={<img alt="example" src={item.posterlink} />}
                              actions={[
                                <span>
                                  <Icon type="user" /> {item.UserInfo.User.name}
                                </span>,
                                <span>
                                  <Icon type="calendar" /> {item.created_at}
                                </span>,
                              ]}
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

export default Achievement;
