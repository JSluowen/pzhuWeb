import React, { useEffect } from 'react';
import { Upload, message } from 'antd';
import { useSetState } from 'ahooks';
import { Base, Post, Get } from 'front/api';
import Cookies from 'src/http/cookies';
import qiniuAPI from 'src/front/api/qiniu';

const { Dragger } = Upload;

const MyUpload: React.FC<{
  isDragger?: boolean;
  multiple?: boolean;
  defaultList?: Array<any>;
  handleChange: (files) => void;
}> = ({ children, isDragger = true, multiple = true, defaultList = null, handleChange }) => {
  const [uploadData, setUploadData] = useSetState<{ album: number; fileList: any[] }>({
    album: null,
    fileList: [],
  });
  const [qiniuData, setQiniuData] = useSetState({
    token: '',
    key: '',
  });

  const fetchUploadToken = () => {
    qiniuAPI.getToken().then(res => {
      setQiniuData({ token: res.data });
    });
  };

  const delFile = key => {
    Post(Base.delFile, { key }).then(res => {
      const delIndex = uploadData.fileList.findIndex(file => file.name === key);
      let fileList = [...uploadData.fileList];
      fileList.splice(delIndex, 1);
      setUploadData({ fileList });
      handleChange(fileList);
      return true;
    });
  };
  const beforeUpload = file => {
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
  const handleFileChange = (fileList, file) => {
    setUploadData({ fileList: fileList.map(file => ({ ...file, status: file.status || 'error' })) });
    if (file.status === 'done') {
      handleChange(fileList.map(file => ({ ...file, link: `http://img.pzhuweb.cn/${file.response.key}` })));
    }
  };

  useEffect(() => {
    fetchUploadToken();
  }, []);

  return (
    <div>
      {isDragger ? (
        <Dragger
          listType="picture-card"
          action="http://upload-z2.qiniup.com"
          data={qiniuData}
          multiple={multiple}
          fileList={uploadData.fileList}
          beforeUpload={file => beforeUpload(file)}
          onRemove={file => {
            if (file.response?.key) {
              delFile(file.response?.key);
            }
            return true;
          }}
          onPreview={file => {}}
          onChange={({ fileList, file }) => handleFileChange(fileList, file)}
        >
          {children}
        </Dragger>
      ) : (
        <Upload
          listType="picture-card"
          action="http://upload-z2.qiniup.com"
          data={qiniuData}
          multiple={multiple}
          fileList={uploadData.fileList}
          beforeUpload={file => beforeUpload(file)}
          onRemove={file => {
            if (file.response?.key) {
              delFile(file.response?.key);
            }
            return true;
          }}
          onPreview={file => {}}
          onChange={({ fileList, file }) => handleFileChange(fileList, file)}
        >
          {children}
        </Upload>
      )}
    </div>
  );
};

export default MyUpload;
