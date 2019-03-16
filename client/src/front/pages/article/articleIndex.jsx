import React from 'react';
import { Input, Button,Avatar, Upload, Menu, Icon, message, Dropdown } from 'antd';

import ArticleEdi from './ArticleEdi';

import './article.scss';

import logo from '../../images/logo.3c28af6.png'

// 模拟数据，文章标签
const tag = [
	{ type: 'java', value: 123 },
	{ type: 'C++', value: 123 },
	{ type: 'web前端', value: 123 },
	{ type: 'web后端', value: 123 },
	{ type: '大数据', value: 123 },
	{ type: '面试经验', value: 123 }
];

class index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articleTittle: '',
			output: '',
      tag: [],
      user:{
        avatar:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        name:'',
        info:''
      }
		};
	}
	componentWillMount() {
		this.setState({ tag: tag });
  }
  handleUploadCover(e){
    //将封面图上传并返回 url
    console.log(e.target)
  }

  //限制封面图的格式大小
   beforeUpload(file) {
    const isImage = (file.type).match("image") === 'image';
    if (!isImage) {
      message.error('You can only upload image file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isImage && isLt2M;
  }

	// 获取标题的改变
	titleChange(e) {
		console.log(e.target.value);
		this.setState({
			articleTittle: e.target.value
		});
	}
	// 从富文本编辑器获取编辑的数据
	onSbumit = (data) => {
		if (data) {
			this.setState({ output: data });
		} else {
			console.log(new Error('没有获取到文本编辑器的输出数据'));
		}
	};

	render() {

		const panel = (
			<Menu>
        <span>文章发布</span>
				<Menu.Item>
					{this.state.tag.map((value, key) => {
						return <Button key={key}>{value.type}</Button>;
					})}
				</Menu.Item>

			</Menu>
    );
    

		return (
			<div className="content">
					<div className="ediet-function">
            {/* 团队图标 */}
            <img src = {logo} height = '48px'/>
						<Input placeholder="输入文章标题" size="small" onChange={this.titleChange} />
						<Button type="dashed" title = "保存到草稿">草稿</Button>
            <Upload 
              onChange = {this.handleUploadCover}
              beforeUpload={this.beforeUpload}
            >
							<Button className="no-border-btn" title="添加封面图片">
								<Icon type="picture" /> 
							</Button>
						</Upload>
						{/* 文章标签选择 及其发布 */}
						<Dropdown overlay={panel}>
							<span className="ant-dropdown-link hover" >
								发布 <Icon type="down" />
							</span>
						</Dropdown>
            <Avatar src={this.state.user.avatar} />
					</div>
				<div className="edit-area">
					<ArticleEdi onSbumit={this.onSbumit} className="ediet" />
				</div>
    </div>
    );
  } 
}

export default index;
