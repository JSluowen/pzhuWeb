import React, { useEffect, useState } from 'react';
import { useRequest, useSetState } from 'ahooks';
import { Button, Icon, Row, Col, Card } from 'antd';
import { PhotoModal } from 'src/front/pages/album/components/photoModal';
import AlbumService, { AlbumItem } from '../service';

import './albumInfo.scss';

const AlbumInfo: React.FC<{
  album: AlbumItem;
}> = ({ album }) => {
  const [photos, setPhotos] = useState([]);
  const [photoProps, setPhotoProps] = useSetState({
    visible: false,
    url: '',
  });
  const [isOptional, setIsOptional] = useState(true);
  const [optional, setOptional] = useSetState({});
  const getPhotos = useRequest(AlbumService.getPhotosByAlbumId, {
    manual: true,
    onSuccess: res => {
      setPhotos(res.data?.photos);
      let photoOptional = {};
      res.data?.photos.forEach(photo => (photoOptional[photo.id] = false));
      setOptional(photoOptional);
    },
  });

  useEffect(() => {
    getPhotos.run({ id: album.id });
  }, [album]);
  return (
    <div className="photo-container">
      <div className="photo-header">
        <div className="photo-header-left">
          <div className="photo-header-cover">
            <img src={album?.cover} />
          </div>
          <div className="photo-header-desc">
            <div className="photo-header-title">{album?.name}</div>
            <div className="photo-header-sub">
              <span>{photos.length}张</span>
              <span>{album?.desc}</span>
            </div>
          </div>
        </div>
        <div className="photo-header-right">
          <Button
            onClick={() => {
              setIsOptional(!isOptional);
            }}
          >
            多选
          </Button>
        </div>
      </div>
      <div className="photo-main">
        <Row gutter={[16, 16]}>
          {photos.map(photo => (
            <Col style={{ minWidth: 220 }} key={photo.id} span={4}>
              <Card
                className={`photo-item ${isOptional && optional[photo.id] ? 'photo-selected' : ''}`}
                cover={<img src={photo.link} />}
                onClick={() => {
                  if (isOptional) {
                    setOptional({ [photo.id]: !optional[photo.id] });
                  } else {
                    setPhotoProps({ visible: true, url: photo.link });
                  }
                }}
              >
                <div>
                  <Card.Meta title={photo.name} />
                  {}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <PhotoModal
        visible={photoProps.visible}
        url={photoProps.url}
        onChangeVisible={visible => setPhotoProps({ visible: visible })}
      />
    </div>
  );
};

export default AlbumInfo;
