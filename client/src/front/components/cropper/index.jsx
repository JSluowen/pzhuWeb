import React, { Component } from 'react';
import { Button, message } from 'antd';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './index.scss';
class CropperImg extends Component {
	constructor(props) {
		super(props);
		this.state = {
			src: props.src

		};
	}
	// 获取本地文件的图片
	onChange = (e) => {
		e.preventDefault();
		let files;
		if (e.dataTransfer) {
			files = e.dataTransfer.files;
		} else if (e.target) {
			files = e.target.files;
		}
		if (!/image\/\w+/.test(files[0].type)) {
			message.warning('请上传图片');
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			this.setState({ src: reader.result });
		};
		reader.readAsDataURL(files[0]);
	};



	//获取剪切过后的图片
	cropImage = () => {
		if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
			return;
		}
		let dataurl = this.cropper.getCroppedCanvas().toDataURL();
		this.props.uploadImg(dataurl);//向父组件传值

	};

	render() {
		return (
			<div className="cropper-container">
				<div className="cropper-container-cropperImg">
					<div className="cropper-container-cropperImg-left">
						<Cropper
							ref="cropper"
							style={{ height: 200, width: '100%' }}
							aspectRatio={1 / 1}
							preview=".img-preview"
							guides={false}
							src={this.state.src}
							ref={(cropper) => {
								this.cropper = cropper;
							}}
						/>
					</div>
					<div className="cropper-container-cropperImg-right">
						<div className="cropper-container-cropperImg-right-largeAvatar">
							<div className="img-preview" style={{ width: '100%', float: 'left', height: 100 }} />
						</div>
						<div className="cropper-container-cropperImg-right-smallAvatar">
							<div className="img-preview" style={{ width: '100%', float: 'left', height: 50 }} />
						</div>
					</div>
				</div>
				<div className="cropper-container-btn">
					<Button>
						<label htmlFor="selectFile" style={{ cursor: 'pointer' }}>
							重新选择
						</label>
					</Button>
					<input id="selectFile" type="file" style={{ display: 'none' }} onChange={this.onChange} />
					<Button type="primary" onClick={this.cropImage}>
						保存并关闭
					</Button>
				</div>
			</div>
		);
	}
}

export default CropperImg;
