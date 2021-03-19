import React, { useEffect, useState } from 'react';
import { useRequest, useSetState } from 'ahooks';
import { Button, Icon, Row, Col, Card, message, Modal, Select } from 'antd';
import { PhotoModal } from 'src/front/pages/album/components/photoModal';
import CoverModal from './cover';
import AlbumService, { AlbumItem, PhotoItem } from '../service';

import './albumInfo.scss';
import { number } from '_@types_prop-types@15.5.5@@types/prop-types';

const selectAll = (flag, optional) => {
  const newOptional = { ...optional };
  Object.keys(newOptional).forEach(item => (newOptional[item] = flag));
  return newOptional;
};
const getSelected = optional => {
  let result = [];
  Object.keys(optional).forEach(key => {
    if (optional[key]) {
      result.push(Number(key));
    }
  });
  return result;
};

const AlbumInfo: React.FC<{
  albumId: number;
}> = ({ albumId }) => {
  const [album, setAlbum] = useState<AlbumItem>();
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [coverProps, setCoverProps] = useState({
    visible: false,
    albumId: null,
  });
  const [photoProps, setPhotoProps] = useSetState({
    visible: false,
    url: '',
  });
  const [isOptional, setIsOptional] = useState(false);
  const [optional, setOptional] = useState({});
  const [selectAlbumProps, setSelectAlbumProps] = useSetState({
    visible: false,
    albumId: null,
    ids: [],
  });
  const getPhotos = useRequest(AlbumService.getPhotosByAlbumId, {
    manual: true,
    onSuccess: res => {
      setPhotos(res.data?.photos);
      setAlbum(res.data?.albumInfo);
      let photoOptional = {};
      res.data?.photos.forEach(photo => (photoOptional[photo.id] = false));
      setOptional(photoOptional);
    },
  });
  const getAlbums = useRequest(AlbumService.getAlbums, {
    manual: true,
    onSuccess: res => {
      setAlbums(res.data?.albums);
    },
  });
  const delPhotos = useRequest(AlbumService.delPhotos, {
    manual: true,
    onSuccess: res => {
      getPhotos.run({ id: albumId });
    },
  });
  const updatePhotos = useRequest(AlbumService.updatePhotos, {
    manual: true,
    onSuccess: res => {
      getPhotos.run({ id: albumId });
      setSelectAlbumProps({ visible: false });
    },
  });

  useEffect(() => {
    getPhotos.run({ id: albumId });
    getAlbums.run();
  }, [albumId]);
  return (
    <div className="photo-container">
      <div className="photo-header">
        <div className="photo-header-left">
          <div
            onClick={() => setCoverProps({ visible: true, albumId: Number(album.id) })}
            className="photo-header-cover"
          >
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
          {isOptional ? (
            <div className="photo-item-optional">
              <div>
                <Button
                  onClick={() => {
                    setOptional(selectAll(true, optional));
                  }}
                >
                  全选
                </Button>
                <Button
                  onClick={() => {
                    setOptional(selectAll(false, optional));
                    setIsOptional(false);
                  }}
                >
                  取消
                </Button>
              </div>
              <div>
                <Button
                  type="danger"
                  loading={delPhotos.loading}
                  onClick={() => {
                    const selecteds = getSelected(optional);
                    if (selecteds.length === 0) {
                      return message.warn('请选择需要删除的图片');
                    }
                    delPhotos.run({ ids: selecteds });
                  }}
                >
                  批量删除
                </Button>
                <Button
                  type="primary"
                  loading={updatePhotos.loading}
                  onClick={() => {
                    const selecteds = getSelected(optional);
                    if (selecteds.length === 0) {
                      return message.warn('请选择需要移动的图片');
                    }
                    setSelectAlbumProps({ visible: true, ids: selecteds });
                  }}
                >
                  批量移动
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => {
                setIsOptional(!isOptional);
              }}
            >
              多选
            </Button>
          )}
        </div>
      </div>
      <div className="photo-main">
        <Row gutter={[16, 16]}>
          {photos.map(photo => (
            <Col style={{ minWidth: 220 }} key={photo.id} span={4}>
              <Card
                className="photo-item"
                cover={<img src={photo.link} />}
                onClick={() => {
                  if (isOptional) {
                    setOptional({ ...optional, [photo.id]: !optional[photo.id] });
                  } else {
                    setPhotoProps({ visible: true, url: photo.link });
                  }
                }}
              >
                <div className="photo-item-desc">
                  <div>{photo.name}</div>
                  <div>
                    {isOptional &&
                      (optional[photo.id] ? (
                        <Icon style={{ color: 'skyblue', fontSize: 20 }} type="check-square" />
                      ) : (
                        <Icon style={{ color: 'skyblue', fontSize: 20 }} type="border" />
                      ))}
                  </div>
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
      <Modal
        title="移动到指定相册"
        visible={selectAlbumProps.visible}
        onOk={() => {
          updatePhotos.run({ ids: selectAlbumProps.ids, albumId: selectAlbumProps.albumId });
        }}
        okButtonProps={{ disabled: !selectAlbumProps.albumId }}
        onCancel={() => setSelectAlbumProps({ visible: false })}
      >
        <Row>
          <Col style={{ lineHeight: '32px' }} span={5}>
            目标相册：
          </Col>
          <Col span={19}>
            <Select
              placeholder="请选择要移动到的相册"
              value={selectAlbumProps.albumId}
              onChange={value => setSelectAlbumProps({ albumId: Number(value) })}
              style={{ width: '100%' }}
            >
              {albums.map(album => (
                <Select.Option key={album.id} value={album.id}>
                  {album.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Modal>
      <CoverModal
        visible={coverProps.visible}
        albumId={coverProps.albumId}
        photos={photos}
        onChangeVisible={visible => setCoverProps({ visible: visible, albumId: null })}
        onSuccess={() => {
          getPhotos.run({ id: albumId });
        }}
      />
    </div>
  );
};

export default AlbumInfo;
