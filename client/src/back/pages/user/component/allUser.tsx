import React, { Component, FC, useState, useEffect, useCallback } from 'react';
import { Progress, Tabs, Avatar, Button, Modal, Pagination, Spin } from 'antd';
import { Base, Post } from 'back/api';
const confirm = Modal.confirm;

export interface IProps {
  allUser: Array<{ [key: string]: any }>;
  pageSize: number;
  total: number;
  id: (val: number) => void;
  activeKey: (val: string) => void;
  getUserInfo: () => void;
}

const allUser: FC<IProps> = props => {
  const { allUser, pageSize, total, id, activeKey, getUserInfo } = props;
  const [defaultCurrent, setDefaultCurrent] = useState<number>(1);

  const updateUserInfo = e => {
    const id = e.currentTarget.getAttribute('data-userid');
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    id(id);
    activeKey('4');
  };

  const deleteUser = e => {
    const userid = e.target.getAttribute('data-userid');
    const that = this;
    confirm({
      title: '删除警告',
      content: '是否确认踢出改成员',
      okType: 'danger',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        Post(Base.deleteUser, { id: userid }).then(res => {
          if (res.success) {
            getUserInfo();
          }
        });
      },
      onCancel() {},
    });
  };

  // 跳转某页
  const onChange = (page, pageSize) => {
    this.setState(
      {
        defaultCurrent: page,
        pageSize,
      },
      () => {
        this.getUserInfo();
      },
    );
  };
  return (
    <div className="back-user-body-userinfo">
      <div className="back-user-body-userinfo-header">
        <div className="back-user-body-userinfo-header-item">学号</div>
        <div className="back-user-body-userinfo-header-item">姓名</div>
        <div className="back-user-body-userinfo-header-item">专业</div>
        <div className="back-user-body-userinfo-header-item">联系方式</div>
        <div className="back-user-body-userinfo-header-item">研究方向</div>
        <div className="back-user-body-userinfo-header-item">加入时间</div>
        <div className="back-user-body-userinfo-header-item">操作</div>
      </div>
      <div className="back-user-body-userinfo-body">
        {allUser.length !== 0 ? (
          <div>
            {allUser.map((item, index) => {
              return (
                <div key={item.id} className="back-user-body-userinfo-body-list">
                  <div className="back-user-body-userinfo-body-list-item">{item.id}</div>
                  <div className="back-user-body-userinfo-body-list-item">
                    <Avatar src={item.avatar} size="small" icon="user" />
                    {item.User.name}
                  </div>
                  <div className="back-user-body-userinfo-body-list-item">{item.Major.name}</div>
                  <div className="back-user-body-userinfo-body-list-item">{item.phone}</div>
                  <div className="back-user-body-userinfo-body-list-item">{item.Domain.name}</div>
                  <div className="back-user-body-userinfo-body-list-item">{item.created_at}</div>
                  <div className="back-user-body-userinfo-body-list-item">
                    <Button data-index={index} data-userid={item.id} onClick={updateUserInfo} ghost type="primary">
                      修改
                    </Button>
                    <Button data-index={index} data-userid={item.id} onClick={deleteUser} type="danger">
                      删除
                    </Button>
                  </div>
                </div>
              );
            })}
            <div className="back-user-body-userinfo-pagination">
              <Pagination
                pageSize={pageSize}
                showQuickJumper
                onChange={onChange}
                defaultCurrent={defaultCurrent} // 默认当前页数
                total={this.state.total}
              />
            </div>
          </div>
        ) : (
          <div className="back-user-body-userinfo-body-nullData">暂无数据</div>
        )}
      </div>
    </div>
  );
};

export default allUser;
