import React, { Component } from 'react';
import { Input, Button, Icon, message, Spin, Progress, Form, Tooltip } from 'antd';
import './index.scss';
import Cookies from '../../../http/cookies';
import ResourceIssueAPI from '../../api/resourceIssue';
import * as qiniu from 'qiniu-js'
import qiniuAPI from '../../api/qiniu'
const { TextArea } = Input;
class ResourceIssue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',//文章Id
            title: '',
            link: '',
            description: '',
            type: '',
            status: 1,// 默认1数据添加状态，2数据更新状态,
            resource: {},
            resourceType: [],
            loading: false,
            progress: 0,
            coverLoading: false,// 封面图上传进度
            delCoverLoading: false,// 删除封面图
            posterlink: '',// 封面图的cdn地址
            delCoverStatus: false,// 是否删除封面图的状态
            attachment: '',// 附件的cdn地址
            attachmentStatus: false,//是否有附件
            attachmentLoading: false,//上传附件的进度,
        };
        this.selectLabel = React.createRef();
    }
    componentDidMount() {
        this.setState({
            id: this.props.params.id || ''
        }, () => {
            this.getResourceIssue()
        })
    }
    // 初始化获取资源信息
    getResourceIssue = () => {
        let params = {
            id: this.state.id
        }
        ResourceIssueAPI.getResourceIssue(params).then(res => {
            if (res.success) {
                this.setState({
                    resourceType: res.data
                })
            } else {
                this.setState({
                    id: res.data.resource[0].id,
                    type: res.data.resource[0].typeid,
                    resource: res.data.resource[0],
                    link: res.data.resource[0].link,
                    title: res.data.resource[0].title,
                    resourceType: res.data.resourceType,
                    posterlink: res.data.resource[0].posterlink,
                    attachment: res.data.resource[0].attachment,
                    status: 2
                }, () => {
                    this.initResource(res.data.resource[0].typeid)
                })

            }
        })
    }
    //初始化资源
    initResource = (data) => {
        let node = this.selectLabel.current.children;
        for (let item of node) {
            if (parseInt(item.getAttribute('index')) === data) {
                item.classList.add('tagActive');
            }
        }
        let { setFieldsValue } = this.props.form;
        setFieldsValue({ "link": this.state.resource.link })
        setFieldsValue({ "title": this.state.resource.title })
        setFieldsValue({ "description": this.state.resource.description })
    }
    //选择标签
    handelSelect = (e) => {
        let children = e.target.parentNode.children;
        for (let i = 0; i < children.length; i++) {
            children[i].classList.remove("tagActive");
        }
        e.target.classList.add('tagActive');
        this.setState({
            type: e.target.getAttribute('index')
        })
    }
    // 上传资源
    handelIssue = () => {
        if ((this.state.link === '' || this.state.link === null) && (this.state.attachment === '' || this.state.attachment === null)) {
            message.warning('请填写链接或者上传资源附件');
        } else if (this.state.title === '' || this.state.title === null) {
            message.warning('资源标题不能为空')
        } else if (this.state.type === '' || this.state.type === null) {
            message.warning('请选择资源类别')
        } else if (this.state.description === '' || this.state.description === null) {
            message.warning('请添加资源描述')
        }
        else if (this.state.description.length > 120) {
            message.warning('请将资源描述控制在120字以内')
        }
        else if (this.state.posterlink === '' || this.state.posterlink === null) {
            message.warning('请上传封面图')
        } else {
            let params = {
                id: this.state.id,
                userid: Cookies.getCookies('id'),
                title: this.state.title,
                link: this.state.link,
                type: this.state.type,
                description: this.state.description,
                status: this.state.status
            }
            this.setState({
                loading: true
            })
            ResourceIssueAPI.uploadResource(params).then(res => {
                if (res.success) {
                    setTimeout(() => {
                        this.setState({
                            loading: false,
                        })
                        message.success('资源分享成功')
                    }, 500)
                }
            })
        }
    }
    // 上传封面图
    uploadCover = (e) => {
        let file = e.target.files
        const { size, type, name } = file[0];
        if (type !== "image/jpeg" && type !== 'image/png') {
            message.warning('请上传类型为 png 或 jpg 的图片 ')
            return;
        };
        if (size > (1024 * 1024)) {
            message.warning('请上传小于1M的图片');
            return;
        }
        let arry = name.split('.')
        let postfix = arry[arry.length - 1]
        const that = this;
        this.setState({
            coverLoading: true
        })
        qiniuAPI.getToken().then(res => {
            let token = res.data;
            let key = Cookies.getCookies('id') + Date.now() + `.${postfix}`;
            let config = {
                useCdnDomain: true, //是否使用 cdn 加速域名
                region: qiniu.region.z2 //选择上传域名 华南
            }
            let putExtra = {
                fname: file[0].name,
                params: {},
                mimeType: ["image/png", "image/jpeg"]
            }
            let observable = qiniu.upload(file[0], key, token, putExtra, config)
            let observer = {
                next(res) {
                    that.setState({
                        progress: Math.floor(res.total.percent)
                    })
                },
                error(err) {
                    console.log(err)
                    that.setState({
                        coverLoading: false
                    })
                    message.err('上传失败')
                },
                complete(res) {
                    that.setState({
                        coverLoading: false
                    })
                    that.uploadResourceCover(res);
                }
            }
            observable.subscribe(observer)
            // subscription.unsubscribe(); //取消上传
        })


    }
    //上传封面图数据到数据库
    uploadResourceCover = (data) => {
        let params = {
            id: this.state.id,
            userid: Cookies.getCookies('id'),
            key: data.key,
            status: this.state.status
        }
        ResourceIssueAPI.uploadResourceCover(params).then(res => {
            if (res.success) {
                this.setState({
                    id: res.data.id,
                    posterlink: res.data.posterlink,
                    status: res.data.status
                })
            }
        })
    }
    // 点击删除封面图
    delResourceCover = () => {
        let params = {
            id: this.state.id,
            posterlink: this.state.posterlink
        }
        ResourceIssueAPI.delResourceCover(params).then(res => {
            if (res.success) {
                this.setState({
                    posterlink: ''
                })
            }
        })
    }
    // 上传附件
    uploadAttachment = (e) => {
        let file = e.target.files
        const { size, type, name } = file[0];
        if (type !== 'application/x-zip-compressed') {
            message.warning('请上传文件后缀为.zip的附件');
            return;
        }
        if (size > (5 * 1024 * 1024)) {
            message.warning('请上传小于 5M 的文件')
        }
        this.setState({
            attachmentLoading: true,
            attachmentStatus: true
        })
        let arry = name.split('.')
        let postfix = arry[arry.length - 1]
        let that = this;
        qiniuAPI.getToken().then(res => {
            let token = res.data;
            let key = Cookies.getCookies('id') + Date.now() + `.${postfix}`;
            let config = {
                useCdnDomain: true, //是否使用 cdn 加速域名
                region: qiniu.region.z2 //选择上传域名 华南
            }
            let putExtra = {
                fname: file[0].name,
                params: {},
                mimeType: ["application/x-zip-compressed"]
            }
            let observable = qiniu.upload(file[0], key, token, putExtra, config)
            let observer = {
                next(res) {
                    that.setState({
                        progress: Math.floor(res.total.percent)
                    })
                },
                error(err) {
                    console.log(err)
                    that.setState({
                        coverLoading: false
                    })
                    message.err('上传失败')
                },
                complete(res) {
                    that.setState({
                        attachmentLoading: false
                    })
                    that.uploadResourceAttachment(res)
                }
            }
            observable.subscribe(observer)
            // subscription.unsubscribe(); //取消上传
        })
    }
    // 上传附件地址到数据库
    uploadResourceAttachment = (data) => {
        let params = {
            id: this.state.id,
            userid: Cookies.getCookies('id'),
            key: data.key,
            status: this.state.status
        }
        ResourceIssueAPI.uploadResourceAttachment(params).then(res => {
            if (res.success) {
                this.setState({
                    id: res.data.id,
                    attachment: res.data.attachment,
                    status: res.data.status
                })
            }
        })
    }
    //删除附件
    delResourceAttachment = () => {
        let params = {
            id: this.state.id,
            attachment: this.state.attachment
        }
        ResourceIssueAPI.delResourceAttachment(params).then(res => {
            if (res.success) {
                this.setState({
                    attachment: '',
                    attachmentStatus: false
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='resourceIssue'>
                <div className='resourceIssue-container'>
                    <Spin tip='资源分享中...' spinning={this.state.loading}>
                        <div className='resourceIssue-container-header'>
                            资源分享
                        </div>
                        <div className='resourceIssue-container-body'>
                            <div className='resourceIssue-container-body-left'>
                                {
                                    getFieldDecorator('link', {

                                    })(
                                        <Input size="large" placeholder='分享资源链接：http://www.pzhuweb.cn' onChange={(e) => { this.setState({ link: e.target.value }) }} />
                                    )
                                }
                                {
                                    getFieldDecorator('title', {

                                    })(
                                        <Input size="large" placeholder='请输入资源标题' onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                    )
                                }
                                {
                                    getFieldDecorator('description', {

                                    })(
                                        <TextArea placeholder='资源描述（120字以内）' onChange={(e) => { this.setState({description:e.target.value}) }} />
                                    )
                                }
                                <div className='resourceIssue-container-body-left-tag' ref={this.selectLabel}>
                                    <p>分类</p>
                                    {
                                        this.state.resourceType.map(item => {
                                            return <Button key={item.id} onClick={this.handelSelect} index={item.id} >{item.name}</Button>
                                        })
                                    }
                                </div>
                                <Button style={{ width: '100%', margin: '20px 0' }} onClick={this.handelIssue} type='primary'>发布</Button>
                            </div>
                            <div className='resourceIssue-container-body-right'>
                                <div className='resourceIssue-container-body-right-top' >
                                    {
                                        this.state.posterlink === "" || this.state.posterlink === null ?
                                            <label htmlFor='uploadImg' className='resourceIssue-container-body-right-top-imgLabel'>
                                                <div className='resourceIssue-container-body-right-top-imgLabel-cover'>
                                                    <Icon type="cloud-upload" style={{ color: '#1890ff', fontSize: '40px' }} />
                                                    <span>点击上传封面图</span>
                                                </div>
                                            </label>
                                            :
                                            <div className='resourceIssue-container-body-right-top-delCover' onClick={this.delResourceCover} onMouseLeave={() => { this.setState({ delCoverStatus: false }) }} onMouseEnter={() => { this.setState({ delCoverStatus: true }) }} style={{ backgroundImage: `url(${this.state.posterlink})` }} >
                                                <div style={this.state.delCoverStatus ? { opacity: 1 } : { opacity: 0 }} className='resourceIssue-container-body-right-top-delCover-shadow'>点击删除封面图</div>
                                            </div>

                                    }
                                    <input id='uploadImg' accept=".png, .jpg, .jpeg" type="file" hidden onChange={this.uploadCover} />
                                    <div style={this.state.coverLoading ? { display: 'block' } : { display: 'none' }} className='resourceIssue-container-body-right-top-progress'>
                                        <Progress
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                            percent={this.state.progress}
                                        />
                                    </div>
                                </div>
                                <div className='resourceIssue-container-body-right-attachment'>
                                    {
                                        this.state.attachmentStatus || (this.state.attachment !== null && this.state.attachment !== '') ?
                                            <div className='resourceIssue-container-body-right-attachment-file'>
                                                <div className='resourceIssue-container-body-right-attachment-file-name'>
                                                    <p>
                                                        <Icon type="paper-clip" />
                                                        <a href={this.state.attachment}>附件</a>
                                                    </p>
                                                    <p onClick={this.delResourceAttachment} >
                                                        <Icon type="close" />
                                                    </p>
                                                </div>
                                                <Progress style={this.state.attachmentLoading ? { display: 'block' } : { display: 'none' }} percent={this.state.progress} status="active" />
                                            </div>
                                            :
                                            <Tooltip placement="bottom" title='请上传资源压缩包'>
                                                <label htmlFor="uploadFile" className="resourceIssue-container-body-right-attachment-fileLabel">
                                                    <Icon type="upload" />添加资源附件
                                             </label>
                                            </Tooltip>
                                    }
                                    <input id='uploadFile' accept=".zip" type="file" hidden onChange={this.uploadAttachment} />
                                </div>
                            </div>
                        </div>
                    </Spin>
                </div>

            </div>
        );
    }
}

const ResourceIssues = Form.create()(ResourceIssue)
export default ResourceIssues;