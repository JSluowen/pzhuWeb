import React, { Component } from 'react';
import { Button, Avatar } from 'antd';
import './index.scss';
class ArticleInfo extends Component {
    constructor(props) {
        super(props)
        this.state={
        }
    }
    componentDidMount(){
    }
    render() {
        return (
            <div className='articleInfo'>
                <div className='articleInfo-header' >
                    <div className='articleInfo-header-info'>
                        <div className='articleInfo-header-info-label'>
                            <Button ghost>前端</Button>
                            <Button ghost>JavaScript</Button>
                        </div>
                        <div className='articleInfo-header-info-title'>
                            见微知著，Google Photos Web UI 完善之旅</div>
                        <div className='articleInfo-header-info-user'>
                            <Avatar style={{ marginRight: '5px' }} size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <p>
                                张三
                            </p>
                            <p>
                                2019-5-4
                            </p>
                        </div>
                    </div>
                    <div className='articleInfo-header-shadow'></div>
                    <div className='articleInfo-header-bgImg' style={{ backgroundImage: 'url("http://cdn.niuxingxing.com/2.jpg")' }}></div>
                </div>
                <div className='articleInfo-body'>
                    <div className='articleInfo-body-content'></div>
                    <div className='articleInfo-body-recommend'>
                        <p>推荐阅读</p>
                        <div className='articleInfo-body-recommend-body'>
                            <div className='articleInfo-body-recommend-body-item'>
                                <a href="#" style={{ backgroundImage: 'url("http://cdn.niuxingxing.com/2.jpg")' }}>
                                    <span>我是标题我是标题我是标题</span>
                                </a>
                            </div>
                            <div className='articleInfo-body-recommend-body-item'>
                                <a href="#" style={{ backgroundImage: 'url("http://cdn.niuxingxing.com/2.jpg")' }}>
                                    <span>我是标题</span>
                                </a></div>
                            <div className='articleInfo-body-recommend-body-item'>
                                <a href="#" style={{ backgroundImage: 'url("http://cdn.niuxingxing.com/2.jpg")' }}>
                                    <span>我是标题</span>
                                </a></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleInfo;