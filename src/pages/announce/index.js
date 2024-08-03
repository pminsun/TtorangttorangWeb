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

export default function Announce() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <ModifyAnnounce />
        <SaveAnnounce />
      </Slider>
    </div>
  );
}
