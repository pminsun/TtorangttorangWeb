import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { cls } from '@/utils/config';
import { useRouter } from 'next/router';
import { useLoginModalStore, useSettingStore } from '@/store/store';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { login, setLogin } = useLoginModalStore();
  const { setOriginScript, setNewScript, setSubject, setPresentPurpose, setEndingTxt, repeat, setRepeat } = useSettingStore();

  console.log(session);

  // useEffect(() => {
  //   console.log('Effect triggered');
  //   console.log('pathname:', router.pathname);
  //   console.log('session:', session);
  //   // 경로가 변경될 때 상태 초기화
  //   if (session && (router.pathname === '/' || router.pathname.startsWith('/mypage'))) {
  //     console.log('pathnamecccc:', router.pathname);
  //     setOriginScript('');
  //     setNewScript('');
  //     setSubject('');
  //     setPresentPurpose('회사 컨퍼런스');
  //     setEndingTxt('합니다체');
  //     setRepeat(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router, session]);

  // const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/oauth/callback/kakao&response_type=code`;

  // const loginHandler = () => {
  //   window.location.href = link;
  // };

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
            {session?.user.name ? (
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
          {/* <div className="header_user">
            <button
              type="button"
              onClick={() => setLogin(true)}
            >
              로그인
            </button>
          </div> */}
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
                onClick={() => signIn('kakao')}
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
              {/* <button
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
              </button> */}
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
