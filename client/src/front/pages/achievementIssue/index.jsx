import React, { Component } from 'react';
import { Input, Button, Icon, message, Spin, Progress, Form } from 'antd';
import './index.scss';
import Cookies from '../../../http/cookies';
import AchievementIssueAPI from '../../api/achievementIssue';
import * as qiniu from 'qiniu-js'
import qiniuAPI from '../../api/qiniu'
const { TextArea } = Input;
class AchievementIssue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',//成果Id
            title: '',
            achievementlink: '',
            abstract: '',
            type: '',
            status: 1,// 默认1数据添加状态，2数据更新状态,
            achievementType: [],
            loading: false,
            progress: 0,
            coverLoading: false,// 封面图上传进度
            delCoverLoading: false,// 删除封面图
            posterlink: '',// 封面图的cdn地址
            delCoverStatus: false,// 是否删除封面图的状态
            attachment: '',// 附件的cdn地址
            attachmentStatus: false,//是否有附件
            attachmentLoading: false,//上传附件的进度
        };
        this.selectLabel = React.createRef();
    }
    componentDidMount() {
        this.setState({
            id: this.props.params.id || ''
        }, () => {
            this.getAchievementIssue()
        })
    }
    // 初始化获取资源信息
    getAchievementIssue = () => {
        let params = {
            id: this.state.id
        }
        AchievementIssueAPI.getAchievementIssue(params).then(res => {
            if (res.success) {
                this.setState({
                    achievementType: res.data
                })
            } else {
                this.setState({
                    id: res.data.achievement[0].id,
                    type:res.data.achievement[0].typeid,
                    title: res.data.achievement[0].title,
                    achievementlink: res.data.achievement[0].achievementlink,
                    abstract: res.data.achievement[0].abstract,
                    achievementType: res.data.achievementType,
                    posterlink: res.data.achievement[0].posterlink,
                    attachment: res.data.achievement[0].attachment,
                    status: 2
                }, () => {
                    this.initResource(res.data.achievement[0].typeid)
                })
            }
        })
    }
    //初始化成果资源
    initResource = (data) => {
        let node = this.selectLabel.current.children;
        for (let item of node) {
            if (parseInt(item.getAttribute('index')) === data) {
                item.classList.add('tagActive');
            }
        }
        let { setFieldsValue } = this.props.form;
        setFieldsValue({ "achievementlink": this.state.achievementlink })
        setFieldsValue({ "title": this.state.title })
        setFieldsValue({ "abstract": this.state.abstract })
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
        if (this.state.title === '') {
            message.warning('成果标题不能为空')
        } else if (this.state.type === '') {
            message.warning('请选择成果类别')
        } else if (this.state.abstract === '') {
            message.warning('请对成果进行简单描述')
        }
        else {
            let params = {
                id: this.state.id,
                userid: Cookies.getCookies('id'),
                title: this.state.title,
                achievementlink: this.state.achievementlink,
                type: this.state.type,
                abstract: this.state.abstract,
                status: this.state.status
            }
            this.setState({
                loading: true
            })
            AchievementIssueAPI.uploadAchievement(params).then(res => {
                if (res.success) {
                    setTimeout(() => {
                        this.setState({
                            loading: false,
                        })
                        message.success('成果发布成功')
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
                    that.uploadAchievementCover(res);
                }
            }
            observable.subscribe(observer)
            // subscription.unsubscribe(); //取消上传
        })


    }
    //上传封面图数据到数据库
    uploadAchievementCover = (data) => {
        let params = {
            id: this.state.id,
            userid: Cookies.getCookies('id'),
            key: data.key,
            status: this.state.status
        }
        AchievementIssueAPI.uploadAchievementCover(params).then(res => {
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
    delAchievementCover = () => {
        let params = {
            id: this.state.id,
            posterlink: this.state.posterlink
        }
        AchievementIssueAPI.delAchievementCover(params).then(res => {
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
        if (type !== 'application/pdf') {
            message.warning('请上传文件后缀为.pdf 的附件');
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
                mimeType: ["application/x-zip-compressed", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
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
                    that.uploadAchievementAttachment(res)
                }
            }
            observable.subscribe(observer)
        })
    }
    // 上传附件地址到数据库
    uploadAchievementAttachment = (data) => {
        let params = {
            id: this.state.id,
            userid: Cookies.getCookies('id'),
            key: data.key,
            status: this.state.status
        }
        AchievementIssueAPI.uploadAchievementAttachment(params).then(res => {
            if (res.success) {
                this.setState({
                    id: res.data.id,
                    attachment: res.data.attachment,
                    status: res.data.status
                })
            }
        })
    }
    //删除附加
    delAchievementAttachment = () => {
        let params = {
            id: this.state.id,
            attachment: this.state.attachment
        }
        AchievementIssueAPI.delAchievementAttachment(params).then(res => {
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
            <div className='achievementIssue'>
                <div className='achievementIssue-container'>
                    <Spin tip='成果发布中...' spinning={this.state.loading}>
                        <div className='achievementIssue-container-header'>
                            成果发布
                        </div>
                        <div className='achievementIssue-container-body'>
                            <div className='achievementIssue-container-body-left'>
                                {
                                    getFieldDecorator('achievementlink', {

                                    })(
                                        <Input size="large" placeholder='成果链接：http://www.pzhuweb.cn' onChange={(e) => { this.setState({ achievementlink: e.target.value }) }} />
                                    )
                                }
                                {
                                    getFieldDecorator('title', {

                                    })(
                                        <Input size="large" placeholder='请输入成果标题' onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                    )
                                }
                                {
                                    getFieldDecorator('abstract', {

                                    })(
                                        <TextArea placeholder='成果描述（100字以内）' onChange={(e) => { this.setState({ abstract: e.target.value }) }} />
                                    )
                                }
                                <div className='achievementIssue-container-body-left-tag' ref={this.selectLabel}>
                                    <p>分类</p>
                                    {
                                        this.state.achievementType.map(item => {
                                            return <Button key={item.id} onClick={this.handelSelect} index={item.id} >{item.name}</Button>
                                        })
                                    }
                                </div>
                                <Button style={{ width: '100%', margin: '20px 0' }} onClick={this.handelIssue} type='primary'>发布</Button>
                            </div>
                            <div className='achievementIssue-container-body-right'>
                                <div className='achievementIssue-container-body-right-top' >
                                    {
                                        this.state.posterlink === "" || this.state.posterlink === null ?
                                            <label htmlFor='uploadImg' className='achievementIssue-container-body-right-top-imgLabel'>
                                                <div className='achievementIssue-container-body-right-top-imgLabel-cover'>
                                                    <Icon type="cloud-upload" style={{ color: '#1890ff', fontSize: '40px' }} />
                                                    <span>点击上传封面图</span>
                                                </div>
                                            </label>
                                            :
                                            <div className='achievementIssue-container-body-right-top-delCover' onClick={this.delAchievementCover} onMouseLeave={() => { this.setState({ delCoverStatus: false }) }} onMouseEnter={() => { this.setState({ delCoverStatus: true }) }} style={{ backgroundImage: `url(${this.state.posterlink})` }} >
                                                <div style={this.state.delCoverStatus ? { opacity: 1 } : { opacity: 0 }} className='achievementIssue-container-body-right-top-delCover-shadow'>点击删除封面图</div>
                                            </div>

                                    }
                                    <input id='uploadImg' accept=".png, .jpg, .jpeg" type="file" hidden onChange={this.uploadCover} />
                                    <div style={this.state.coverLoading ? { display: 'block' } : { display: 'none' }} className='achievementIssue-container-body-right-top-progress'>
                                        <Progress
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                            percent={this.state.progress}
                                        />
                                    </div>
                                </div>
                                <div className='achievementIssue-container-body-right-attachment'>
                                    {
                                        this.state.attachmentStatus || (this.state.attachment !== null && this.state.attachment !== '') ?
                                            <div className='achievementIssue-container-body-right-attachment-file'>
                                                <div className='achievementIssue-container-body-right-attachment-file-name'>
                                                    <p>
                                                        <Icon type="paper-clip" />
                                                        <a href={this.state.attachment}>附件</a>
                                                    </p>
                                                    <p onClick={this.delAchievementAttachment} >
                                                        <Icon type="close" />
                                                    </p>
                                                </div>
                                                <Progress style={this.state.attachmentLoading ? { display: 'block' } : { display: 'none' }} percent={this.state.progress} status="active" />
                                            </div>
                                            :
                                            <label htmlFor="uploadFile" className="achievementIssue-container-body-right-attachment-fileLabel">
                                                <Icon type="upload" />添加附件
                                             </label>
                                    }
                                    <input id='uploadFile' accept=".pdf" type="file" hidden onChange={this.uploadAttachment} />
                                </div>
                            </div>

                        </div>
                    </Spin>
                </div>

            </div>
        );
    }
}
const AchievementIssues = Form.create()(AchievementIssue)
export default AchievementIssues;