import React, { useEffect, useState, useMemo } from 'react';
import { useRequest, useSetState } from 'ahooks';
import { Tag, Tabs, Table, Button, Modal, Input, message } from 'antd';
import AlbumInfo from './components/albumInfo';
import CreateAlbum from './components/createAlbum';

import AlbumService from './service';

import './index.scss';

const { TabPane } = Tabs;
const color = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

const Album = () => {
  const [activeKey, setActiveKey] = useState('list');
  const [albums, setAlbums] = useState([]);
  const [albumTypes, setAlbumTypes] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState<number>(null);
  const [modalProps, setModalProps] = useSetState({
    visible: false,
    tagName: '',
  });
  const [albumProps, setAlbumProps] = useState({
    visible: false,
    editAlbum: null,
  });
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
          photoNum: res.data?.photoNum[album.id] || 0,
        })),
      );
    },
  });
  const createAlbumType = useRequest(AlbumService.createAlbumType, {
    manual: true,
    onSuccess: res => {
      console.log(res);
    },
  });
  const getAlbumTypes = useRequest(AlbumService.getAlbumTypes, {
    manual: true,
    onSuccess: res => {
      setAlbumTypes(res.data?.types);
    },
  });
  const delAlbumType = useRequest(AlbumService.delAlbumType, {
    manual: true,
    onSuccess: res => {
      if (res.success === 1) {
        message.success('删除标签成功');
      }
    },
  });
  const delAlbum = useRequest(AlbumService.delAlbum, {
    manual: true,
    onSuccess: res => {
      if (res.success === 1) {
        message.success('删除相册成功');
        getAlbums.run();
      }
    },
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
          text: albumTypes.find(albumType => albumType.id === item)?.name,
          value: item,
        })),
        render: text => (
          <Tag color={color[Math.round(Math.random() * 10)]}>
            {albumTypes.find(albumType => albumType.id === Number(text))?.name}
          </Tag>
        ),
      },
      {
        title: '相册名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <Button
            type="link"
            onClick={() => {
              setSelectedAlbum(record.id);
              setActiveKey('albumInfo');
            }}
          >
            {text}
          </Button>
        ),
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
        render: (text, record) => (
          <div>
            <Button onClick={() => setAlbumProps({ visible: true, editAlbum: record })}>修改</Button>
            <Button
              type="danger"
              onClick={() => {
                Modal.confirm({
                  title: '确认要删除该相册吗？',
                  content: '若该相册中有图片，将被移动到默认相册',
                  onOk: () => {
                    delAlbum.run({ id: record.id });
                  },
                  okButtonProps: { loading: delAlbum.loading },
                });
              }}
            >
              删除
            </Button>
          </div>
        ),
      },
    ],
    [albumTypes, albums],
  );
  useEffect(() => {
    getAlbums.run();
    getAlbumTypes.run();
  }, []);
  return (
    <div className="album">
      <div className="album-container">
        <Tabs activeKey={activeKey} onChange={activeKey => setActiveKey(activeKey)}>
          <TabPane tab="相册列表" key="list">
            <Table
              rowKey={record => record.id}
              columns={columns}
              dataSource={albums}
              loading={getAlbums.loading}
              // scroll={{x: 1100,scrollToFirstRowOnChange:true}}
            />
          </TabPane>
          <TabPane tab="相册分类" key="type">
            <div className="album-tag">
              {albumTypes.map(albumType => (
                <Tag
                  key={albumType.id}
                  color={color[Math.round(Math.random() * 10)]}
                  closable={albumType.id !== 1}
                  onClose={() => {
                    delAlbumType.run({ id: albumType.id });
                    return false;
                  }}
                >
                  {albumType?.name}
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
          <TabPane tab="相册详情" disabled key="albumInfo">
            <AlbumInfo albumId={selectedAlbum} />
          </TabPane>
        </Tabs>
      </div>
      <Modal
        title="添加标签"
        visible={modalProps.visible}
        onCancel={() => setModalProps({ visible: false })}
        onOk={() => {
          createAlbumType.run({ name: modalProps.tagName }).then(() => {
            getAlbumTypes.run();
          });
          setModalProps({ visible: false });
        }}
        confirmLoading={createAlbumType.loading}
        okButtonProps={{ disabled: !modalProps.tagName }}
      >
        <Input
          placeholder="请输入标签名"
          value={modalProps.tagName}
          onChange={e => setModalProps({ tagName: e.target.value })}
        />
      </Modal>
      <CreateAlbum
        visible={albumProps.visible}
        editAlbum={albumProps.editAlbum}
        onChangeVisible={visible => setAlbumProps({ visible: visible, editAlbum: null })}
        onSuccess={() => {
          getAlbums.run();
        }}
      />
    </div>
  );
};
export { Album };
export default Album;
