import base from './base';
import { Get, Post, Base } from './index';

class AlbumService {
  static async getAlbumTypes(params) {
    return Get(Base.getAlbumTypes);
  }
  static async createAlbum(params) {
    return Post(Base.createAlbum, params);
  }
}

export default AlbumService;
