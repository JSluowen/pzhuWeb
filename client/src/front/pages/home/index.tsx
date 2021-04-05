import React, { useState, useEffect, FC } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import SwiperCertify from 'src/component/SwiperCertify';
import { Base, Get } from 'front/api';
import Navbar from 'front/pages/navbar';
import { ImgProLoad } from 'src/component';
import './index.scss';
import { RouteComponentProps } from 'react-router-dom';

interface BaseInfo {
  id: number;
  title: string;
  desc: string;
  order: number;
  cover: string;
}

const Home: FC<RouteComponentProps> = props => {
  // 获取初始数据
  const [states, setStates] = useState<Array<{}>>([]);
  const [baseInfo, setBaseInfo] = useState<Array<BaseInfo>>([]);
  useEffect(() => {
    Get(Base.getHomeInfo).then(res => {
      if (res.success) {
        console.log(res.data);
        setStates(res.data?.ac);
        setBaseInfo(res.data?.baseInfo.sort((a, b) => a.order - b.order));
      }
    });
  }, []);
  const imgs = {
    small: 'http://img.pzhuweb.cn/101.png',
    large: 'http://img.pzhuweb.cn/10.png',
  };

  return (
    <div className="home">
      <ReactFullpage
        navigation
        loopBottom="true"
        loopTop="true"
        controlArrows="true"
        sectionsColor={['#282c34']}
        render={({ state, fullpageApi }) => {
          return (
            <div>
              <div className="section">
                <div className="home-fullpageFive" style={{ backgroundColor: '#f6f6f6' }}>
                  <ImgProLoad {...imgs}>
                    <div className="home-fullpageFive-container">
                      <Navbar {...props} />
                      <div className="home-fullpageFive-container-top">
                        <div className="home-fullpageFive-container-top-title">{baseInfo[0]?.title}</div>
                        <div className="home-fullpageFive-container-top-tips">{baseInfo[0]?.desc}</div>
                        <a href="http://www.pzhuweb.cn/articleInfo/109">团队介绍</a>
                      </div>
                      <div className="home-fullpageFive-container-footer">
                        <p className="web-auth">
                          © 2017-2019 pzhuweb.cn 版权所有
                          <img
                            className="safe-icon"
                            src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
                          />
                          ICP认证：
                          <a style={{ color: 'white' }} href="http://www.beian.miit.gov.cn" target="_blank">
                            蜀17013737
                          </a>
                        </p>
                      </div>
                    </div>
                  </ImgProLoad>
                </div>
              </div>
              <div className="section">
                <div className="home-fullpageTwo">
                  <div className="home-fullpageTwo-right">
                    <div className="home-fullpageTwo-right-container">
                      <p className="home-fullpageTwo-right-container-title">{baseInfo[1]?.title}</p>
                      <p className="home-fullpageTwo-right-container-context">{baseInfo[1]?.desc}</p>
                    </div>
                  </div>
                  <div className="home-fullpageTwo-left">
                    <div
                      className="home-fullpageTwo-left-bgImg"
                      style={{
                        backgroundImage: `url(${baseInfo[1]?.cover})`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="home-fullpageThree">
                  <div className="home-fullpageThree-header">
                    <span>研究方向</span>
                    <span>Research Interests</span>
                  </div>
                  <div className="home-fullpageThree-body">
                    <div className="home-fullpageThree-body-front">
                      <div className="home-fullpageThree-body-front-img">
                        <img src={baseInfo[2]?.cover} alt={baseInfo[2]?.title} />
                      </div>
                      <div className="home-fullpageThree-body-front-context">
                        <div className="home-fullpageThree-body-front-context-title">{baseInfo[2]?.title}</div>
                        <div className="home-fullpageThree-body-front-context-desc">{baseInfo[2]?.desc}</div>
                      </div>
                    </div>
                    <div className="home-fullpageThree-body-back">
                      <div className="home-fullpageThree-body-back-img">
                        <img src={baseInfo[3]?.cover} alt={baseInfo[3]?.title} />
                      </div>
                      <div className="home-fullpageThree-body-back-context">
                        <div className="home-fullpageThree-body-back-context-title">{baseInfo[3]?.title}</div>
                        <div className="home-fullpageThree-body-back-context-desc">{baseInfo[3]?.desc}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="home-fullpageFour">
                  <div className="home-fullpageFour-header">
                    <span>团队荣誉</span>
                    <span>Team Honour</span>
                  </div>
                  <div className="home-fullpageFour-body">
                    <SwiperCertify props={states} />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Home;
