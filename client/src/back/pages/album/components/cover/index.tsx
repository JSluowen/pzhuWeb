import React, { useState } from 'react';
import { Modal, Row, Col, message } from 'antd';
import { useRequest } from 'ahooks';
import { AlbumService, PhotoItem } from '../../service';
import './index.scss';

const CoverModal: React.FC<{
  visible: boolean;
  albumId: number;
  photos: PhotoItem[];
  onChangeVisible: (visible) => void;
  onSuccess?: () => void;
}> = ({ visible, photos, onChangeVisible, albumId, onSuccess }) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<number>();
  const updateCover = useRequest(AlbumService.updateAlbumCover, {
    manual: true,
    onSuccess: () => {
      onChangeVisible(false);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const handleOk = () => {
    if (!selectedPhotoId) {
      return message.warn('请选择其中一张图片');
    }
    updateCover.run({ albumId, id: selectedPhotoId });
  };
  return (
    <Modal
      visible={visible}
      title="修改项目封面"
      width={550}
      onCancel={() => {
        onChangeVisible(false);
      }}
      onOk={handleOk}
    >
      <div className="update-cover">
        {photos.map(photo => (
          <div className={`cover-warpper ${selectedPhotoId === photo.id ? 'cover-actived' : ''}`} key={photo.id}>
            <img onClick={() => setSelectedPhotoId(photo.id)} src={photo.link} alt="name" />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default CoverModal;
