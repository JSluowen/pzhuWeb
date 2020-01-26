import React, { useState, useEffect, FC } from 'react';
import './index.scss';

const Footer: FC = () => {
  return (
    <div className="Footer">
      <div className="pzhu-web-copyright">
        <div className="copyright">
          {/* <div className="link-wrap">
            <a href="http://old.pzhuweb.cn">WEB应用专业团队官网V1.0</a>
            <a href="http://218.6.132.18/meol/jpk/course/layout/lesson/index.jsp?courseId=42728">前端在线学习</a>
            <a href="http://218.6.132.18/meol/jpk/course/layout/lesson/index.jsp?courseId=42657">后台在线学习</a>
          </div> */}
          {/* <p className="web-auth">地址：攀枝花市东区机场路10号</p>
          <p className="web-auth">联系方式：lanquanxiang@gmail.com</p> */}
          <p className="web-auth">
            © 2017-2019 pzhuweb.cn 版权所有
            <img
              src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
              style={{
                width: '20px',
              }}
            />
            ICP认证：蜀17013737
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
