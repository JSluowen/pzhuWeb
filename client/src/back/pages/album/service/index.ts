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
class PhotoItem {
  id: number;
  name: string;
  link: string;
}

class AlbumService {
  static async getAlbumTypes() {
    return Get(Base.getAlbumTypes);
  }
  // static async createAlbum(params) {
  //   return Post(Base.createAlbum, params);
  // }
  static async getAlbums(params = null) {
    return get(Base.getAlbums, params);
  }
  static async createAlbumType(params) {
    return Post(Base.createAlbumType, params);
  }
  static async delAlbumType(params) {
    return Post(Base.delAlbumType, params);
  }
  // static async delFile(key) {
  //   return Post(Base.delFile, { key });
  // }
  // static async uploadPhotos(params) {
  //   return Post(Base.uploadPhotos, params);
  // }
  static async getPhotosByAlbumId(params) {
    return get(Base.getPhotosByAlbumId, params);
  }
  static async delPhotos(params) {
    return Post(Base.delPhotos, params);
  }
  static async updatePhotos(params) {
    return Post(Base.updatePhotos, params);
  }
  static async updateAlbumCover(params) {
    return Post(Base.updateAlbumCover, params);
  }
}

export default AlbumService;
export { AlbumService, AlbumItem, PhotoItem };
