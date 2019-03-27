import React, { Component } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router';
import { Avatar, Input, Button, BackTop } from 'antd';
import ReactFullpage from '@fullpage/react-fullpage';
import './index.scss';
import './override.scss';
class TeamInfo extends React.Component {
	render() {
    const { data,i} = this.props;
    console.log(data);
    console.log(i)
		if (!!(i%2 === 0)) { 
			return (
				<div className="section">
					<div className="fullpage-content">
						<div className="tempDiv">
							<div className="img" style={{ backgroundImage: `${data.imgUrl}` }}>
							</div>
						</div>
						<div className="information">
							<h1 className="title">{data&&data.title}</h1>
							<div>
                <p>{(data && data.content) }</p>
                <p>{(data && data.content) }</p>
              </div>
              <Button >{ data&& data.link && data.link.title }</Button>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="section">
					<div className="fullpage-content">
						<div className="information">
							<h1 className="title">Web应用专业团队</h1>
							<div>
                <p>{(data && data.content) }</p>
                <p>{(data && data.content) }</p>
              </div>
              <Button >{ data&& data.link && data.link.title }</Button>
						</div>
						<div className="tempDiv">
							<div className="img" style={{ backgroundImage: `url(http://cdn.niuxingxing.com/2.jpg)` }}>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

const Fullpage = (props) => (
	<ReactFullpage
		navigation
		loopBottom="true"
		loopTop="true"
		controlArrows="true"
		// sectionsColor={[ '#282c34', '#ff5f45', '#0798ec', '#abcdef' ]}
		render={({ state, fullpageApi }) => {
			const teamInfo = props.teamInfo;
			return (
				<div>
					{teamInfo.map((v, i) => {
						return <TeamInfo data={v} i={i} />;
					})}
				</div>
			);
		}}
	/>
);

export default class Home extends Component {
	state = {
		status: false,
		teamInfo: [
			{
				imgUrl:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552618271468&di=9f907d8da9a161a73035c002f80ba32a&imgtype=0&src=http%3A%2F%2Fp4.so.qhmsg.com%2Ft01355bda5988c43034.jpg',
				title: '我们是谁？？？',
        content: '我们是web专业团队，热爱学习，热爱技术，我们喜欢分享。在老师的指导下，写论文做学学研究，勇于探索前沿技术。“不止代码”',
        link:{title:'加入我们',link:'http://www.baidu.com'}
			},
			{
				imgUrl:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552618271468&di=9f907d8da9a161a73035c002f80ba32a&imgtype=0&src=http%3A%2F%2Fp4.so.qhmsg.com%2Ft01355bda5988c43034.jpg',
				title: 'team',
				content: 'web专业应用团队'
			},
			{
				imgUrl:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552618271468&di=9f907d8da9a161a73035c002f80ba32a&imgtype=0&src=http%3A%2F%2Fp4.so.qhmsg.com%2Ft01355bda5988c43034.jpg',
				title: 'team',
				content: 'web专业应用团队'
			},
			{
				imgUrl:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552618271468&di=9f907d8da9a161a73035c002f80ba32a&imgtype=0&src=http%3A%2F%2Fp4.so.qhmsg.com%2Ft01355bda5988c43034.jpg',
				title: 'team',
				content: 'web专业应用团队'
			}
		]
	};

	render() {
		return (
			<div className="container">
				<Fullpage teamInfo={this.state.teamInfo} />
			</div>
		);
	}
=======

import './index.scss';
import img1 from './banner1.jpg';
import img2 from './banner2.jpg';

export default class Home extends Component {
    state = {
        bannerInfo: [
            {
                img: img2,
                description: '这是一段描述',
            },
            {
                img: img1,
                description: '这是一段描述2',
            },
        ],
    };

    render() {
        const { bannerInfo } = this.state;

        return (
            <div className="home-container">
                <div className="slide">
                    {bannerInfo.map(({ img, description }, index) => (
                        <div className="slide-item" key={description}>
                            {index % 2 === 0 && (
                                <div className="slide-item-left">
                                    <img src={img} />
                                </div>
                            )}
                            <div className="slide-item-right">{description}</div>
                            {index % 2 !== 0 && (
                                <div className="slide-item-left">
                                    <img src={img} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
>>>>>>> 2c84fda074a71dc680dddc7915dc336ecf2ec5e7
}
