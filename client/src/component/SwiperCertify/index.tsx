import React, { useState, useEffect, FC } from 'react';
import Swiper from 'swiper/js/swiper.js';
import 'swiper/css/swiper.min.css';
import './index.scss';

export interface IProps {
  props: Array<any>;
}

const SwiperCertity: FC<IProps> = ({ props }) => {
  const beginShow = () => {
    const swiper = new Swiper('#certify .swiper-container', {
      watchSlidesProgress: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      loopedSlides: 4,
      autoplay: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
      on: {
        progress(progress) {
          for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides.eq(i);
            const slideProgress = this.slides[i].progress;
            let modify = 1;
            if (Math.abs(slideProgress) > 1) {
              modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
            }
            const translate = slideProgress * modify * 260 + 'px';
            const scale = 1 - Math.abs(slideProgress) / 5;
            const zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
            slide.transform('translateX(' + translate + ') scale(' + scale + ')');
            slide.css('zIndex', zIndex);
            slide.css('opacity', 1);
            if (Math.abs(slideProgress) > 3) {
              slide.css('opacity', 0);
            }
          }
        },
        setTransition(transition) {
          for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides.eq(i);
            slide.transition(transition);
          }
        },
      },
    });
    window.onresize = function() {
      swiper.update();
    };
  };
  useEffect(() => {
    beginShow();
  }, [props]);

  return (
    <div id="certify">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {props && props.length !== 0
            ? props.map(item => (
                <div className="swiper-slide" key={item.id}>
                  <div className="img">
                    <img src={item.posterlink} />
                  </div>
                  <a href={item.achievementlink || item.attachment}>
                    <span>{item.title}</span>
                    <span>{item.UserInfo.User.name}</span>
                  </a>
                </div>
              ))
            : ''}
        </div>
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};

export default SwiperCertity;
