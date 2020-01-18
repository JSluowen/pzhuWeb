import React, { Component } from 'react';
import Swiper from 'swiper/js/swiper.js';
import 'swiper/css/swiper.min.css';

class PageFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      desc: props.desc,
      content: [],
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.content.length !== 0) {
      return {
        content: props.content,
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.content.length !== 0) {
      this.beginShow();
    }
  }
  beginShow() {
    const swiper = new Swiper('#certify .swiper-container', {
      watchSlidesProgress: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      loopedSlides: 5,
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
  }
  render() {
    const { title, desc, content } = this.props;
    return (
      <div className="home-fullpageFour">
        <div className="home-fullpageFour-header">
          <span>{title}</span>
          <span>{desc}</span>
        </div>
        <div className="home-fullpageFour-body">
          <div id="certify">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {content && content.length !== 0
                  ? content.map(item => (
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
        </div>
      </div>
    );
  }
}

export default PageFour;
