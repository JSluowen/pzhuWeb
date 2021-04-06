import React from 'react';
import { Modal } from 'antd';

const PhotoModal: React.FC<{
  visible: boolean;
  url: string;
  onChangeVisible: (visible) => void;
}> = ({ visible, url, onChangeVisible }) => {
  return (
    <Modal width={700} visible={visible} footer={null} onCancel={() => onChangeVisible(false)}>
      <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={url} />
    </Modal>
  );
};
export default PhotoModal;
export { PhotoModal };
