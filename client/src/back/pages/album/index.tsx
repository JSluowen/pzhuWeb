import React, { useEffect, useState, useMemo } from 'react';
import { useRequest, useSetState } from 'ahooks';
import { Tag, Tabs, Table, Button, Modal, Input, message } from 'antd';

import AlbumService from './service';

import './index.scss';

const { TabPane } = Tabs;
const color = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [albumTypes, setAlbumTypes] = useState({});
  const [modalProps, setModalProps] = useSetState({
    visible: false,
    tagName: '',
  });
  const columns = useMemo(
    () => [
      {
        title: '创建人',
        dataIndex: 'userId',
        key: 'userId',
      },
      {
        title: '相册类别',
        dataIndex: 'type',
        key: 'type',
        onFilter: (value, record) => record.type === value,
        filters: Array.from(new Set(albums.map(item => item?.type)))?.map(item => ({
          text: albumTypes[item]?.name,
          value: item,
        })),
        render: text => <Tag color={color[Math.round(Math.random() * 10)]}>{albumTypes[text]?.name}</Tag>,
      },
      {
        title: '相册名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '相册描述',
        dataIndex: 'desc',
        key: 'desc',
        render: text => text || '啥也没有啊',
      },
      {
        title: '照片数量',
        dataIndex: 'photoNum',
        key: 'photoNum',
      },
      {
        title: '操作',
        render: (text, record) => <div>操作</div>,
      },
    ],
    [albumTypes, albums],
  );
  const getAlbums = useRequest(AlbumService.getAlbums, {
    manual: true,
    onSuccess: res => {
      setAlbums(
        res.data.albums.map(album => ({
          ...album,
          id: album.id,
          userId: album.user_id,
          name: album.name,
          cover: album?.Photo?.link,
          desc: album.desc,
          status: album.status,
        })),
      );
      if (Object.keys(albumTypes).length === 0) {
        const typeObj = {};
        res.data.albums?.forEach(album => {
          if (!typeObj[album.type]) {
            typeObj[album.type] = { num: 0, name: album.AlbumType.name };
          }
          typeObj[album.type].num++;
        });
        setAlbumTypes(typeObj);
      }
    },
  });
  const createAlbumType = useRequest(AlbumService.createAlbumType, {
    manual: true,
    onSuccess: res => {},
  });
  useEffect(() => {
    getAlbums.run();
  }, []);
  return (
    <div className="album">
      <div className="album-container">
        <Tabs>
          <TabPane tab="相册列表" key="list">
            <Table rowKey={record => record.id} columns={columns} dataSource={albums} loading={getAlbums.loading} />
          </TabPane>
          <TabPane tab="相册分类" key="type">
            <div className="album-tag">
              {Object.keys(albumTypes).map(key => (
                <Tag key={key} color={color[Math.round(Math.random() * 10)]} closable onClose={() => {}}>
                  {albumTypes[key]?.name}
                </Tag>
              ))}
            </div>
            <Button
              type="primary"
              onClick={() => {
                setModalProps({ visible: true });
              }}
            >
              添加标签
            </Button>
          </TabPane>
        </Tabs>
      </div>
      <Modal
        title="添加标签"
        visible={modalProps.visible}
        onCancel={() => setModalProps({ visible: false })}
        onOk={() => {
          createAlbumType.run({ name: modalProps.tagName });
        }}
        confirmLoading={createAlbumType.loading}
        okButtonProps={{ disabled: !!modalProps.tagName }}
      >
        <Input
          placeholder="请输入标签名"
          value={modalProps.tagName}
          onChange={e => setModalProps({ tagName: e.target.value })}
        />
      </Modal>
    </div>
  );
};
export { Album };
export default Album;
