import React, { Component } from 'react';
import { Link } from 'react-router'
import { List, Avatar, Divider, Table, Input, Button, Icon, } from 'antd';
import './index.scss';
import Highlighter from 'react-highlight-words';
import User from '../../api/user'

// 每条成员数据结构
//let menber =  {
// 			id:"201610804025" - i, 
// 			name:"TOM" + i, 
// 			email:"baidu@qq.com", 
// 			majorClass:'2016级软件工程1班', 
// 			phone:'180-4566-7897', 
// 			desc:"一段描述信息"	
// 		}
// {

// 表格渲染数据对象，保存数据

class menberList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			dataSource: [],
		};
	}
	componentDidMount() {
		// 请求接口数据，然后根据数据结构封装格式化每项数据
		
		const allListPromise = User.allList({});
		allListPromise.then((data) => {
			let dataSource = [];
			let result = data.data;
			for(let i = 0;i<result.length;i++) {
				let template = {};
				let {phone,description}  = result[i];
				let {id,name,email} =result[i].User ;
				let majorClass = result[i].Major.name;
				template.id = id;
				template.name = name;
				template.email = email;
				template.phone = phone;
				template.description = description;
				template.majorClass = majorClass;
				dataSource.push(template);
			}
			this.setState({ dataSource:dataSource }, () => { console.log(this.state.dataSource) });
		})
		
	}
	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys, selectedKeys, confirm, clearFilters,
		}) => (< div style={{ padding: 8 }} >  < Input
			ref={node => { this.searchInput = node; }}
			placeholder={`请输入查询值`}
			value={selectedKeys[0]}
			onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
			onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
			style={{ width: 188, marginBottom: 8, display: 'block' }}
		/>  < Button
			type="primary"
			onClick={() => this.handleSearch(selectedKeys, confirm)}
			icon="search"
			size="small"
			style={{ width: 90, marginRight: 8 }} >
				搜索 </Button >  < Button
					onClick={() => this.handleReset(clearFilters)}
					size="small"
					style={{ width: 90 }} >
				重置 </Button >  </div >),
		filterIcon: filtered => < Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: (text) => (< Highlighter
			highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
			searchWords={[this.state.searchText]}
			autoEscape
			textToHighlight={text.toString()}
		/>),
	})

	handleSearch = (selectedKeys, confirm) => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	}

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: '' });
	}


	render() {
		const columns = [{
			title: '学号',
			dataIndex: 'id',
			key: 'id',
			...this.getColumnSearchProps('id'),
		}, {
			title: '名字',
			dataIndex: 'name',
			key: 'name',
			...this.getColumnSearchProps('name'),
		}, {
			title: '邮箱',
			dataIndex: 'email',
			key: 'email',
		}, {
			title: '专业年级',
			dataIndex: 'majorClass',
			key: 'majorClass',
			...this.getColumnSearchProps('majorClass'),
		}, {
			title: '电话',
			dataIndex: 'phone',
			key: 'phone',
			...this.getColumnSearchProps('phone'),
		}, {
			title: '简介',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span>
					<Link to={`/info?id=${record.id}`}>详情信息</Link>
					<Button style={{ 'backgroundColor': 'inherit', 'border': 'none', 'color': '#1890ff' }}>发邮件</Button>
				</span>
			),
		}
		];
		return (< div className="" >< Table dataSource={this.state.dataSource} columns={columns} />  </div >);
	}
}

export default menberList; 
