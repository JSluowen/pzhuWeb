import React, { Component } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
// 代码高亮显示
import 'braft-extensions/dist/code-highlighter.css';
// 引入MakeDown语法
import Markdown from 'braft-extensions/dist/markdown';
import * as qiniu from 'qiniu-js';
import { QiuniuAPI } from '../../api';
import { BraftAPI } from '../../api';
import Cookies from '../../../http/cookies';
const options = {
  includeEditors: ['editor-with-code-highlighter'],
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript',
    },
    {
      name: 'HTML',
      syntax: 'html',
    },
    {
      name: 'CSS',
      syntax: 'css',
    },
    {
      name: 'Java',
      syntax: 'java',
    },
    {
      name: 'PHP',
      syntax: 'php',
    },
  ],
};
BraftEditor.use(CodeHighlighter(options));
BraftEditor.use(Markdown(options));

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleid: '', //  文章的Id
      editorState: '', // 文章内容
      mediaItems: [], // 获取媒体库初始化内容
      context: null, // 文章给你内容
      raw: null, // 用户编辑的文章内容格式
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.editorState !== state.editorState && props.articleid !== state.articleid) {
      return {
        editorState: BraftEditor.createEditorState(props.editorState),
        articleid: props.articleid,
      };
    }
    return false;
  }
  getMediaItems = () => {
    BraftAPI.getMediaItems().then(res => {
      if (res.success) {
        const mediaItems = res.data.map(item => {
          const arry = item.key.split('.');
          const type = arry[arry.length - 1];
          if (type === 'mp4') {
            return {
              id: item.id,
              type: 'VIDEO',
              url: item.link,
              loop: false, // 指定音视频是否循环播放
              autoPlay: true, // 指定音视频是否自动播放
              controls: true, // 指定音视频是否显示控制栏
            };
          } else if (type === 'mp3') {
            return {
              id: item.id,
              type: 'AUDIO',
              url: item.link,
              loop: false, // 指定音视频是否循环播放
              autoPlay: true, // 指定音视频是否自动播放
              controls: true, // 指定音视频是否显示控制栏
            };
          }
          return {
            id: item.id,
            type: 'IMAGE',
            url: item.link,
          };
        });
        this.setState({
          mediaItems,
        });
      }
    });
  };
  removeMedia = files => {
    const params = {
      data: files,
    };
    BraftAPI.removeMedia(params);
  };
  getBraftContext = editorState => {
    this.setState({
      editorState,
    });
    const data = {
      context: editorState.toHTML(),
      raw: editorState.toRAW(),
    };
    this.props.getBraftContext(data);
  };

  render() {
    const excludeControls = ['fullscreen'];
    const controls = [
      'undo',
      'redo',
      'separator',
      'font-size',
      'line-height',
      'letter-spacing',
      'separator',
      'text-color',
      'bold',
      'italic',
      'underline',
      'strike-through',
      'separator',
      'superscript',
      'subscript',
      'remove-styles',
      'separator',
      'text-indent',
      'text-align',
      'separator',
      'headings',
      'list-ul',
      'list-ol',
      'blockquote',
      'code',
      'separator',
      'hr',
      'separator',
      'clear',
      'separator',
      'media',
      'link',
    ];
    const hooks = {
      'open-braft-finder': () => {
        this.getMediaItems();
      },
      'remove-medias': files => {
        this.removeMedia(files);
      },
    };
    const myUploadFn = param => {
      const that = this;
      const file = param.file;
      const { name } = file;
      const arry = name.split('.');
      const postfix = arry[arry.length - 1];
      QiuniuAPI.getToken().then(res => {
        const token = res.data;
        const key = Cookies.getCookies('admin') + Date.now() + `.${postfix}`;
        // let key = 'test' + Date.now() + `.${postfix}`;
        const config = {
          useCdnDomain: true, // 是否使用 cdn 加速域名
          region: qiniu.region.z2, // 选择上传域名 华南
        };
        const putExtra = {
          fname: file.name,
          params: {},
          mimeType: null,
        };
        const observable = qiniu.upload(file, key, token, putExtra, config);
        const observer = {
          next(res) {
            param.progress(res.total.percent);
          },
          error(err) {
            param.error({
              msg: err,
            });
          },
          complete(res) {
            const params = {
              articleid: that.state.articleid,
              key: res.key,
            };
            BraftAPI.uploadMedia(params).then(res => {
              if (res.success) {
                param.success({
                  url: res.data.link,
                  meta: {
                    id: res.data.id,
                    title: res.data.key,
                    alt: res.data.key,
                    loop: true, // 指定音视频是否循环播放
                    autoPlay: true, // 指定音视频是否自动播放
                    controls: true, // 指定音视频是否显示控制栏
                    poster: 'http://img.pzhuweb.cn/04.jpg', // 指定视频播放器的封面
                  },
                });
              }
            });
          },
        };
        observable.subscribe(observer);
        // subscription.unsubscribe(); //取消上传
      });
    };
    return (
      <BraftEditor
        id="editor-with-code-highlighter"
        controls={controls}
        excludeControls={excludeControls}
        value={this.state.editorState}
        onChange={this.getBraftContext}
        media={{ uploadFn: myUploadFn, pasteImage: false, items: this.state.mediaItems }}
        onDelete={this.delImg}
        hooks={hooks}
      />
    );
  }
}

export default Editor;
