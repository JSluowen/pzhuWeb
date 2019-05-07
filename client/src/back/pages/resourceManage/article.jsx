import React, { Component } from "react";
import { Table, Button,Menu,Dropdown,Icon,Input,Collapse } from 'antd';
import './index.scss'

// api 接口请求封装模块
import Resource from '../../api/resource';

const Search = Input.Search;
const columns = [{
    title: '文章标题',
    dataIndex: 'title',
    sorter: (a, b) =>{ return (a.name > b.name)},
  }, {
    title: '状态',
    dataIndex: 'status',
  },{
    title: '创建者',
    dataIndex: 'author',
  } ,{
    title: '更新时间',
    dataIndex: 'publish_time',
  },{
      title:'操作',
      render:(text,record,index)=>{
        
        return (
        <div className = 'action'>
          <svg viewBox="64 64 896 896"  data-icon="ellipsis" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M176 511a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm280 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm280 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path></svg>
          <div className = 'panel'>
            <span key="edit" onClick = {()=>{
              console.log(record)
              //将隐藏的文章id 获取到，作为参数通过接口传递到后端,后端通过 status:0 来实现软删除 
              let id = record.id;
               id = 1; //测试
              let deleteArticle = Resource.deleteArticle({id:id});
              }}><Icon type="edit" /><button>查看详情</button></span>
            <span key="delete" onClick = {()=>{console.log(record)}}><Icon type="delete" /><button>删除</button></span>
            <span key="top"><Icon type="to-top" /><button>置顶</button></span>
            <span key="download"><Icon type="download" /><button>下载导出</button></span>
          </div>
        </div>
        )}
  }
];
 
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    status:1,
    key: i,
    id:'1110'+i,
    author:'张三',
    title: ` java 从入门到精通 ${i}`,
    publish_time: '2019-4-5',
  });
}

class article extends Component {
    state = { 
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        articleList:[]
     }
    componentDidMount(){
      // 数据结构 
      // const dataForm = {
      //   title:'文章标题',
      //   technology:'技术分类',
      //   author:'作者名字',
      //   publish_time:'发布时间',
      //   status:'文章当前的状态'
      // }
      const artclePromise = Resource.articleList({});
      artclePromise.then((data)=>{console.log(data.data)})
      this.getArticleList();
    }
    getArticleList(){
      const artclePromise = Resource.articleList({});
      const articleList = [];
      artclePromise.then((data)=>{
        let result = data.data;
        for(let  i =0; result.length;i++){
          let author = result[i].UserInfo.user.name;
          let {title,publish_time,read_number,top,status}=result[i];
          let technology = result[i].Technology.name;
          articleList.push({author,title,publish_time,read_number,technology,top,status})
        }
      })
      console.log(articleList);
      this.setState({articleList})
    }

     

     onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      }
    
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                {/* 文章展示以及操作功能区 */}
                <div>
                    <div className = 'article_list'>
                    <Search
                        placeholder="输入标题经行搜索"
                        enterButton="搜索"
                        size="large"
                        onSearch={value => console.log(value)}
                    />
                        <div style={{ marginBottom: 16 }}>
                        <Button
                            type="primary"
                            onClick={this.start}
                            disabled={!hasSelected}
                            loading={loading}
                        >
                            所有文档
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `选中 ${selectedRowKeys.length} 项` : ''}
                            {hasSelected? (<span><Button type='danger'>删除</Button><Button type="default">导出</Button></span>):null}
                        </span>
                        </div>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        );
    }
}

export default article;
