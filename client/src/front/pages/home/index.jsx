import React, { Component } from 'react';

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
}
