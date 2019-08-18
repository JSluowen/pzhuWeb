import React, { Component } from 'react';
import { Button, Modal, Form, Input, Tooltip, Icon, AutoComplete, message, Cascader, Spin, DatePicker } from 'antd';
// 引入七牛云
import * as qiniu from 'qiniu-js'
import qiniuAPI from '../../../front/api/qiniu'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
// 代码高亮显示
import 'braft-extensions/dist/code-highlighter.css'
import './index.scss'
//引入MakeDown语法
import Markdown from 'braft-extensions/dist/markdown'
// import moment from 'moment';
// const dateFormat = 'YYYY-MM-DD';
let options = {
    includeEditors: ['editor-with-code-highlighter'],
    syntaxs: [
        {
            name: 'JavaScript',
            syntax: 'javascript'
        }, {
            name: 'HTML',
            syntax: 'html'
        }, {
            name: 'CSS',
            syntax: 'css'
        }, {
            name: 'Java',
            syntax: 'java',
        }, {
            name: 'PHP',
            syntax: 'php'
        }
    ]
}
BraftEditor.use(CodeHighlighter(options));
BraftEditor.use(Markdown(options))
import './index.scss'
class ReviseArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined
        };
    }
    componentDidMount() {
        console.log(this.props.router.params)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const options = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
            }
        ]
        const excludeControls = ['fullscreen']
        const controls = [
            'undo', 'redo', 'separator',
            'font-size', 'line-height', 'letter-spacing', 'separator',
            'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
            'superscript', 'subscript', 'remove-styles', 'separator', 'text-indent', 'text-align', 'separator',
            'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
            'hr', 'separator',
            'clear', 'separator',
            'media', 'link'
        ]
        const hooks = {
            'open-braft-finder': () => {
                this.getMediaItems();
            },
            'remove-medias': (files) => {
                this.removeMedia(files)
            }
        }
        const myUploadFn = (param) => {
            let that = this;
            let file = param.file;
            const { name } = file;
            let arry = name.split('.')
            let postfix = arry[arry.length - 1]
            qiniuAPI.getToken().then(res => {
                let token = res.data;
                let key = Cookies.getCookies('id') + Date.now() + `.${postfix}`;
                let config = {
                    useCdnDomain: true, //是否使用 cdn 加速域名
                    region: qiniu.region.z2 //选择上传域名 华南
                }
                let putExtra = {
                    fname: file.name,
                    params: {},
                    mimeType: null
                }
                let observable = qiniu.upload(file, key, token, putExtra, config)
                let observer = {
                    next(res) {
                        param.progress(res.total.percent)
                    },
                    error(err) {
                        param.error({
                            msg: err
                        })
                    },
                    complete(res) {
                        let params = {
                            id: that.state.id,
                            key: res.key
                        }
                        ArticleEditAPI.uploadArticleResource(params).then(res => {
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
                                    }
                                })
                            }
                        })

                    }
                }
                observable.subscribe(observer)
                // subscription.unsubscribe(); //取消上传
            })
        }
        return (
            <div className='revise-article'>
                <div className='container' >
                    <div className='title'>
                        <span>文章编辑</span>
                    </div>
                    <div className='header'>
                        <div className='form-edit'>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label="文章标题">
                                    {getFieldDecorator('title', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入文章标题',
                                                whitespace: true
                                            }
                                        ]
                                    })(<Input disabled={this.state.flag} placeholder="请输入文章标题" />)}
                                </Form.Item>
                                <Form.Item label="关键字">
                                    {getFieldDecorator('keywords', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入与关键字',
                                                whitespace: true
                                            }
                                        ]
                                    })(<Input disabled={this.state.flag} placeholder="请输入与关键字" />)}
                                </Form.Item>
                                <Form.Item label="文章类别">
                                    {getFieldDecorator('menuid', {
                                        initialValue: this.state.initDomain,
                                        rules: [
                                            {
                                                type: 'array',
                                                required: true,
                                                message: '请选择文章类别'
                                            }
                                        ]
                                    })(
                                        <Cascader
                                            placeholder="请选择文章类别"
                                            // showSearch={this.filter}
                                            options={options}
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label="技术标签">
                                    {getFieldDecorator('technologyid', {
                                        initialValue: this.state.initDomain,
                                        rules: [
                                            {
                                                type: 'array',
                                                required: true,
                                                message: '请选择技术标签'
                                            }
                                        ]
                                    })(
                                        <Cascader
                                            placeholder="请选择技术标签"
                                            // showSearch={this.filter}
                                            options={options}
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label="发布日期">
                                    {getFieldDecorator('created_at', {
                                        rules: [{ type: 'object', required: true, message: '请选择发布日期!' }],
                                    })(<DatePicker />)}
                                </Form.Item>
                            </Form>
                        </div>
                        <div className='cover-edit'>
                            <div className='cover-img'>
                                <img src="http://img.pzhuweb.cn/test1562205431960" alt="" />
                            </div>
                            <Button type='primary' >修改封面</Button>
                        </div>
                    </div>
                    <div className='article-edit'>
                        <BraftEditor
                            id='editor-with-code-highlighter'
                            controls={controls}
                            excludeControls={excludeControls}
                            value={this.state.editorState}
                            onChange={this.getArticleContext}
                            media={{ uploadFn: myUploadFn, pasteImage: false, items: this.state.mediaItems }}
                            onDelete={this.delImg}
                            hooks={hooks}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(ReviseArticle);