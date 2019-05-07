import React, { Component } from 'react';
import { List, Avatar, Icon, Button, Divider , message} from 'antd';
import './index.scss';

import User from '../../api/User';
//模拟数据
// dataForm:
//    {
//       id:String,
//       name:String,
//       major-class:String,
//       phone:String,
//   }

const IconText = ({ type, text }) => (
	<span>
		<Icon type={type} style={{ marginRight: 8 }} />
		{text}
	</span>
);

class apply extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hiddenFlag: false,
			apply: [],// 初始状态
			agree:[],//修改选中 执行同意操作后的数据集合
			reject:[],// 拒绝后得数据集合
		};
	}
	// 配置数据请求函数
	 applyList=()=>{
		let applyPromise =  User.applyList();
		applyPromise.then((data)=>{
			console.log(data);
			this.setState({apply:data.data});
		})
	}

	componentDidMount(){
		this.applyList({})
	}


	handleChangeHidden = () => {
		let hiddenFlag = !this.state.hiddenFlag;
		this.setState({ hiddenFlag: hiddenFlag });
	};
	
	check = (e) => {
		let temp = this.state.apply;
		temp[e.target.value].check=!temp[e.target.value].check;
		this.setState({
			apply:temp
		})
	};
	//全选功能
	handleCheckAll=()=>{
		console.log(`全选`);
		let data = this.state.apply,len=data.length;
		for(let i = 0; i<len ;i++){
			data[i].check =!data[i].check;
		}
		console.log(data)
		this.setState({apply:data})
	}
	// 单按钮同意功能
	handleAgree(item){
		const agreePromise = User.agreeOne({userid:item.id});
		agreePromise.then((data)=>{
			if(data.success){
				// 删除成功。执行更新
				message.info("通过 成功!");
				this.applyList();
			}else{
				// 抛出错误
				message.info("通过失败!");
			}
		})
	}
	//单击删除按钮
	handleDelete(item){
		// 用一个返回值来确定删除是否成功，直接复用flag的值
		const promiseDelete = User.softDeleteOne({userid:item.id});
		promiseDelete.then((data)=>{
			if(data.success){
				// 删除成功。执行更新
				message.info("delete success!");
				this.applyList();

			}else{
				// 抛出错误
				message.info("delete false!");
			}
		})
	}
	//全选后同意（批量管理）
	handleAllAgree=()=>{
		console.log(`at all agree handle function`)
		const {apply,agree} = this.state;
		var len = apply.length;
		console.log(apply[1]);
		console.log(apply[11]);

		for(var i = 0;i<len;i++){
			var flag= apply[i] && apply[i].check;
			if(flag===true){
				agree.push(apply.splice(i,1));
			}
		}
		this.setState({agree:agree,apply:apply});
	}

	//全选后通过（批量管理）
	handleAllAgree=()=>{
		console.log(`at all agree handle function`)
		const {apply,agree} = this.state;
		var len = apply.length;
		console.log(apply[1]);
		console.log(apply[11]);

		for(var i = 0;i<len;i++){
			var flag= apply[i] && apply[i].check;
			if(flag===true){
				agree.push(apply.splice(i,1));
			}
		}
		this.setState({agree:agree,apply:apply});
	}

    resetData = ()=>{
        
    }
	render() {
		const { hiddenFlag, apply } = this.state;
		return (
			<div className="">
				<div className="flex_row">
					<Button onClick={this.handleChangeHidden}> 批量管理</Button>
					{hiddenFlag ? (
						<div className="average_flex_row">
							<Button type="primary" className="antd_Button_space" onClick={this.handleAllAgree.bind(this)}>
								同意所有选中
							</Button>
							<Button type="danger" className="antd_Button_space" onClick={this.test}>
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
					dataSource={apply}
					header={
						<List.Item className="appaly_list_header ">
							{hiddenFlag ? <span className="span_button" onClick = {this.handleCheckAll}>全选</span> : null}
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
								<input type="checkbox"  value={item.key} style={{ zoom: 2, width: '30px' }} checked={item.check} onChange={this.check}/>
							) : null}
							<span className="average_flex_row" style={{ flexGrow: '0.5', flexShrink: '0.5' }}>
								{item.name}
							</span>
							<span className="average_flex_row">{item.id}</span>
							<span className="average_flex_row">2016级——软件工程1班</span>
							<span className="average_flex_row">2019-12-12</span>
							<div className="average_flex_row">
								<Button type="primary" className="antd_Button_space" tick={item.key} onClick = {this.handleAgree.bind(this,item)}>
									通过
								</Button>
								<Button type="danger" className="antd_Button_space" onClick={this.handleDelete.bind(this,item)}>
									驳回
								</Button>
							</div>
						</List.Item>
					)}
				/>
			</div>
		);
	}
}

export default apply;
