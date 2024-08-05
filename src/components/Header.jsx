import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cls } from '@/utils/config';
import { useRouter } from 'next/router';
import { useLoginModalStore, useSettingStore, useUserStore } from '@/store/store';
import { authorizationCodeLink } from '@/api/fetchData';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { login, setLogin } = useLoginModalStore();
  const { userEmail } = useUserStore();
  const { setOriginScript, setNewScript, setSubject, setPresentPurpose, setEndingTxt, repeat, setRepeat } = useSettingStore();

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
                  src={LocalImages.ImageVarLogo}
                  alt="ImageVarLogo"
                  width={118}
                  height={53}
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
        <div className="modalBlackBg">
          <div className="modal_box login_box">
            <div className="character_box"></div>
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
        </div>
      )}
    </>
  );
}
