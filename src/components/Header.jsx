import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link
        href={'/'}
        className="logo_area"
      >
        <Image
          src={LocalImages.ImageLogo}
          alt="ImageLogo"
          width={120}
          height={52}
        />
      </Link>
    </header>
  );
}
