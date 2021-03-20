import React, { useState, useEffect } from 'react';
import { useSetState, useRequest } from 'ahooks';
import { Modal, Select, Upload, Row, Col, Icon, message } from 'antd';
import qiniuAPI from 'src/front/api/qiniu';
import Cookies from '../../../../http/cookies';
import AlbumService from '../service';

const { Dragger } = Upload;

const AlbumUpload: React.FC<{
  visible: boolean;
  albumId?: number;
  onChangeVisible: (visible) => void;
}> = ({ visible, albumId = null, onChangeVisible }) => {
  const [qiniuData, setQiniuData] = useSetState({
    token: '',
    key: '',
  });
  const [albums, setAlbums] = useState([]);
  const [uploadData, setUploadData] = useSetState<{ album: number; fileList: any[] }>({
    album: null,
    fileList: [],
  });

  const getAlbums = useRequest(AlbumService.getAlbums, {
    manual: true,
    onSuccess: res => {
      setAlbums(res.data?.albums);
      setUploadData({ album: Number(albumId) || res.data?.albums[0]?.id });
    },
  });
  const uploadPhotos = useRequest(AlbumService.uploadPhotos, {
    manual: true,
    onSuccess: res => {
      message.success('上传成功');
      onChangeVisible(false);
    },
  });

  const handleOk = () => {
    if (uploadData.fileList.length === 0) {
      message.warn('请先选择要上传的照片');
      return;
    }
    uploadPhotos.run({
      albumId: uploadData.album,
      imgs: uploadData.fileList.map(file => ({
        id: file.uid || file.id,
        link: `http://img.pzhuweb.cn/${file.response.key}`,
        name: file.name,
      })),
    });
  };
  const handleCancel = () => {
    onChangeVisible(false);
  };
  const beforeUpload = file => {
    console.log(file);
    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      message.error('文件格式不为png/jpg/jpeg');
      return false;
    }
    if (file.size > 1024 * 5) {
      message.error('文件过大，请降低分辨率后上传');
      return false;
    }
    setQiniuData({ key: Cookies.getCookies('id') + Date.now() + file.name });
    return true;
  };
  // 访问后端，获取请求上传凭证
  const fetchUploadToken = () => {
    qiniuAPI.getToken().then(res => {
      setQiniuData({ token: res.data });
    });
  };

  // 获取回传的文件地址
  // const handleUploadChange = info => {
  //   const { fileList, file } = info;
  //   if (file.status === 'done') {
  //     setUploadData({
  //       fileList: fileList.map(file => ({
  //         id: file.uid || file.id,
  //         uid: file.uid || file.id,
  //         status: 'done',
  //         link: file.url || `http://img.pzhuweb.cn/${file.response.key}`,
  //         name: file.name,
  //       })),
  //     });
  //     console.log(uploadData.fileList)
  //   }
  // };
  const delFile = key => {
    AlbumService.delFile(key).then(res => {
      return true;
    });
  };
  useEffect(() => {
    if (!visible) return;
    fetchUploadToken();
    getAlbums.run();
  }, [visible]);
  return (
    <Modal
      title="上传图片"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={uploadPhotos.loading}
    >
      <div className="album-upload-warpper" style={{ padding: 20 }}>
        <Row>
          <Col span={4}>相册：</Col>
          <Col span={20}>
            <Select
              style={{ width: 200 }}
              placeholder="请选择上传的相册"
              value={uploadData.album}
              onChange={value => setUploadData({ album: value })}
            >
              {albums.map(album => (
                <Select.Option key={album.id} value={album.id}>
                  {album.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={4}>照片：</Col>
          <Col span={20}>
            <Dragger
              listType="picture-card"
              name="file"
              action="http://upload-z2.qiniup.com"
              data={qiniuData}
              multiple={true}
              fileList={uploadData.fileList}
              beforeUpload={file => beforeUpload(file)}
              onRemove={file => {
                if (file.response?.key) {
                  delFile(file.response?.key);
                }
                return true;
              }}
              onPreview={file => {
                // console.log(file);
              }}
              onChange={({ fileList }) =>
                setUploadData({ fileList: fileList.map(file => ({ ...file, status: file.status || 'error' })) })
              }
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
              <p className="ant-upload-hint">支持单个或批量上传。</p>
              <p className="ant-upload-hint">仅支持上传png/jpg/jpeg格式的图片</p>
            </Dragger>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
export default AlbumUpload;
