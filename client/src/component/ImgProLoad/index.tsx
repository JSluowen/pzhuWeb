import React, { useState, useEffect, FC } from 'react';
import './index.scss';

export interface Iprops {
  small: string;
  large: string;
}

const ImageProLoad: FC<Iprops> = ({ children, small, large }) => {
  // 图片渐进式加载
  useEffect(() => {
    const large = document.querySelector('.ImageProLoad');
    const small = document.querySelector('.img-small');
    const img = new Image();
    img.src = small.src;
    img.onload = function() {
      small.classList.add('loaded');
    };

    const largeImg = new Image();
    largeImg.src = large.dataset.src;
    largeImg.onload = function() {
      largeImg.classList.add('loaded');
    };
    large.appendChild(largeImg);
  }, []);

  return (
    <div className="ImageProLoad" data-src={large}>
      <img src={small} alt="加载图片中" className="img-small" />
      <div className="ImageProLoad-container">{children}</div>
    </div>
  );
};

export default ImageProLoad;
