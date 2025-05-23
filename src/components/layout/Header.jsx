import { useEffect } from 'react';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cls } from '@/utils/config';
import { useRouter } from 'next/router';
import * as stores from '@/store/store';
import { authorizationCodeLink } from '@/api/fetchData';
import { HEADER_TXT } from '@/utils/constants';
import { deleteAllScript } from '@/store/store';
import Modal from './Modal';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { login, setLogin } = stores.useLoginModalStore();
  const { setNextMoveBtn } = stores.useNextMoveBtnStore();
  const { userEmail } = stores.useUserStore();
  const { clearSettings } = stores.useSettingStore();
  const { clearFinal } = stores.useFinalScriptStore();

  useEffect(() => {
    if (userEmail && pathname !== HEADER_TXT.announce.link) {
      clearSettings();
      clearFinal();
      setNextMoveBtn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, userEmail]);

  const loginHandler = () => {
    router.push(authorizationCodeLink);
  };

  const handleLogoClick = () => {
    deleteAllScript(); // 상태 초기화
    router.push(HEADER_TXT.mainHome.link); // 이동
  };

  return (
    <>
      <header className="h_pc">
        <div className="header_container">
          <div className="header_menu">
            <h1>
              <button
                onClick={handleLogoClick}
                className="logo_area"
              >
                <Image
                  src={LocalImages.ImageTtorangWhiteLogo}
                  alt="ImageTtorangWhiteLogo"
                  width={98}
                  height={33}
                />
              </button>
            </h1>
            <nav>
              <ul>
                <li>
                  <button
                    onClick={() => {
                      deleteAllScript();
                      router.push(HEADER_TXT.mainHome.link);
                    }}
                    className={cls(pathname === HEADER_TXT.mainHome.link ? 'on' : '')}
                  >
                    {HEADER_TXT.mainHome.title}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      deleteAllScript();
                      router.push(HEADER_TXT.announce.link);
                    }}
                    className={cls(pathname === HEADER_TXT.announce.link ? 'on' : '')}
                  >
                    {HEADER_TXT.announce.title}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header_user">
            {userEmail ? (
              <Link href={HEADER_TXT.mypage.link}>{HEADER_TXT.mypage.title}</Link>
            ) : (
              <button
                type="button"
                onClick={() => setLogin(true)}
              >
                {HEADER_TXT.login}
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
            router.push(HEADER_TXT.announce.link);
          }}
        />
      )}
    </>
  );
}
