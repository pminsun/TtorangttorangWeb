import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';

export default function CopyAnnounce() {
  return (
    <div>
      <div className="icon w-[2.6vmin] h-[2.6vmin]">
        <Image
          src={LocalImages.ImageIconCopy}
          alt="ImageIconCopy"
          width={24}
          height={24}
          className="w-full h-full"
        />
      </div>
      <p className="text-[1.52vmin]">복사하기</p>
    </div>
  );
}
