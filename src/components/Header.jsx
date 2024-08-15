import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cls } from '@/utils/config';
import { useRouter } from 'next/router';
import { useLoginModalStore, useSettingStore, useNextMoveBtnStore, useUserStore, useFinalScriptStore } from '@/store/store';
import { authorizationCodeLink } from '@/api/fetchData';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { login, setLogin } = useLoginModalStore();
  const { setNextMoveBtn } = useNextMoveBtnStore();
  const { userEmail } = useUserStore();
  const { setOriginScript, setNewScript, setSubject, setPresentPurpose, setEndingTxt, setRepeat } = useSettingStore();
  const { setFinalScript, setQaArray } = useFinalScriptStore();

  useEffect(() => {
    if (userEmail && pathname !== '/announce') {
      setOriginScript('');
      setNewScript('');
      setSubject('');
      setPresentPurpose('회사 컨퍼런스');
      setEndingTxt('합니다체');
      setRepeat(false);
      setFinalScript('');
      setQaArray([]);
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
                    href={'/'}
                    className={cls(pathname === '/' ? 'on' : '')}
                  >
                    메인 홈
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/announce'}
                    className={cls(pathname === '/announce' ? 'on' : '')}
                  >
                    교정하기
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header_user">
            {userEmail ? (
              <Link href={'/mypage'}>마이페이지</Link>
            ) : (
              <button
                type="button"
                onClick={() => setLogin(true)}
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </header>
      {/* login Modal */}
      {login && (
        <>
          <div
            className="modalBlackBg"
            onClick={() => setLogin(false)}
          ></div>
          <div className="modal_box login_box">
            <div
              className="modal_close"
              onClick={() => setLogin(false)}
            >
              <Image
                src={LocalImages.ImageModalClose}
                alt="ImageModalClose"
                width={24}
                height={24}
              />
            </div>
            <div className="character_box">
              <Image
                src={LocalImages.ImageTtorangHi}
                alt="ImageTtorangHi"
                width={120}
                height={120}
              />
            </div>
            <div className="login_ment">
              <p>로그인을 진행해주세요</p>
            </div>
            <div className="modalBtn_area">
              <button
                type="button"
                className="kakoLogin"
                onClick={loginHandler}
              >
                <div className="kakoLogo">
                  <Image
                    src={LocalImages.ImageKakoLogo}
                    alt="ImageKakoLogo"
                    width={21}
                    height={21}
                  />
                </div>
                <span>카카오로 시작하기</span>
              </button>
              <button
                type="button"
                className="noneLogin"
                onClick={() => {
                  setLogin(false);
                  router.push('/announce');
                }}
              >
                로그인 없이 체험할게요
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
