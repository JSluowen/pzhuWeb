import React, { Component } from 'react';
import { Link } from 'react-router';
import { Input, Icon, Avatar, Button, Spin, message, Form } from 'antd';
import Cookies from '../../../http/cookies'
import ArticleEditAPI from '../../api/articleEdit'
// 引入七牛云
import * as qiniu from 'qiniu-js'
import qiniuAPI from '../../api/qiniu'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
// 代码高亮显示
import 'braft-extensions/dist/code-highlighter.css'
import './index.scss'
BraftEditor.use(CodeHighlighter({
	includeEditors: ['editor-with-code-highlighter'],
}))

class ArticleEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',// 文章的Id
			status: 1,// 默认1数据添加状态，2数据更新状态,
			coverStatus: false,
			issueStatus: false,
			editorState: BraftEditor.createEditorState(null),
			coverLoading: false,// 上传状态
			menu: [],//分类
			technology: [],// 技术标签
			article: '',//文章资源
			delCoverStatus: false,//删除显示
			mediaItems: [],// 获取媒体库初始化内容
			selectType: '',//文章类别
			selectTechnology: '',// 技术标签
			title: '',// 文章标题
			keywords: '',// 文章关键字
			postlink: '',// 封面图链接
			context: '',// 文章给你内容
			raw: '',// 用户编辑的文章内容格式
			avatar: '',// 用户头像
			articleLoding: false//发布文章
		}
		this.selectType = React.createRef();
		this.selectTechnology = React.createRef();
	}

	componentDidMount() {
		this.setState({
			id: this.props.params.id || ''
		}, () => {
			this.getArticleEdit()
		})
	}
	//获取初始化媒体库的信息
	getMediaItems = () => {
		ArticleEditAPI.getMediaItems().then(res => {
			if (res.success) {
				let mediaItems = res.data.map(item => {
					let arry = item.key.split('.')
					let type = arry[arry.length - 1];
					if (type === 'mp4') {
						return {
							id: item.id,
							type: 'VIDEO',
							url: item.link,
							loop: false, // 指定音视频是否循环播放
							autoPlay: true, // 指定音视频是否自动播放
							controls: true, // 指定音视频是否显示控制栏
						}
					} else if (type === 'mp3') {
						return {
							id: item.id,
							type: 'AUDIO',
							url: item.link,
							loop: false, // 指定音视频是否循环播放
							autoPlay: true, // 指定音视频是否自动播放
							controls: true, // 指定音视频是否显示控制栏
						}
					} else {
						return {
							id: item.id,
							type: 'IMAGE',
							url: item.link,
						}
					}
				})
				this.setState({
					mediaItems: mediaItems
				})
			}
		})
	}
	// 删除媒体的资源
	removeMedia = (files) => {
		let params = {
			data: files
		}
		ArticleEditAPI.removeMedia(params)
	}
	getArticleEdit = () => {
		let params = {
			id: this.state.id
		}
		ArticleEditAPI.getArticleEdit(params).then(res => {
			if (res.success) {
				this.setState({
					menu: res.data.menu,
					technology: res.data.technology,
					id: res.data.article.id,
					status: res.data.article.status,
					avatar: res.data.userinfo[0].avatar
				})
			} else {
				this.setState({
					menu: res.data.menu,
					technology: res.data.technology,
					article: res.data.article[0],
					id: res.data.article[0].id,
					postlink: res.data.article[0].postlink,
					status: 2,
					avatar: res.data.userinfo[0].avatar
				}, () => {
					this.initArticle()
				})
			}
		}).catch(err => {
			this.props.router.push('/setting');
		})
	}
	// 初始化文章资源
	initArticle = () => {
		const article = this.state.article;
		const { title, raw, context, keywords, technologyid, menuid } = article;
		let { setFieldsValue } = this.props.form;
		setFieldsValue({ "title": title })
		this.setState({
			editorState: BraftEditor.createEditorState(context),
			keywords: keywords,
			selectType: menuid,
			selectTechnology: technologyid,
			title: title

		})
		let selectType = this.selectType.current.children;
		for (let item of selectType) {
			if (parseInt(item.getAttribute('index')) === menuid) {
				item.classList.add('tagActive');
			}
		}
		let selectTechnology = this.selectTechnology.current.children;
		for (let item of selectTechnology) {
			if (parseInt(item.getAttribute('index')) === technologyid) {
				item.classList.add('tagActive');
			}
		}
	}
	handShowCover = () => {
		if (this.state.issueStatus == true) {
			this.setState({
				issueStatus: false
			})
		}
		this.setState({
			coverStatus: !this.state.coverStatus
		})
	}
	handShowIssue = () => {
		if (this.state.coverStatus == true) {
			this.setState({
				coverStatus: false
			})
		}
		this.setState({
			issueStatus: !this.state.issueStatus
		})
	}
	// 上传图片到七牛云
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
			// let key = "test" + Date.now() + `.${postfix}`;
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
					that.uploadArticleeCover(res);
				}
			}
			observable.subscribe(observer)
			// subscription.unsubscribe(); //取消上传
		})
	}
	uploadArticleeCover = (data) => {
		let params = {
			id: this.state.id,
			key: data.key,
			status: this.state.status
		}
		ArticleEditAPI.uploadArticleeCover(params).then(res => {
			if (res.success) {
				this.setState({
					id: res.data.id,
					postlink: res.data.postlink,
					status: res.data.status,
					coverLoading: false
				})
				message.success('上传成功');
			}
		})
	}
	// 删除封面图片
	delCoverImg = () => {
		const params = {
			id: this.state.id,
			postlink: this.state.postlink
		}
		ArticleEditAPI.delCoverImg(params).then(res => {
			if (res.success) {
				this.setState({
					postlink: ''
				})
			}
		})
	}
	getArticleContext = (editorState) => {
		this.setState({
			editorState: editorState,
			context: editorState.toHTML(),
			raw: editorState.toRAW()
		})
	}
	//选择标签
	handelSelectType = (e) => {
		let children = e.target.parentNode.children;
		for (let i = 0; i < children.length; i++) {
			children[i].classList.remove("tagActive");
		}
		e.target.classList.add('tagActive');
		this.setState({
			selectType: e.target.getAttribute('index')
		})
	}
	handelSelectTeachnology = (e) => {
		let children = e.target.parentNode.children;
		for (let i = 0; i < children.length; i++) {
			children[i].classList.remove("tagActive");
		}
		e.target.classList.add('tagActive');
		this.setState({
			selectTechnology: e.target.getAttribute('index')
		})
	}
	// 发布文章信息
	uploadArticleInfo = () => {
		let str = this.state.context;
		let text = str.replace(/<[^<>]+>/g, "");
		const abstract = text.substring(0, 120);
		if (this.state.title === '') {
			message.warning('请输入文章标题')
		} else if (this.state.selectType === '') {
			message.warning('请选择文章类别')
		} else if (this.state.selectTechnology === '') {
			message.warning('请选择文章的技术标签');
		} else if (this.state.keywords === '') {
			message.warning('请输入文章关键字')
		} else if (this.state.context === '<p></p>') {
			message.warning('请编写文章内容')
		} else if (this.state.postlink === '' || this.state.postlink === null) {
			message.warning('请上传文章封面图')
		} else {
			this.setState({
				articleLoding: true
			})
			let params = {
				id: this.state.id,
				status: this.state.status,
				title: this.state.title,
				context: this.state.context,
				raw: this.state.raw,
				postlink: this.state.postlink,
				technologyid: this.state.selectTechnology,
				keywords: this.state.keywords,
				menuid: this.state.selectType,
				abstract: abstract
			}
			ArticleEditAPI.uploadArticleInfo(params).then(res => {
				if (res.success) {
					setTimeout(() => {
						this.setState({
							articleLoding: false
						})
						message.success('发布成功')
					}, 200)
				}
			})
		}

	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const excludeControls = ['fullscreen']
		const controls = [
			'undo', 'redo', 'separator',
			'font-size', 'line-height', 'letter-spacing', 'separator',
			'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
			'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
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
						console.log(res)
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
			<div className='articleEdit'>
				<Spin tip='文章发布中...' spinning={this.state.articleLoding} >
					<div className='articleEdit-header'>
						<div className='articleEdit-header-logo'>
							<a href="/">
								<img src="http://img.pzhuweb.cn/logo.png" alt="logo" />
							</a>
						</div>
						<div className='articleEdit-header-title'>
							{
								getFieldDecorator('title', {

								})(
									<Input onChange={(e) => { this.setState({ title: e.target.value }) }} placeholder='请输入文章标题' ></Input>
								)
							}

						</div>
						<div className='articleEdit-header-right'>
							<div className='articleEdit-header-right-cover'  >
								<Icon onClick={this.handShowCover} type="picture" />

								<div className='articleEdit-header-right-cover-upload' style={this.state.coverStatus ? { display: 'block' } : { display: 'none' }} >
									<Spin spinning={this.state.coverLoading}>
										<div className='articleEdit-header-right-cover-upload-title'>添加封面大图</div>
										{
											this.state.postlink === '' || this.state.postlink === null ?
												<label className='articleEdit-header-right-cover-upload-addBtn' htmlFor="uploadCover">点击此处添加图片</label>
												:
												<div onClick={this.delCoverImg} style={{ backgroundImage: `url(${this.state.postlink})` }} onMouseEnter={() => { this.setState({ delCoverStatus: true }) }} onMouseOut={() => { this.setState({ delCoverStatus: false }) }} className='articleEdit-header-right-cover-upload-delCover'>
													<div style={this.state.delCoverStatus ? { opacity: 1 } : { opacity: 0 }} className='articleEdit-header-right-cover-upload-delCover-shadow'>点击删除封面图</div>
												</div>
										}

										<input id="uploadCover" hidden type="file" onChange={this.uploadCover} />
									</Spin>
								</div>

							</div>
							<div className='articleEdit-header-right-issue' >
								<p onClick={this.handShowIssue}><span>发布</span>
									<Icon type="caret-down" /></p>
								<div className='articleEdit-header-right-issue-panel' onMouseLeave={(e) => { if (e.target.tagName !== 'DIV') return; this.setState({ issueStatus: false }); }} style={this.state.issueStatus ? { display: 'block' } : { display: 'none' }}>
									<div className='articleEdit-header-right-issue-panel-title'>发布文章</div>
									<div className='articleEdit-header-right-issue-panel-category'>分类</div>
									<div className='articleEdit-header-right-issue-panel-categoryList' ref={this.selectType} >
										{
											this.state.menu.map(item => {
												return <Button onClick={this.handelSelectType} key={item.id} index={item.id}>{item.name}</Button>
											})
										}
									</div>
									<div className='articleEdit-header-right-issue-panel-technology'>技术标签</div>
									<div className='articleEdit-header-right-issue-panel-technologyList' ref={this.selectTechnology}>
										{
											this.state.technology.map(item => {
												return <Button onClick={this.handelSelectTeachnology} key={item.id} index={item.id}>{item.name}</Button>
											})
										}
									</div>
									<div className='articleEdit-header-right-issue-panel-keyWords'>关键字</div>
									<div className='articleEdit-header-right-issue-panel-keyWordsList'>
										<input value={this.state.keywords} onChange={(e) => { this.setState({ keywords: e.target.value }) }} placeholder='请添加一个关键字'></input>
									</div>
									<div className='articleEdit-header-right-issue-panel-issueBtn'>
										<Button ghost onClick={this.uploadArticleInfo} >文章发布</Button>
									</div>
								</div>
							</div>
							<div className='articleEdit-header-right-avatar'>
								<Link to="user">
									<Avatar
										size={40}
										src={this.state.avatar} />
								</Link>
							</div>
						</div>
					</div>
					<div className='articleEdit-body'>
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
				</Spin>
			</div>
		);
	}
}
const ArticleEdits = Form.create()(ArticleEdit)
export default ArticleEdits;