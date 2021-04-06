import React, { useState, useEffect } from 'react';
import { useSetState, useRequest } from 'ahooks';
import { Modal, Select, Row, Col, Input, message } from 'antd';

import AlbumService from '../service';

interface AlbumItem {
  name: string;
  desc: string;
  typeId: number;
}

const CreateAlbum: React.FC<{
  visible: boolean;
  onChangeVisible: (visible) => void;
}> = ({ visible, onChangeVisible }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [types, setTypes] = useState([]);
  const [album, setAlbum] = useSetState<AlbumItem>();
  const [data, setData] = useSetState({
    token: '',
    key: '',
  });

  const getAlbumTypes = useRequest(AlbumService.getAlbumTypes, {
    manual: true,
    onSuccess: res => {
      if (res.data.types.length > 0) {
        setAlbum({ typeId: res.data.types[0].id });
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
      onChangeVisible(false);
    },
  });

  const handleOk = () => {
    if (!album.name) {
      message.warn('请输入相册名！');
      return;
    }
    createAlbumService.run({ ...album });
  };
  const handleCancel = () => {
    onChangeVisible(false);
  };
  useEffect(() => {
    if (!visible) return;
    getAlbumTypes.run();
  }, [visible]);
  return (
    <Modal
      title="创建相册"
      visible={visible}
      onOk={handleOk}
      confirmLoading={createAlbumService.loading}
      onCancel={handleCancel}
    >
      <div style={{ padding: 20 }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>相册名称：</Col>
          <Col span={18}>
            <Input placeholder="请输入相册名称" onChange={e => setAlbum({ name: e.target.value })} />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6}>相册描述：</Col>
          <Col span={18}>
            <Input.TextArea placeholder="（可选）请输入相册描述" onChange={e => setAlbum({ desc: e.target.value })} />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6}>分类：</Col>
          <Col span={18}>
            <Select
              loading={getAlbumTypes.loading}
              value={album.typeId}
              onChange={value => {
                setAlbum({ typeId: Number(value) });
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
      </div>
    </Modal>
  );
};
export default CreateAlbum;
