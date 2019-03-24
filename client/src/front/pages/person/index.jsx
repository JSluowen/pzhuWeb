import React, { Component } from 'react';
import qiniu from '../../common/qiniu';
import { Upload, Button, Icon } from 'antd';



class Person extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fileList:[
				{
					uid: '-1',
					name: 'xxx.png',
					status: 'done',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
					thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
				}
			]
		};
	}
	componentWillMount() {}
	render() {

		const props = {
			listType: 'picture',
			defaultFileList: [ ...this.state.fileList ],
			beforeUpload(file){
				qiniu(file).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			}
		};

		return (
			<div>
				<Upload {...props}>
					<Button>
						<Icon type="upload" /> Upload
					</Button>
				</Upload>
			</div>
		);
	}
}

export default Person;
