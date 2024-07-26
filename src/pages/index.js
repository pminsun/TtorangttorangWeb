import { useEffect, useState } from 'react';
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
          src={LocalImages.ImageGatewayIntro}
          alt="ImageGatewayIntro"
          width={1920}
          height={740}
        />

        <div className="topIntroTxt_area">
          <p className="intro_small">아무리 해도 익숙해지지 않는 발표!</p>
          <div className="introBig_area">
            <div>
              <h3>
                AI 발표 도우미 <span>또랑또랑과 함께</span>
              </h3>
              <h3>쉽고 빠르게 발표를 준비해요</h3>
              <div className="star">
                <Image
                  src={LocalImages.ImageGatewayIntroStar}
                  alt="ImageGatewayIntroStar"
                  width={48}
                  height={44}
                />
              </div>
              <div className="text_round">
                <Image
                  src={LocalImages.ImageGatewayIntroRound}
                  alt="ImageGatewayIntroRound"
                  width={490}
                  height={180}
                />
              </div>
            </div>
          </div>
          <div className="moveToAnnounce_btnArea">
            <Link
              href={'/announce'}
              className="moveToAnnounce_btn"
            >
              완벽한 발표 준비 시작하기
            </Link>
          </div>
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
