import React, { Component } from 'react';
import { List, Avatar, Icon, Button, Divider } from 'antd';
import './index.scss';

//模拟数据
const list = [];
for (let i = 0; i < 23; i++) {
	list.push({
		name: 'Tom' + i,
		id: '201610804025',
		date: new Date(),
		key: i,
		check: false
	});
}

const IconText = ({ type, text }) => (
	<span>
		<Icon type={type} style={{ marginRight: 8 }} />
		{text}
	</span>
);

class applay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hiddenFlag: false,
            listData: list,

		};
	}
	handleChangeHidden = () => {
		let hiddenFlag = !this.state.hiddenFlag;
		this.setState({ hiddenFlag: hiddenFlag });
	};
	check = (e) => {
		let temp = this.listData;
        console.log(e.target.value);
        
    };
    
    resetData = ()=>{
        
    }
	render() {
		const { hiddenFlag, listData } = this.state;
		return (
			<div className="">
				<div className="flex_row">
					<Button onClick={this.handleChangeHidden}> 批量管理</Button>
					{hiddenFlag ? (
						<div className="average_flex_row">
							<Button type="primary" className="antd_Button_space">
								同意所有选中
							</Button>
							<Button type="danger" className="antd_Button_space">
								删除所有选中
							</Button>
						</div>
					) : null}
				</div>
				<Divider type="horizontal" />
				<List
					itemLayout="vertical"
					size="default"
					pagination={{
						onChange: (page) => {
							console.log(page);
						},
						pageSize: 5
					}}
					dataSource={listData}
					header={
						<List.Item className="appaly_list_header ">
							{hiddenFlag ? <span className="span_button">全选</span> : null}
							<span className="average_flex_row" style={{ flexGrow: '0.5', flexShrink: '0.5' }}>
								名字
							</span>
							<span className="average_flex_row">学号</span>
							<span className="average_flex_row">年级专业</span>
							<span className="average_flex_row">申请时间</span>
							<span className="average_flex_row">管理操作</span>
						</List.Item>
					}
					footer={<div>{/* <b>ant design</b> footer part */}</div>}
					renderItem={(item) => (
						<List.Item className="flex_row" key={item.key}>
							{hiddenFlag ? (
								<input type="checkbox" onClick={this.check} value={item.key} style={{ zoom: 2, width: '30px' }} />
							) : null}
							<span className="average_flex_row" style={{ flexGrow: '0.5', flexShrink: '0.5' }}>
								{item.name}
							</span>
							<span className="average_flex_row">{item.id}</span>
							<span className="average_flex_row">2016级——软件工程1班</span>
							<span className="average_flex_row">2019-12-12</span>
							<div className="average_flex_row">
								<Button type="primary" className="antd_Button_space">
									同意
								</Button>
								<Button type="danger" className="antd_Button_space">
									删除
								</Button>
							</div>
						</List.Item>
					)}
				/>
			</div>
		);
	}
}

export default applay;
