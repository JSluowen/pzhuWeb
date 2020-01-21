declare module 'webpack-simple-progress-plugin';

interface IContext {
  avatar?: string;
}

interface IRes {
  success: number;
  data: [] | Object;
  message?: string;
}
