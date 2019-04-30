import React,  {Component }from 'react'; 
import {List, Avatar, Divider, Table, Input, Button, Icon, }from 'antd'; 
import './index.scss'; 
import Highlighter from 'react-highlight-words'; 
// {
// 	id:'',
// 	name:'',
// 	email:'',
// 	majorClass:'',
// 	phone:'',
// 	desc:'',
// }
//模拟数据
const dataSource = []; 
for (let i = 0; i < 30; i++) {
	let menber =  {
			id:"201610804025" - i, 
			name:"TOM" + i, 
			email:"baidu@qq.com", 
			majorClass:'2016级软件工程1班', 
			phone:'180-4566-7897', 
			desc:"一段描述信息"	
		}
	dataSource.push(menber); 
}

class menberList extends Component {
	constructor(props) {
		super(props); 
		this.state =  {
			searchText:'', 
        }; 
	}
		getColumnSearchProps = (dataIndex) => ( {
			filterDropdown:( {
			  setSelectedKeys, selectedKeys, confirm, clearFilters, 
			}) => ( < div style =  { {padding:8 }} >  < Input
				  ref =  {node =>  {this.searchInput = node; }}
				  placeholder =  {`请输入查询值`}
				  value =  {selectedKeys[0]}
				  onChange =  {e => setSelectedKeys(e.target.value?[e.target.value]:[])}
				  onPressEnter =  {() => this.handleSearch(selectedKeys, confirm)}
				  style =  { {width:188, marginBottom:8, display:'block'}}
				/>  < Button
				  type = "primary"
				  onClick =  {() => this.handleSearch(selectedKeys, confirm)}
				  icon = "search"
				  size = "small"
				  style =  { {width:90, marginRight:8 }} > 
				  Search </Button >  < Button
				  onClick =  {() => this.handleReset(clearFilters)}
				  size = "small"
				  style =  { {width:90 }} > 
				  Reset </Button >  </div > ), 
			filterIcon:filtered =>  < Icon type = "search"style =  { {color:filtered?'#1890ff':undefined }}/> , 
			onFilter:(value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()), 
			onFilterDropdownVisibleChange:(visible) =>  {
			  if (visible) {
				setTimeout(() => this.searchInput.select()); 
			  }
			}, 
			render:(text) => ( < Highlighter
				highlightStyle =  { {backgroundColor:'#ffc069', padding:0 }}
				searchWords =  {[this.state.searchText]}
				autoEscape
				textToHighlight =  {text.toString()}
			  /> ), 
		  })
		
		  handleSearch = (selectedKeys, confirm) =>  {
			confirm(); 
			this.setState( {searchText:selectedKeys[0] }); 
		  }
		
		  handleReset = (clearFilters) =>  {
			clearFilters(); 
			this.setState( {searchText:''}); 
		  }
		  
	  
	render() {
		const columns = [ {
				title:'学号', 
				dataIndex:'id', 
				key:'id', 
				...this.getColumnSearchProps('id'), 
			},  {
				title:'名字', 
				dataIndex:'name', 
				key:'name', 
				...this.getColumnSearchProps('name'), 
			},  {
				title:'邮箱', 
				dataIndex:'email', 
				key:'email', 
			},  {
				title:'专业年级', 
				dataIndex:'majorClass', 
				key:'majorClass', 
				...this.getColumnSearchProps('majorClass'), 
			},  {
				title:'电话', 
				dataIndex:'phone', 
				key:'phone', 
				...this.getColumnSearchProps('phone'), 
			},  {
				title:'简介', 
				dataIndex:'desc', 
				key:'desc', 
			}, 
		]; 
		return ( < div className = "" >  < Table dataSource =  {dataSource}columns =  {columns}/>  </div > ); 
	}
}

export default menberList; 
