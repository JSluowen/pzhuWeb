import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';

// 媒体假数据，模拟数据
const mediaItems = [
	{
		id: 1,
		type: 'IMAGE',
		url: 'https://margox.cn/wp-content/uploads/2018/09/IMG_9508.jpg'
	},
	{
		id: 2,
		type: 'IMAGE',
		url: 'https://margox.cn/wp-content/uploads/2017/05/IMG_4995-480x267.jpg'
	},
	{
		id: 3,
		type: 'IMAGE',
		url: 'https://margox.cn/wp-content/uploads/2017/05/IMG_4984-480x267.jpg'
	},
	{
		id: 4,
		type: 'AUDIO',
		url: 'https://margox.cn/wp-content/uploads/2016/10/Jesper-Kyd-Venice-Rooftops.mp3'
	},
	{
		id: 5,
		type: 'IMAGE',
		url: 'https://margox.cn/wp-content/uploads/2016/02/DSC_6961-980x654.jpg'
	}
];

const hooks = {
	'select-files': (e) => {
		console.log(items);
	},
	'open-braft-finder': (target, a) => {
		console.log('+++++++++++++++++++++');
		console.log(target, a);
	}
};

class BraftTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edittorSate: BraftEditor.createEditorState(),
			mediaItems: []
		};
	}
	componentWillMount() {
		this.setState({ mediaItems: mediaItems });
	}
	componentDidMount() {
		console.log(this.refs.ename.braftFinder);
		console.log(this.refs.ename.braftFinder.getItems());
		this.refs.ename.braftFinder.addMediaItem({
			id: 12,
			type: 'IMAGE',
			url: 'https://www.baidu.com/img/xin_7a1b580bfa7ae96eaabaf2ca1fc083ae.gif'
		});
	}
	render() {
		const { edittorSate, mediaItems } = this.state;
		return (
			<div className="editor-wrapper">
				<BraftEditor
					contentStyle={{ height: 410, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
					value={edittorSate}
					media={{
						items: mediaItems,
						accepts: {
							image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
							video: 'video/mp4',
							audio: 'audio/mp3'
						},
						hooks: hooks
					}}
					ref="ename"
				/>
			</div>
		);
	}
}

export default BraftTest;
