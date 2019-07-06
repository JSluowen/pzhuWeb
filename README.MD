## 一、项目介绍
宏哥来了！！！！
`pzhu-web` 仓库是包含web和server端代码，主要技术栈使用[egg](https://eggjs.org/)框架做 web 后台服务，数据库使用 `mysql`，使用 `sequelize` 做封装；前台使用 [antd](https://ant.design/docs/react/getting-started-cn) 组件库，`react-router` 做路由，`webpack` 打包；发布使用 `docker` 容器提供环境。

## 二、项目结构

```bash
├── Dockerfile
├── README.md
├── app
│   ├── controller // 控制器
│   ├── extend // 扩展
│   │   └── helper.js
│   ├── middleware // 中间件
│   ├── model // sequelize定义的模块
│   ├── public // 前端打包后的文件
│   │   ├── build // 线上压缩后的代码
│   │   ├── img
│   │   └── local // 本地代码
│   ├── router.js // 路由
│   ├── service // 服务层，操作数据库
│   └── view // 视图html
│       └── index.html
├── client
│   ├── components // 通用组件
│   ├── constans // 持续层
│   ├── fonts // 字体
│   ├── html // 模版
│   ├── src // 前端页面
│   ├── CHNAGELOG // 发布记录
│   ├── webpack.common.js // webpack通用配置
│   ├── webpack.dev.js // 开发配置
│   └── webpack.prod.js // 线上打包配置
├── config // 各种环境配置
│   ├── config.default.js
│   ├── plugin.js // 插件配置
├── logs // 日志
├── package.json
```

## 三、开发方式

#### 1. 安装依赖

克隆好仓库后需要安装一下项目依赖。

```bash
cd pzhu-web
cnpm install #安装node依赖
cd client
cnpm install #安装前端依赖
```

#### 2. 本地开发

`npm start ` 启动node(目前可以先不启动，不存在接口调用)

`cd client && npm start` 启动前端环境
