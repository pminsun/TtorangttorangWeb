import { useState } from 'react';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';

import Slider from 'react-slick';
import ModifyAnnounce from '@/components/ModifyAnnounce';
import SaveAnnounce from '@/components/SaveAnnounce';
import ProgressBar from '@/components/ProgressBar';
import { useNextMoveBtnStore, useScriptLoadingStore, useQaLoadingStore, useUserStore } from '@/store/store';
import ShapeBg from '@/components/ShapeBg';

export default function Announce() {
  const { userEmail, accessToken, userAccessToken } = useUserStore();
  const { nextMoveBtn } = useNextMoveBtnStore();
  const { qaLoading } = useQaLoadingStore();
  const { scriptLoading } = useScriptLoadingStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  function NextArrow(props) {
    const { className, style, onClick } = props;

    const dynamicStyle = {
      ...style,
      display: 'block',
      cursor: nextMoveBtn ? 'pointer' : 'default',
      zIndex: 50,
      pointerEvents: nextMoveBtn ? 'auto' : 'none',
    };

    return (
      <div
        className={className}
        style={dynamicStyle}
        onClick={onClick}
      >
        {nextMoveBtn ? (
          <Image
            src={LocalImages.ImageMainStepArrowActive}
            alt="ImageMainStepArrowActive"
            width={80}
            height={80}
          />
        ) : (
          <Image
            src={LocalImages.ImageMainStepArrowRight}
            alt="ImageMainStepArrowRight"
            width={80}
            height={80}
          />
        )}
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
          src={LocalImages.ImageMainStepArrowActive}
          alt="ImageMainStepArrowActive"
          width={80}
          height={80}
          className="-scale-x-100"
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
      setCurrentSlide(next);
    },
  };

  return (
    <>
      <div className="slider-container">
        <ShapeBg />
        <ProgressBar currentSlide={currentSlide} />
        <Slider {...settings}>
          <ModifyAnnounce userEmail={userEmail} />
          <SaveAnnounce
            userEmail={userEmail}
            userAccessToken={userAccessToken}
          />
        </Slider>
      </div>
      {/* loading */}
      {scriptLoading && (
        <>
          <div className="modalBlackBg"></div>
          <div className="modal_box">
            <div className="character_box"></div>
            <p>초안 정보를 불러오고 있어요</p>
            <span className="loader"></span>
          </div>
        </>
      )}
      {qaLoading && (
        <>
          <div className="modalBlackBg"></div>
          <div className="modal_box">
            <div className="character_box"></div>
            <p>예상 질문을 받아오고 있어요</p>
            <span className="loader"></span>
          </div>
        </>
      )}
    </>
  );
}
