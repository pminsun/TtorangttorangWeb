import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  console.log(session);
  return (
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
                <Link href={'/'}>메인 홈</Link>
              </li>
              <li>
                <Link href={'/'}>교정하기</Link>
              </li>
              <li>
                <button onClick={() => signOut('kakao')}>로그아웃</button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header_user">{session?.user.name ? <Link href={'/'}>마이페이지</Link> : <button onClick={() => signIn('kakao')}>로그인</button>}</div>
      </div>
    </header>
  );
}
