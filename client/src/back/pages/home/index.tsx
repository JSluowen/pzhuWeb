import React, { useState, useEffect } from 'react';
import { Tabs, Table, Tooltip, Button } from 'antd';
import { useRequest } from 'ahooks';

import UpdateHome from './components/update';
import HomeService, { BaseItem } from './service';

const { TabPane } = Tabs;

const Home: React.FC<{}> = () => {
  const [baseInfos, setBaseInfos] = useState<Array<BaseItem>>();
  const [activeKey, setActiveKey] = useState('list');
  const [currentUpdate, setCurrentUpdate] = useState<BaseItem>();

  const getHomeInfo = useRequest(HomeService.getHomeInfo, {
    manual: true,
    onSuccess: res => {
      setBaseInfos(res.data?.baseInfo);
    },
  });

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: 120,
      render: (text, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setCurrentUpdate(record);
              setActiveKey('update');
            }}
          >
            修改
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getHomeInfo.run();
  }, []);
  return (
    <div className="album">
      <div className="album-container">
        <Tabs activeKey={activeKey} onChange={activeKey => setActiveKey(activeKey)}>
          <TabPane tab="首页配置项" key="list">
            <Table loading={getHomeInfo.loading} columns={columns} dataSource={baseInfos} />
          </TabPane>
          <TabPane tab="修改配置项" key="update" disabled>
            <UpdateHome data={currentUpdate} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
