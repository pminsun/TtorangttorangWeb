import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';

export default function Header() {
  return (
    <header>
      <p className="logo_area">
        <Image
          src={LocalImages.ImageLogo}
          alt="ImageLogo"
          width={120}
          height={52}
        />
      </p>
    </header>
  );
}
