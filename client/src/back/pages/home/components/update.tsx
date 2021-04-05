import React, { useState, useEffect } from 'react';
import { Row, Col, Upload, Progress, Icon, Input, Button, message } from 'antd';
import { useSetState } from 'ahooks';
import MyUpload from 'src/component/MyUpload';
import HomeService, { BaseItem } from '../service';

const { Dragger } = Upload;
const UpdateHome: React.FC<{
  data: BaseItem;
}> = ({ data }) => {
  const [state, setState] = useSetState<BaseItem>(data);
  const [cover, setCover] = useState(null);
  const submit = () => {
    if (data.desc === state.desc && data.title === state.title && !cover) return message.warn('没有有效的修改');
    HomeService.updateHomeInfo({
      id: data.id,
      title: state.title,
      desc: state.desc,
      cover: cover?.link || state.cover,
    }).then(res => {});
  };
  useEffect(() => {
    setState(data);
  }, [data]);
  return (
    <div style={{ padding: 20, minHeight: 'calc(100vh - 300px)' }}>
      <Row>
        <Col span={10}>
          <Row gutter={[8, 16]}>
            <Col span={4}>标题</Col>
            <Col span={20}>
              <Input value={state.title} onChange={e => setState({ title: e.target.value })} />
            </Col>

            <Col span={4}>描述</Col>
            <Col span={20}>
              <Input.TextArea
                autoSize
                value={state.desc}
                onChange={e => {
                  setState({ desc: e.target.value });
                }}
              />
            </Col>

            <Col span={4}>封面</Col>
            <Col span={20}>
              <MyUpload
                multiple={false}
                isDragger={false}
                handleChange={files => {
                  setCover(files[0]);
                }}
              >
                {!cover && (
                  <div>
                    <Icon type="inbox" />
                  </div>
                )}
              </MyUpload>
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <div style={{ marginLeft: '9%', width: '90%', height: 350 }}>
            <img
              style={{ objectFit: 'cover', height: '100%', border: '5px solid rgba(125,125,125,0.5)' }}
              src={cover?.link || state.cover}
              alt=""
            />
          </div>
        </Col>
      </Row>
      <div>
        <Button type="primary" onClick={() => submit()}>
          确认修改
        </Button>
      </div>
    </div>
  );
};

export default UpdateHome;
