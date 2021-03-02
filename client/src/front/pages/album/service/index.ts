import { Get, Post, Base } from 'src/front/api/index';

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
}

export default AlbumService;
export { AlbumService };
