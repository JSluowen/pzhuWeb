import React, { Component } from "react";
import { Link } from "react-router";
import { Avatar, Input, BackTop } from "antd";

import "./index.scss";

const Search = Input.Search;
export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        {/* 回到顶部 */}
        <BackTop visibilityHeight={100} />

        <div className="nav-bar">
          <div className="nav-bar-left">
            <a className="app-logo" href="/" target="_self">
              Web应用专业团队
            </a>
            <div className="nav-bar-menu">
              <div className="nav-bar-menu-item">技术交流</div>
              <div className="nav-bar-menu-item">新闻动态</div>
              <div className="nav-bar-menu-item">成员展示</div>
              <div className="nav-bar-menu-item">成果展示</div>
            </div>
          </div>
          <div className="nav-bar-right">
            <Search
              className="nav-bar-right-search"
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
            <Avatar
              className="nav-bar-right-avator"
              size="large"
              style={{ backgroundColor: "#87d068" }}
              icon="user"
            />
          </div>
        </div>
        <div className="content">{this.props.children}</div>
        <div className="pzhu-web-copyright">
          <div className="copyright">
            <div className="about-us">
              <Link to="/">关于我们</Link>
              <Link to="/">联系我们</Link>
              <Link to="/">加入我们</Link>
            </div>
            <div className="link-wrap">
              <a href="">论坛</a>
              <a href="">论坛</a>
              <a href="">论坛</a>
              <a href="">论坛</a>
              <a href="">二手市场</a>
              <a href="">二手市场</a>
              <a href="">二手市场</a>
              <a href="">二手市场</a>
              <a href="">二手市场</a>
              <a href="">二手市场</a>
            </div>
            <p className="web-auth">
              地址：攀枝花市东区机场路10号
            </p>
            <p className="web-auth">
              联系方式：lanquanxiang@gmail.com
            </p>
            <p className="web-auth">
              © 2017-2019 pzhuweb.cn 版权所有 
              <img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" style={{ width: '20px' }} />
              ICP认证：蜀17013737
            </p>
          </div>
        </div>
      </div>
    );
  }
}
