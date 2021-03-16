import { Get, get, Post, Base } from 'src/back/api/index';

class AlbumItem {
  id: number;
  user_id: string;
  type: number;
  name: string;
  desc: string;
  cover: string;
  status: number;
}

class AlbumService {
  // static async getAlbumTypes() {
  //   return Get(Base.getAlbumTypes);
  // }
  // static async createAlbum(params) {
  //   return Post(Base.createAlbum, params);
  // }
  static async getAlbums(params = null) {
    return get(Base.getAlbums, params);
  }
  // static async delFile(key) {
  //   return Post(Base.delFile, { key });
  // }
  // static async uploadPhotos(params) {
  //   return Post(Base.uploadPhotos, params);
  // }
  // static async getPhotosByAlbumId(id) {
  //   return Get(`${Base.getPhotosByAlbumId}?id=${id}`);
  // }
}

export default AlbumService;
export { AlbumService, AlbumItem };
