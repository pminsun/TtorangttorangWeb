import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cls } from '@/utils/config';
import { useRouter } from 'next/router';
import { useLoginModalStore, useSettingStore, useNextMoveBtnStore, useUserStore, useFinalScriptStore } from '@/store/store';
import { authorizationCodeLink } from '@/api/fetchData';
import { headerTxt } from '@/utils/constants';
import Modal from './Modal';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { login, setLogin } = useLoginModalStore();
  const { setNextMoveBtn } = useNextMoveBtnStore();
  const { userEmail } = useUserStore();
  const { clearSettings } = useSettingStore();
  const { clearFinal } = useFinalScriptStore();

  useEffect(() => {
    if (userEmail && pathname !== '/announce') {
      clearSettings();
      clearFinal();
      setNextMoveBtn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, userEmail]);

  const loginHandler = () => {
    router.push(authorizationCodeLink);
  };

  return (
    <>
      <header>
        <div className="header_container">
          <div className="header_menu">
            <h1>
              <Link
                href={'/'}
                className="logo_area"
              >
                <Image
                  src={LocalImages.ImageTtorangWhiteLogo}
                  alt="ImageTtorangWhiteLogo"
                  width={98}
                  height={33}
                />
              </Link>
            </h1>
            <nav>
              <ul>
                <li>
                  <Link
                    href={headerTxt.mainHome.link}
                    className={cls(pathname === headerTxt.mainHome.link ? 'on' : '')}
                  >
                    {headerTxt.mainHome.title}
                  </Link>
                </li>
                <li>
                  <Link
                    href={headerTxt.announce.link}
                    className={cls(pathname === headerTxt.announce.link ? 'on' : '')}
                  >
                    {headerTxt.announce.title}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header_user">
            {userEmail ? (
              <Link href={headerTxt.mypage.link}>{headerTxt.mypage.title}</Link>
            ) : (
              <button
                type="button"
                onClick={() => setLogin(true)}
              >
                {headerTxt.login}
              </button>
            )}
          </div>
        </div>
      </header>
      {/* login Modal */}
      {login && (
        <Modal
          type="login"
          onClose={() => setLogin(false)}
          onLogin={loginHandler}
          movePage={() => {
            router.push('/announce');
          }}
        />
      )}
    </>
  );
}
