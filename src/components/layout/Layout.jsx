import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import ShapeBg from './ShapeBg';
import Header from './Header';
import Footer from './Footer';
import MoblieNoneService from './MoblieNoneService';

export default function Layout({ children }) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile);
  }, []);

  return (
    <>
      {isMobileDevice ? (
        <MoblieNoneService />
      ) : (
        <>
          <Header />
          <section className="root_layout">
            <div className="shapeBg_container">
              <ShapeBg />
            </div>
            {children}
          </section>
          <Footer />
        </>
      )}
    </>
  );
}
