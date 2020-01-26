import React, { useState, useEffect, FC, useRef } from 'react';
import { Router, Route, Link } from 'react-router-dom';
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

const Achievement: FC = () => {
  const [limit, setLimit] = useState<number>(6); // 获取的数据量
  const [beg, setBeg] = useState<number>(0);
  const [end, setEnd] = useState<number>(6);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [acType, setAcType] = useState<Array<TAcType>>([]); //成果类别
  const [ac, setAc] = useState<Array<TAc>>([]); // 成果资源
  const [flag, setFlag] = useState<boolean>(true);

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
    setLoading(true);
    setBeg(0);
    setEnd(limit);
    setAc([]);
    getAchievement();
  };
  // 获取成果资源
  const getAchievement = () => {
    const params = {
      beg: beg,
      end: end,
      index: index,
    };
    AchievementAPI.getAachievement(params).then(res => {
      let arry: Array<TAc> = ac;
      for (const item of res.data.ac) {
        arry.push(item);
      }
      if (res.success) {
        setTimeout(() => {
          setLoading(false);
          setAcType(res.data.acType);
          setAc(arry);
          setIsLoading(true);
          if (flag) {
            setAchievementTyep();
          }
        }, 500);
      } else {
        setTimeout(() => {
          setLoading(false);
          setAcType(res.data.acType);
          setAc(arry);
          setIsLoading(false);
          if (flag) {
            setAchievementTyep();
          }
        }, 500);
      }
    });
  };
  // 获取页面初始化数据
  useEffect(() => {
    getAchievement();
  }, []);

  return (
    <div className="achievement">
      <div className="achievement-left" ref={achievementTypeRef}>
        <div className="achievement-left-header">成果分类</div>
        <div className="achievement-left-item" data-index="0" key="0" onClick={filterAchievement}>
          <p>全部</p>
        </div>
        {acType &&
          acType.map(item => {
            return (
              <div className="achievement-left-item" data-index={item.id} key={item.id} onClick={filterAchievement}>
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
              {ac.length === 0 ? (
                <div className="achievement-right-null">暂无数据</div>
              ) : (
                <div>
                  {ac &&
                    ac.map(item => {
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
