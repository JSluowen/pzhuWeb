import React, { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Card, Button, Skeleton } from 'antd';
import { Base, Get } from 'front/api';
import ma5 from 'md5';
import './index.scss';

const Member: FC = () => {
  // 过滤研究方向的个数
  const filterDomainNum = (domain, data) => {
    const domains = domain.map(item => {
      let num = 0;
      for (const i of data) {
        if (item.id === i.domain) {
          num++;
        }
      }
      return {
        id: item.id,
        name: item.name,
        index: num,
      };
    });
    setDomain(domains);
  };
  // 过滤刷选成员的年级类别
  const filterGrade = data => {
    let val = data.map(item => {
      if (item.User.status !== 3) {
        return parseInt(item.id.substring(0, 4)) + 4;
      }
      return undefined;
    });
    val = val.sort((a, b) => {
      return a - b;
    });
    const temp = [];
    for (let i = 0; i < val.length; i++) {
      if (temp.indexOf(val[i]) === -1 && val[i] !== undefined) {
        temp.push(val[i]);
      }
    }
    setGrade(temp);
  };

  // 过滤刷选老师的信息
  const filterTeacherInfo = data => {
    const info = data.filter(item => {
      return item.User.status === 3;
    });
    setTecInfo(info);
  };
  // 过滤刷选成员研究方向
  const filterUser = e => {
    let event;
    if (e.target.tagName === 'DIV') {
      event = e.target;
    } else {
      event = e.target.parentNode;
    }
    const parent = event.parentNode.children;
    for (let i = 0; i < parent.length; i++) {
      parent[i].classList.remove('memberActive');
    }
    event.classList.add('memberActive');
    const index = event.dataset.index;
    if (parseInt(index) === 0) {
      filterGrade(userInfo);
      setNewUserInfo(userInfo);
      return;
    }
    const user = userInfo.filter(item => {
      return item.domain === parseInt(index) && item.User.status !== 3;
    });
    filterGrade(user);
    setNewUserInfo(user);
  };

  const [userInfo, setUseInfo] = useState([]);
  const [newUserInfo, setNewUserInfo] = useState([]);
  const [domains, setDomain] = useState([]);
  const [grade, setGrade] = useState([]);
  const [tecInfo, setTecInfo] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    Get(Base.getMemberInfo).then(
      (res: IRes) => {
        if (res.success) {
          setUseInfo(res.data);
          setNewUserInfo(res.data);
          filterTeacherInfo(res.data);
          filterGrade(res.data);
          filterDomainNum(res.domain, res.data);
          setLoading(false);
        }
      },
      err => {
        setLoading(false);
      },
    );
  }, []);

  return (
    <div className="member">
      <div className="member-left">
        <div className="member-left-header">成员分类</div>
        <div className="member-left-item memberActive" data-index="0" onClick={filterUser}>
          <p data-index="0">全部</p>
        </div>
        {domains &&
          domains.map(item => {
            return (
              <div className="member-left-item" data-index={item.id} key={item.id} onClick={filterUser}>
                <p data-index={item.id}>{item.name}</p>
                <p data-index={item.id}>{item.index}</p>
              </div>
            );
          })}
      </div>
      <div className="member-right">
        <Skeleton loading={loading} active>
          {tecInfo.length !== 0 ? (
            <Card title="指导教师" style={{ width: '100%' }}>
              {tecInfo.map((item, index) => {
                return (
                  <div className="member-right-item" key={index}>
                    <div className="member-right-item-left">
                      <div className="member-right-item-left-avatar">
                        <img src={item.avatar} alt="这是头像" />
                      </div>
                      <Button data-index={ma5(item.id)} type="primary">
                        <Link to={`/tourist/${item.id}`}>点击查看</Link>
                      </Button>
                    </div>
                    <div className="member-right-item-right">
                      <p>{item.User.name}</p>
                      <p>
                        {' '}
                        <Icon type="phone" />
                        {item.phone}
                      </p>
                      <p>
                        {' '}
                        <Icon type="mail" />
                        {item.User.email}
                      </p>
                      <p>
                        {' '}
                        <Icon type="idcard" />
                        {item.School.name}
                        {'/'}
                        {item.Major.name}
                      </p>
                      <p>
                        {' '}
                        <Icon type="smile" />
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </Card>
          ) : (
            ''
          )}
          {grade.map((item, index) => {
            return (
              <Card title={item + '届'} style={{ width: '100%' }} key={index}>
                {newUserInfo.map((useritem, index) => {
                  if (item === parseInt(useritem.id.substring(0, 4)) + 4 && useritem.User.status !== 3) {
                    return (
                      <div className="member-right-item" key={index}>
                        <div className="member-right-item-left">
                          <div className="member-right-item-left-avatar">
                            <img src={useritem.avatar} alt="这是头像" />
                          </div>
                          <Button data-index={ma5(useritem.User.id)} type="primary">
                            <Link to={`/tourist/${useritem.id}`}>点击查看</Link>
                          </Button>
                        </div>
                        <div className="member-right-item-right">
                          <p>{useritem.User.name}</p>
                          <p>
                            {' '}
                            <Icon type="phone" />
                            {useritem.phone}
                          </p>
                          <p>
                            {' '}
                            <Icon type="mail" />
                            {useritem.User.email}
                          </p>
                          <p>
                            {' '}
                            <Icon type="idcard" />
                            {useritem.School.name}
                            {'/'}
                            {useritem.Major.name}
                          </p>
                          <p>
                            {' '}
                            <Icon type="smile" />
                            {useritem.description}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return undefined;
                })}
              </Card>
            );
          })}
        </Skeleton>
      </div>
    </div>
  );
};

export default Member;
