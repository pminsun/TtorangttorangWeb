import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';

export default function Custom404() {
  return (
    <section className="error_container">
      <div>
        <div className="character_box">
          <Image
            src={LocalImages.ImageTtorangWithdrawal}
            alt="ImageTtorangWithdrawal"
            width={120}
            height={120}
          />
        </div>
        <p>해당 페이지를 찾을 수 없습니다</p>
        <div className="movePage_area">
          <Link href={'/'}>메인 홈 이동</Link>
          <Link href={'/announce'}>교정하기 이동</Link>
        </div>
      </div>
    </section>
  );
}
