import React, { useState, useEffect, FC } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Icon, Card, Button, Skeleton } from 'antd';
import MemberAPI from 'front/api/member';
import './index.scss';

const Member: FC = () => {
  // 过滤研究方向的个数
  const filterDomainNum = (domain, data) => {
    return domain.map(item => {
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
  };

  const [userInfo, setUseInfo] = useState<Object>([]);
  const [domains, setDomain] = useState<Array<{}>>([]);

  useEffect(() => {
    MemberAPI.getMemberInfo().then((res: IRes) => {
      if (res.success) {
        setUseInfo(res.data);
        const domains = filterDomainNum(res.domain, res.data);
        setDomain(domains);
      }
    });
  }, []);

  return (
    <div className="member">
      {JSON.stringify(userInfo[0])}
      {JSON.stringify(domains[0])}
    </div>
  );
};

export default Member;
