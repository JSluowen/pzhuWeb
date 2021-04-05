import { Get, get, Post, Base } from 'src/back/api/index';
interface BaseItem {
  title: string;
  desc: string;
  order: number;
  cover: string;
  id: number;
}
class HomeService {
  static async getHomeInfo() {
    return Get(Base.getHomeInfo);
  }
  static async updateHomeInfo(params) {
    return Post(Base.updateHomeInfo, params);
  }
}
export default HomeService;
export { BaseItem };
