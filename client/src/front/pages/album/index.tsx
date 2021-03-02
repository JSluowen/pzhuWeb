import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import { useSetState, useRequest } from 'ahooks';

import { Aside, Item } from './components/aside';
import AlbumUpload from './components/albumUpload';
import CreateAlbum from './components/createAlbum';
import AlbumService from './service';
import './index.scss';

const Album = () => {
  const testAlbum = [];
  const [albums, setAlbums] = useState(['album1', 'album2', 'album3']);
  const [albumTypes, setAlbumTypes] = useState([]);
  const [uploadProps, setUploadProps] = useSetState({
    visible: false,
    alibumId: null,
  });
  const [createAlbumVisible, setCreateAlbumVisible] = useState(false);
  const getAlbums = useRequest(AlbumService.getAlbums, {
    onSuccess: res => {
      setAlbums(res.data.albums);
      const typeObj = {};
      res.data.albums?.forEach(album => {
        if (!typeObj[album.type]) {
          typeObj[album.type] = { num: 0, name: album.AlbumType.name };
        }
        typeObj[album.type].num++;
      });
      const types = Object.keys(typeObj).map(id => ({ id, name: typeObj[id].name, num: typeObj[id].num }));
      setAlbumTypes(types);
    },
  });

  const albumType: Item[] = [
    { id: 1, name: '分类1', num: 2 },
    { id: 2, name: '分类2', num: 5 },
    { id: 3, name: '分类3', num: 2 },
    { id: 4, name: '分类4', num: 3 },
  ];
  useEffect(() => {
    getAlbums.run();
  }, []);
  return (
    <div>
      <div className="album-container">
        <div className="album-header">
          <Button
            className="album-header-btn"
            onClick={() => {
              setUploadProps({ visible: true });
            }}
          >
            上传图片
          </Button>
          <Button className="album-header-btn" onClick={() => setCreateAlbumVisible(true)}>
            创建相册
          </Button>
        </div>
        <div className="album-main">
          <div className="album-main-left">
            <Aside
              title="相册分类"
              data={albumTypes}
              onSelected={selectedId => {
                console.log(selectedId);
              }}
            />
          </div>
          <div className="album-main-right">
            {albums.map(item => (
              <Card className="album-item" key={item}>
                <Card.Meta>{item}</Card.Meta>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <AlbumUpload visible={uploadProps.visible} onChangeVisible={visible => setUploadProps({ visible })} />
      <CreateAlbum visible={createAlbumVisible} onChangeVisible={visible => setCreateAlbumVisible(visible)} />
    </div>
  );
};
export default Album;
export { Album };
