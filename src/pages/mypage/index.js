import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Slider from 'react-slick';
import { signOut, useSession } from 'next-auth/react';

export default function Mypage() {
  const { data: session } = useSession();

  function NextArrow(props) {
    const { className, style, onClick } = props;

    const dynamicStyle = {
      ...style,
      display: 'block',
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
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: false,
    swipe: false,
    appendDots: (dots) => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom',
  };

  return (
    <section className="mypage_container">
      <div className="userInfo_area">
        <p className="mypage_title">내 정보</p>
        <div>
          <div className="user">
            <div className="userIcon"></div>
            <p>dkanrjsk12@naver.com</p>
          </div>
          <button
            type="button"
            onClick={() => signOut('kakao', { callbackUrl: '/', redirect: true })}
          >
            로그아웃
          </button>
        </div>
      </div>
      <div className="myAnnounce_area">
        <p className="mypage_title">나의 발표문</p>
        <div className="myAnnounce_slide">
          <Slider {...settings}>
            <Link
              href={'/mypage/announce/1'}
              className="myAnnounce"
            >
              <div className="announce_title">
                <p>가나다라마가나</p>
                <div className="delteBtn">
                  <Image
                    src={LocalImages.ImageDeleteX}
                    alt="ImageDeleteX"
                    width={14}
                    height={14}
                  />
                </div>
              </div>
              <div className="announce_content">
                <p>디자인 프로세스를 설명해 주세요. 프로젝트의 시작부터 끝까지 어떤 단계들을 거치나요?디자인 프로세스를 설명해 주세요. 텍스트 예시 텍스트 예시텍스트 예시 텍스트 아무...</p>
                <p className="date">2023.8.19</p>
              </div>
            </Link>
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="myAnnounce"
              >
                <div className="announce_title">
                  <p>새 발표문 쓰기</p>
                </div>
                <div className="announce_content">
                  <div className="plusBtn">
                    <Image
                      src={LocalImages.ImageAddPlus}
                      alt="ImageAddPlus"
                      width={64}
                      height={64}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="other_area">
        <p className="mypage_title">기타</p>
        <ul>
          <li>
            <Link href={'/'}>공지사항</Link>
          </li>
          <li>
            <Link href={'/'}>개인정보처리방침</Link>
          </li>
          <li>
            <Link href={'/'}>이용약관</Link>
          </li>
          <li>
            <Link href={'/'}>회원탈퇴</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
