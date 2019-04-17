import React, { Component } from 'react'
import { Menu, Dropdown, Icon, message, Input } from 'antd';

const Search = Input.Search;

import './index.scss'
class Collect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: true
        };
    }

    handelMenuItem = (value) => {
        console.log(value)
    }

    render() {
        const menu = (
            <Menu onClick={this.handelMenuItem}>
                <Menu.Item key="1">前端</Menu.Item>
                <Menu.Item key="2">2nd memu item</Menu.Item>
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );



        return (
            <div className='collect'>
                <div className="collect-container">
                    <div className='collect-container-header'>
                        <div className='collect-container-header-left'>
                            <Dropdown overlay={menu}>
                                <span className="ant-dropdown-link">
                                    所有收藏 <Icon type="down" />
                                </span>
                            </Dropdown>
                        </div>
                        <div className='collect-container-header-right'>
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>
                    <div className='collect-container-body'>
                        <div className='collect-container-body-top'>
                            <p style={{ width: '40%' }}>名称</p>
                            <p style={{ width: '25%' }}>归属</p>
                            <p style={{ width: '35%' }}>收藏时间</p>
                        </div>
                        {
                            this.state.status
                                ?


                                <div>
                                    <div className='collect-container-body-item'>
                                        <p style={{ width: '40%' }}>
                                            <span>作品名称</span>
                                        </p>
                                        <p style={{ width: '25%' }}>
                                            <span>我是作者</span>
                                        </p>
                                        <p style={{ width: '20%' }}>
                                            时间
                        </p>
                                        <p style={{ flex: 1 }}>
                                            <span style={{ color: '#1890ff' }}>取消收藏</span>
                                        </p>
                                    </div>
                                    <div className='collect-container-body-item'>
                                        <p style={{ width: '40%' }}>
                                            <span>作品名称</span>
                                        </p>
                                        <p style={{ width: '25%' }}>
                                            <span>我是作者</span>
                                        </p>
                                        <p style={{ width: '20%' }}>
                                            时间
                        </p>
                                        <p style={{ flex: 1 }}>
                                            <span style={{ color: '#1890ff' }}>取消收藏</span>
                                        </p>
                                    </div>
                                    <div className='collect-container-body-item'>
                                        <p style={{ width: '40%' }}>
                                            <span>作品名称</span>
                                        </p>
                                        <p style={{ width: '25%' }}>
                                            <span>我是作者</span>
                                        </p>
                                        <p style={{ width: '20%' }}>
                                            时间
                        </p>
                                        <p style={{ flex: 1 }}>
                                            <span style={{ color: '#1890ff' }}>取消收藏</span>
                                        </p>
                                    </div>
                                </div> :
                                <div className='collect-container-body-null'>
                                    暂无数据
                         </div>
                        }
                    </div>
                    <div className="collect-container-footer">

                    </div>
                </div>
            </div>
        );
    }
}

export default Collect;