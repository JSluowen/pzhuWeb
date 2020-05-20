export enum themeMapEnum {
  /**
   * 首屏主页
   */
  HOME = '/home',
  /**
   * 登录页面
   */
  LOGIN = '/login',
}

export const themeMap: Record<themeMapEnum, string> = {
  [themeMapEnum.HOME]: 'transparent',
  [themeMapEnum.LOGIN]: 'transparent',
};
