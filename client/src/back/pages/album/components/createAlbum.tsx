import React, { useState, useEffect } from 'react';
import { useSetState, useRequest } from 'ahooks';
import { Modal, Select, Row, Col, Input, message } from 'antd';
import { ALBUM_STATUS } from 'src/consts';

import AlbumService from '../service';

interface AlbumItem {
  id?: number;
  name: string;
  desc: string;
  type: number;
  status: number;
}

const CreateAlbum: React.FC<{
  visible: boolean;
  editAlbum?: AlbumItem;
  onChangeVisible: (visible) => void;
  onSuccess?: () => void;
}> = ({ visible, editAlbum = null, onChangeVisible, onSuccess }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [types, setTypes] = useState([]);
  const [album, setAlbum] = useSetState<AlbumItem>();

  const getAlbumTypes = useRequest(AlbumService.getAlbumTypes, {
    manual: true,
    onSuccess: res => {
      if (res.data.types.length > 0 && !album.type) {
        setAlbum({ type: res.data.types[0].id });
      }
      setTypes(res.data.types);
    },
  });
  const createAlbumService = useRequest(AlbumService.createAlbum, {
    manual: true,
    onSuccess: res => {
      if (res.success !== 1) {
        message.error(res.message);
        return;
      }
      message.success('创建成功');
      if (onSuccess) {
        onSuccess();
      }
      onChangeVisible(false);
    },
  });
  const updateAlbum = useRequest(AlbumService.updateAlbum, {
    manual: true,
    onSuccess: res => {
      if (res.success !== 1) {
        message.error(res.message);
        return;
      }
      if (onSuccess) {
        onSuccess();
      }
      onChangeVisible(false);
    },
  });

  const handleOk = () => {
    if (!album.name) {
      message.warn('请输入相册名！');
      return;
    }
    if (editAlbum) {
      return updateAlbum.run({ ...album });
    }
    createAlbumService.run({ ...album });
  };
  const handleCancel = () => {
    onChangeVisible(false);
  };
  useEffect(() => {
    if (!visible) return;
    setAlbum({
      id: editAlbum?.id,
      name: editAlbum?.name,
      desc: editAlbum?.desc,
      type: editAlbum?.type,
      status: editAlbum?.status,
    });
    getAlbumTypes.run();
  }, [visible]);
  return (
    <Modal
      title={editAlbum ? '修改相册' : '创建相册'}
      visible={visible}
      onOk={handleOk}
      confirmLoading={createAlbumService.loading}
      onCancel={handleCancel}
    >
      <div style={{ padding: 20 }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>相册名称：</Col>
          <Col span={18}>
            <Input
              value={album?.name}
              placeholder="请输入相册名称"
              onChange={e => setAlbum({ name: e.target.value })}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6}>相册描述：</Col>
          <Col span={18}>
            <Input.TextArea
              value={album?.desc}
              placeholder="（可选）请输入相册描述"
              onChange={e => setAlbum({ desc: e.target.value })}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6}>分类：</Col>
          <Col span={18}>
            <Select
              loading={getAlbumTypes.loading}
              value={album?.type}
              onChange={value => {
                setAlbum({ type: Number(value) });
              }}
              style={{ width: '100%' }}
            >
              {types.map(type => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6}>相册状态：</Col>
          <Col span={18}>
            <Select
              loading={getAlbumTypes.loading}
              value={album?.status + ''}
              onChange={value => {
                setAlbum({ status: value });
              }}
              style={{ width: '100%' }}
            >
              {Object.keys(ALBUM_STATUS).map(key => (
                <Select.Option key={key} value={key}>
                  {ALBUM_STATUS[key]}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
export default CreateAlbum;
