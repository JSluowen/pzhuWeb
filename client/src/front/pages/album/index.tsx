import React, { useEffect, useState } from 'react';
import { Button, Card, Icon } from 'antd';
import { useSetState, useRequest } from 'ahooks';

import { Aside, Item } from './components/aside';
import AlbumUpload from './components/albumUpload';
import CreateAlbum from './components/createAlbum';
import AlbumService from './service';
import './index.scss';

const ALBUM_STATUS_ICON = {
  1: { icon: 'unlock', desc: '公开的' },
  2: { icon: 'lock', desc: '私有的' },
};

const Album = ({ history }) => {
  const [albums, setAlbums] = useState([]);
  const [albumTypes, setAlbumTypes] = useState([]);
  const [uploadProps, setUploadProps] = useSetState({
    visible: false,
    alibumId: null,
  });
  const [createAlbumVisible, setCreateAlbumVisible] = useState(false);
  const getAlbums = useRequest(AlbumService.getAlbums, {
    onSuccess: res => {
      setAlbums(
        res.data.albums.map(album => ({
          id: album.id,
          name: album.name,
          cover: album?.Photo?.link,
          desc: album.desc,
          status: album.status,
        })),
      );
      const typeObj = {};
      res.data.albums?.forEach(album => {
        if (!typeObj[album.type]) {
          typeObj[album.type] = { num: 0, name: album.AlbumType.name };
        }
        typeObj[album.type].num++;
      });
      const types = Object.keys(typeObj).map(id => ({ id, name: typeObj[id].name, num: typeObj[id].num }));
      if (albumTypes.length === 0) {
        setAlbumTypes(types);
      }
    },
  });
  // useEffect(() => {
  //   getAlbums.run();
  // }, []);
  return (
    <div>
      <div className="album-container">
        <div className="album-main">
          <div className="album-main-left">
            <Aside
              title="相册分类"
              data={albumTypes}
              onSelected={selectedId => {
                if (Number(selectedId) !== -1) {
                  return getAlbums.run({ type: selectedId });
                }
                getAlbums.run();
              }}
            />
          </div>
          <div className="album-main-right">
            <Card
              extra={
                <>
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
                </>
              }
            >
              <div className="album-item-warpper">
                {albums.map(album => (
                  <Card
                    className="album-item"
                    key={album.name}
                    hoverable={true}
                    cover={<img alt="相册封面" src={album.cover} />}
                    onClick={() => {
                      history.push(`/album/${album.id}`);
                    }}
                  >
                    <Card.Meta
                      title={
                        <div>
                          <div title={album.name}>{album.name}</div>
                          <Icon
                            title={ALBUM_STATUS_ICON[album.status].desc}
                            type={ALBUM_STATUS_ICON[album.status].icon}
                          />
                        </div>
                      }
                      description={
                        <div title={album.desc || '这个家伙很懒，什么都没有写'}>
                          {album.desc || '这个家伙很懒，什么都没有写'}
                        </div>
                      }
                    />
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <AlbumUpload visible={uploadProps.visible} onChangeVisible={visible => setUploadProps({ visible })} />
      <CreateAlbum
        visible={createAlbumVisible}
        onChangeVisible={visible => {
          setCreateAlbumVisible(visible);
          setAlbumTypes([]);
          getAlbums.run();
        }}
      />
    </div>
  );
};
export default Album;
export { Album };
