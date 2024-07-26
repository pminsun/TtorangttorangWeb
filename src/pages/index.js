import { useEffect, useState, useRef } from 'react';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <main className="gateway_container">
      <section className="topIntro_area">
        <Image
          src={LocalImages.ImageGatewayBenner}
          alt="ImageGatewayBenner"
          width={1920}
          height={740}
        />
        <div className="moveToAnnounce_btnArea">
          <Link
            href={'/announce'}
            className="moveToAnnounce_btn"
          >
            완벽한 발표 준비 시작하기
          </Link>
        </div>
      </section>
      <section className="bottomDetail_container">
        <div className="bg_custom">
          <div className="bg_octagon">
            <Image
              src={LocalImages.ImageGatewayOctagon}
              alt="ImageGatewayOctagon"
              width={521}
              height={521}
            />
          </div>
          <div className="bg_round">
            <Image
              src={LocalImages.ImageGatewayRound}
              alt="ImageGatewayRound"
              width={578}
              height={578}
            />
          </div>
          <div className="bg_flower">
            <Image
              src={LocalImages.ImageGatewayFlower}
              alt="ImageGatewayFlower"
              width={273}
              height={578}
            />
          </div>
          <div className="bg_hexagon">
            <Image
              src={LocalImages.ImageGatewayHexagon}
              alt="ImageGatewayHexagon"
              width={352}
              height={455}
            />
          </div>
        </div>
        <div className="bottomDetail_area">
          <div className="character_area">
            <div>
              <Image
                src={LocalImages.ImageTtorangNote}
                alt="ImageTtorangNote"
                width={254}
                height={254}
              />
            </div>
            <p>완벽한 발표 준비 방법을 알아볼까요?</p>
          </div>
          <div className="detailInfo_area">
            <Image
              src={LocalImages.ImageGatewayDetailInfo}
              alt="ImageGatewayDetailInfo"
              width={1543}
              height={1543}
              className="mx-auto"
            />
          </div>
        </div>
      </section>
      <div
        onClick={moveToTop}
        className="moveToTop_area"
      >
        TOP
      </div>
    </main>
  );
}
