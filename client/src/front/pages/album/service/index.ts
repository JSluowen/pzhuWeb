import { Get, Post, Base } from 'src/front/api/index';

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
  static async getAlbumTypes() {
    return Get(Base.getAlbumTypes);
  }
  static async createAlbum(params) {
    return Post(Base.createAlbum, params);
  }
  static async getAlbums() {
    return Get(Base.getAlbums);
  }
  static async delFile(key) {
    return Get(`${Base.delFile}?key=${key}`);
  }
  static async uploadPhotos(params) {
    return Post(Base.uploadPhotos, params);
  }
  static async getPhotosByAlbumId(id) {
    return Get(`${Base.getPhotosByAlbumId}?id=${id}`);
  }
}

export default AlbumService;
export { AlbumService, AlbumItem };
