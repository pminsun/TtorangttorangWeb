import { useEffect, useRef, useState } from 'react';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';
import Link from 'next/link';
import { useLoginModalStore, useUserStore } from '@/store/store';
import ShapeBg from '@/components/ShapeBg';

export default function Home() {
  const { userEmail } = useUserStore();
  const { setLogin } = useLoginModalStore();
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useEffect(() => {
    const scrollToPage = (page) => {
      const outerDiv = outerDivRef.current;
      if (!outerDiv) return;

      const pageHeight = outerDiv.clientHeight;

      outerDiv.scrollTo({
        top: (page - 1) * pageHeight,
        left: 0,
        behavior: 'smooth',
      });
    };

    scrollToPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      if (isScrolling) return; // 이미 스크롤 중이면 무시

      const { deltaY } = e;
      const outerDiv = outerDivRef.current;

      if (!outerDiv) return;

      const { scrollTop, clientHeight, scrollHeight } = outerDiv;
      const pageHeight = clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      let nextPage = currentPage;

      if (deltaY > 0) {
        // 스크롤 내릴 때
        nextPage = currentPage + 1;
      } else {
        // 스크롤 올릴 때
        nextPage = currentPage - 1;
      }

      // 페이지 범위 내로 조정
      if (nextPage < 1) nextPage = 1;
      if (nextPage > 4) nextPage = 4;

      if (nextPage !== currentPage) {
        // 스크롤이 이미 진행 중이면 다음 스크롤을 무시
        setIsScrolling(true);

        // 이전 스크롤 타임아웃을 클리어
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        // 스크롤 애니메이션 시작
        outerDiv.scrollTo({
          top: (nextPage - 1) * pageHeight,
          left: 0,
          behavior: 'smooth',
        });

        // 스크롤이 완료될 때까지 기다린 후 상태 업데이트
        const timeout = setTimeout(() => {
          setCurrentPage(nextPage);
          setIsScrolling(false);
        }, 600); // 스크롤 속도에 따라 조정

        setScrollTimeout(timeout);
      }
    };

    const outerDivCurrent = outerDivRef.current;

    if (outerDivCurrent) {
      outerDivCurrent.addEventListener('wheel', wheelHandler);
    }

    return () => {
      if (outerDivCurrent) {
        outerDivCurrent.removeEventListener('wheel', wheelHandler);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [currentPage, isScrolling, scrollTimeout]);

  return (
    <main
      ref={outerDivRef}
      className="gateway_container outer"
    >
      <div className="gateway_shapeBg">
        <ShapeBg />
      </div>
      <div className="inner">
        <div className="gate_main">
          <div>
            <div className="gatewayMent_area">
              <p>아무리 해도 어려운 발표!</p>
              <h2>
                AI 발표 도우미
                <br />
                또랑또랑과 함께 준비해요
              </h2>
              <p>
                단 10초, 발표에 대한 정보를 입력하면
                <br /> 단 한 번의 클릭으로 쉽고 빠르게 준비할 수 있어요
              </p>
              {userEmail ? (
                <Link
                  href={'/announce'}
                  className="start_btn"
                >
                  시작하기
                </Link>
              ) : (
                <div
                  onClick={() => setLogin(true)}
                  className="start_btn"
                >
                  시작하기
                </div>
              )}
            </div>
            <div className="moveToGuide_area">
              <div
                onClick={() => setCurrentPage(2)}
                className="guideArrow"
              >
                <div className="activeArrow_area">
                  <Image
                    src={LocalImages.ImageActiveArrow}
                    alt="ImageActiveArrow"
                    width={39}
                    height={35}
                  />
                </div>
              </div>
              <p>아래에 가이드가 있어요</p>
            </div>
          </div>
          <div className="gate_mainImg">
            <Image
              src={LocalImages.ImageGatwayMain}
              alt="ImageGatwayMain"
              width={609}
              height={714}
            />
          </div>
        </div>
      </div>
      <div className="inner">
        <div>
          <Image
            src={LocalImages.ImageGateway_one}
            alt="ImageGateway_one"
            width={1279}
            height={625}
          />
        </div>
      </div>
      <div className="inner">
        <div>
          <Image
            src={LocalImages.ImageGateway_two}
            alt="ImageGateway_two"
            width={1323}
            height={567}
          />
        </div>
      </div>
      <div className="inner">
        <div>
          <Image
            src={LocalImages.ImageGateway_three}
            alt="ImageGateway_three"
            width={1277}
            height={362}
          />
        </div>
      </div>
      <div
        onClick={() => setCurrentPage(1)}
        className="moveToTop_area"
      >
        TOP
      </div>
    </main>
  );
}
