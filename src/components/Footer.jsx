import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="ft_container">
        <div>
          <p className="font-bold">발표명장</p>
          <p className="text-[12px]">비사이드 407기 </p>
        </div>
        <div>
          <Link
            href={'/'}
            target="_blank"
          >
            <div className="ftIcon_box">
              <Image
                src={LocalImages.ImageIconHelp}
                alt="ImageIconHelp"
                width={24}
                height={24}
              />
            </div>
            <span>문의하기</span>
          </Link>
          <Link
            href={'/'}
            target="_blank"
          >
            <div className="ftIcon_box">
              <Image
                src={LocalImages.ImageIconDescription}
                alt="ImageIconDescription"
                width={24}
                height={24}
              />
            </div>
            <span>서비스 소개</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
