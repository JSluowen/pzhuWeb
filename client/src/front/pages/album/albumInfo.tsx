import React, { useEffect, useState } from 'react';
import { useSetState, useRequest } from 'ahooks';
import { Button, Card, Empty, Row, Col, Icon } from 'antd';
import AlbumUpload from './components/albumUpload';
import CreateAlbum from './components/createAlbum';
import { PhotoModal } from './components/photoModal';
import { AlbumService, AlbumItem } from './service';
import './albumInfo.scss';

const AlbumInfo = ({ match }) => {
  const [uploadProps, setUploadProps] = useSetState<{ visible: boolean; alibumId: number }>({
    visible: false,
    alibumId: match.params.id,
  });
  const [createAlbumVisible, setCreateAlbumVisible] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState<AlbumItem>();
  const [photoProps, setPhotoProps] = useSetState({
    visible: false,
    url: '',
  });
  const getPhotosByAlbumId = useRequest(AlbumService.getPhotosByAlbumId, {
    manual: true,
    onSuccess: res => {
      setPhotos(res.data?.photos);
      setAlbum(res.data?.albumInfo);
    },
  });

  useEffect(() => {
    getPhotosByAlbumId.run(match.params.id);
  }, []);
  return (
    <div className="photo-container">
      <div className="photo-header">
        <div className="photo-header-cover">
          <img src={album?.cover} />
        </div>
        <div className="photo-header-right">
          <div>
            <div className="photo-header-title">{album?.name}</div>
            <div className="photo-header-sub">
              <span>{photos.length}张</span>
              <span>{album?.desc}</span>
            </div>
          </div>
          <div className="photo-header-action">
            <Button
              className="photo-header-btn"
              onClick={() => {
                setUploadProps({ visible: true });
              }}
            >
              上传图片
            </Button>
            <Button className="photo-header-btn" onClick={() => setCreateAlbumVisible(true)}>
              创建相册
            </Button>
          </div>
        </div>
      </div>
      <div className="photo-main">
        <Row gutter={[16, 16]}>
          {photos.map(photo => (
            <Col span={4}>
              <Card
                key={photo.id}
                className="photo-item"
                cover={<img src={photo.link} />}
                onClick={() => {
                  setPhotoProps({ visible: true, url: photo.link });
                }}
              >
                <Card.Meta title={photo.name} />
              </Card>
            </Col>
          ))}
        </Row>

        {photos.length === 0 && (
          <div className="photo-center">
            <Empty
              image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
              imageStyle={{
                height: 60,
              }}
              description={<span>该相册空空如也，点击下面的按钮上传吧</span>}
            >
              <Button
                type="primary"
                className="photo-header-btn"
                onClick={() => {
                  setUploadProps({ visible: true });
                }}
              >
                上传图片
              </Button>
            </Empty>
          </div>
        )}
      </div>
      <AlbumUpload
        visible={uploadProps.visible}
        albumId={uploadProps.alibumId}
        onChangeVisible={visible => {
          setUploadProps({ visible });
          getPhotosByAlbumId.run(match.params.id);
        }}
      />
      <CreateAlbum
        visible={createAlbumVisible}
        onChangeVisible={visible => {
          setCreateAlbumVisible(visible);
        }}
      />
      <PhotoModal
        visible={photoProps.visible}
        url={photoProps.url}
        onChangeVisible={visible => setPhotoProps({ visible: visible })}
      />
    </div>
  );
};
export default AlbumInfo;
export { AlbumInfo };
