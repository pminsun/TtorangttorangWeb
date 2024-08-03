import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';

import Slider from 'react-slick';
import ModifyAnnounce from '@/components/ModifyAnnounce';
import SaveAnnounce from '@/components/SaveAnnounce';
import ProgressBar from '@/components/ProgressBar';
import { useNextMoveBtnStore } from '@/store/store';

export default function Announce() {
  const { nextMoveBtn } = useNextMoveBtnStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  function NextArrow(props) {
    const { nextMoveBtn } = useNextMoveBtnStore();
    const { className, style, onClick } = props;

    const dynamicStyle = {
      ...style,
      display: nextMoveBtn ? 'block' : 'none',
      cursor: 'pointer',
      zIndex: 50,
    };

    return (
      <div
        className={className}
        style={dynamicStyle}
        onClick={onClick}
      >
        <Image
          src={LocalImages.ImageMainStepArrowRight}
          alt="ImageMainStepArrowRight"
          width={80}
          height={80}
        />
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', cursor: 'pointer', zIndex: 50 }}
        onClick={onClick}
      >
        <Image
          src={LocalImages.ImageMainStepArrowLeft}
          alt="ImageMainStepArrowLeft"
          width={80}
          height={80}
        />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: false,
    swipe: false,
    beforeChange: (current, next) => {
      if (!nextMoveBtn) {
        return false; // nextMoveBtn이 false일 경우 슬라이드 변경을 막음
      }
    },
    afterChange: (next) => {
      // 슬라이드가 변경된 후 상태 업데이트
      setCurrentSlide(next);
    },
  };

  return (
    <div className="slider-container">
      <ProgressBar currentSlide={currentSlide} />
      <Slider {...settings}>
        <ModifyAnnounce />
        <SaveAnnounce />
      </Slider>
    </div>
  );
}
