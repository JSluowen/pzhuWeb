import React, { Component } from 'react';
import { Button, Modal, Form, Input, Tooltip, Icon, AutoComplete, message, Cascader, Spin, DatePicker } from 'antd';
import moment from 'moment';
// // 引入七牛云
// import * as qiniu from 'qiniu-js'
// import qiniuAPI from '../../../front/api/qiniu'
// 引入编辑器组件
import BraftEditor from '../../components/braftEditor'
import ArticleAPI from '../../api/article'
import './index.scss'
class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      userid:undefined,
      initMenu: [],
      initTechnology: [],
      menu: [],
      technology: [],
      postlink: '',
      date: new Date(),
      editorState:'',// 文章内容
      context:'',// 解析后的文章内容
      raw:'',
    };
  }
  componentDidMount() {
    this.setState({
      id: this.props.params.id || null
    }, () => {
      this.getArticleEdit()
    })
  }
  getArticleEdit = () => {
    let params = {
      id: this.state.id
    }
    ArticleAPI.getArticleEdit(params).then(res => {
      if (res.success) {
        console.log(res.data)
        this.initMenuAndTec(res.data.menu, res.data.technology);
        this.initArticleInfo(res.data.article);
      } else {
        message.warning('修改的文章不存在')
        this.props.router.push('/back/article');
      }
    }).catch(err => {
      console.log(err)
      this.props.router.push('/back/article');
    })
  }
  // 初始化文章类别和技术标签
  initMenuAndTec = (menu, technology) => {
    const initMenu = menu.map(item => {
      return {
        label: item.name,
        value: item.id
      }
    })
    const initTechnology = technology.map(item => {
      return {
        label: item.name,
        value: item.id
      }
    })
    this.setState({
      initMenu,
      initTechnology
    })
  }
  // 初始化文章的信息
  initArticleInfo = (data) => {
    let { setFieldsValue } = this.props.form;
    setFieldsValue({
      'title':data[0].title,
      "keywords": data[0].keywords,
      'created_at':moment(data[0].created_at,'YYYY-MM-DD')
    })
    this.setState({
      postlink: data[0].postlink,
      menu: [data[0].menuid],
      technology: [data[0].technologyid],
      date: data[0].created_at,
      editorState:data[0].raw,
      userid:data[0].userid
    })
  }
  // 修改文章日期
  handleChangeDate = (data, dataString) => {
    this.setState({
      data: dataString
    })
  }
  // 获取编辑器的内容
  getBraftContext=(data)=>{
    this.setState({
      context:data.context,
      raw:data.raw
    })
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
    const braftEditorConfig={
      articleid:this.state.id,
      editorState:this.state.editorState
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
                  })(<Input placeholder="请输入文章标题" />)}
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
                  })(<Input placeholder="请输入与关键字" />)}
                </Form.Item>
                <Form.Item label="文章类别">
                  {getFieldDecorator('menuid', {
                    initialValue: this.state.menu,
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
                      options={this.state.initMenu}
                    />
                  )}
                </Form.Item>
                <Form.Item label="技术标签">
                  {getFieldDecorator('technologyid', {
                    initialValue: this.state.technology,
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
                      options={this.state.initTechnology}
                    />
                  )}
                </Form.Item>
                <Form.Item label="发布日期">
                  {getFieldDecorator('created_at', {
                    rules: [{ type: 'object', required: true, message: '请选择发布日期!' }],
                  })(<DatePicker/>)}
                </Form.Item>
                <Form.Item label="发布日期">
                  {getFieldDecorator('created_at', {
                    rules: [{ type: 'object', required: true, message: '请选择发布日期!' }],
                  })(<DatePicker/>)}
                </Form.Item>
              </Form>
            </div>
            <div className='cover-edit'>
              <div className='cover-img'>
                <img src={this.state.postlink} alt="文章封面图" />
              </div>
              <Button type='primary' >修改封面</Button>
            </div>
          </div>
          <div className='article-edit'>
            <BraftEditor {...braftEditorConfig} getBraftContext={this.getBraftContext} />
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(ArticleEdit);