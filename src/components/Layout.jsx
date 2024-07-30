import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { isMobile } from 'react-device-detect';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';

export default function Layout({ children }) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile);
  }, []);

  return (
    <>
      {/* {isMobileDevice ? (
        <div className="moblie_container">
          <div className="logo_area">
            <Image
              src={LocalImages.ImageMobileLogo}
              alt="ImageMobileLogo"
              width={196}
              height={72}
            />
          </div>
          <div className="character_area">
            <Image
              src={LocalImages.ImageTtorangArch}
              alt="ImageTtorangArch"
              width={208}
              height={204}
            />
          </div>
          <div className="guide_area">
            <p>잠시만요!</p>
            <p>
              모바일 버전을 열심히 개발 중이에요
              <br /> PC를 통해 접속해 주세요
            </p>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <section className="root_layout">{children}</section>
          <Footer />
        </>
      )} */}
      <Header />
      <section className="root_layout">{children}</section>
      <Footer />
    </>
  );
}
