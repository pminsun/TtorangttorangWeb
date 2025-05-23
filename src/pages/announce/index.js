import { useEffect, useRef } from 'react';
import * as LocalImages from '@/utils/imageImports';
import * as stores from '@/store/store';
import Image from 'next/image';
import Slider from 'react-slick';
import ModifyAnnounce from '@/components/announce/Desktop/ModifyAnnounce';
import SaveAnnounce from '@/components/announce/Desktop/SaveAnnounce';
import ProgressBar from '@/components/announce/Shared/ProgressBar';
import Modal from '@/components/layout/Modal';
import MobileSetting from '@/components/announce/Mobile/MobileSetting';
import MobileWrite from '@/components/announce/Mobile/MobileWrite';
import MobileFinalAnnounce from '@/components/announce/Mobile/MobileFinalAnnounce';
import QnABox from '@/components/announce/ExpectedQnA/QnABox';

export default function Announce() {
  const { isMobileDevice } = stores.useIsMobileStore();
  const { nextMoveBtn } = stores.useNextMoveBtnStore();
  const { qaLoading } = stores.useQaLoadingStore();
  const { scriptLoading } = stores.useScriptLoadingStore();
  const { setCurrentSlide } = stores.useCurrentSlideStore();
  const { setCurrentMobileSlide } = stores.useCurrentSlideMobileStore();
  const { improvementMent, improveModal, setImproveModal } = stores.useImprovementStore();

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

  const sliderMobileRef = useRef(null);
  const settingsMobile = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipe: false,
    beforeChange: (current, next) => {
      setCurrentMobileSlide(next);
    },
  };

  // 진입시 첫번째 슬라이드 시작
  useEffect(() => {
    setCurrentMobileSlide(0);
  }, []);

  return (
    <>
      {isMobileDevice ? (
        <>
          <div className="slider-container announce_mobile">
            <ProgressBar />
            <form>
              <Slider
                ref={sliderMobileRef}
                {...settingsMobile}
              >
                <div className="step_area">
                  <MobileSetting sliderMobileRef={sliderMobileRef} />
                </div>
                <div className="step_area">
                  <MobileWrite sliderMobileRef={sliderMobileRef} />
                </div>
                <div className="step_area">
                  <MobileFinalAnnounce sliderMobileRef={sliderMobileRef} />
                </div>
                <div className="step_area">
                  <QnABox sliderMobileRef={sliderMobileRef} />
                </div>
              </Slider>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="slider-container">
            <ProgressBar />
            <Slider {...settings}>
              <ModifyAnnounce />
              <SaveAnnounce />
            </Slider>
          </div>
        </>
      )}
      {/* 개선 내용 모달 (공통) */}
      {improveModal && improvementMent.length > 0 && (
        <Modal
          type="improvementMent"
          improvementMent={improvementMent}
          onClose={() => setImproveModal(false)}
        />
      )}
      {/* loading */}
      {scriptLoading && <Modal type="announceLoading" />}
      {qaLoading && <Modal type="qaLoading" />}
    </>
  );
}
