import GuideMent from '@/components/GuideMent';
import SkeletonLoading from '@/components/SkeletonLoading';
import { cls, formatNumber, measureTextWidth, temData, dataT } from '@/utils/config';
import { diffWords } from 'diff';
import { useEffect, useState, useRef } from 'react';
import HighlightWithinTextarea from 'react-highlight-within-textarea';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { fetchAnnounceData } from '@/api/fetchData';

import Slider from 'react-slick';
import ModifyAnnounce from '@/components/ModifyAnnounce';
import SaveAnnounce from '@/components/SaveAnnounce';
import ProgressBar from '@/components/ProgressBar';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', cursor: 'pointer', zIndex: 50 }}
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
};

export default function Announce() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="slider-container">
      <ProgressBar currentSlide={currentSlide} />
      <Slider
        {...settings}
        beforeChange={(currentSlide, nextSlide) => setCurrentSlide(nextSlide)}
      >
        <ModifyAnnounce />
        <SaveAnnounce />
      </Slider>
    </div>
  );
}
