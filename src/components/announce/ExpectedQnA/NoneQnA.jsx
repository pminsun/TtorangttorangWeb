import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { ANNOUNCE_TXT } from '@/utils/constants';

export default function NoneQnA() {
  return (
    <div className="none_qa">
      <div>
        <Image
          src={LocalImages.ImageTtorangNote}
          alt="ImageTtorangNote"
          width={254}
          height={254}
        />
      </div>
      <p>
        {ANNOUNCE_TXT.scriptFinal.noneQna.first}
        <br />
        {ANNOUNCE_TXT.scriptFinal.noneQna.second}
      </p>
    </div>
  );
}
