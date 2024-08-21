import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';
import { FOOTER_TXT } from '@/utils/constants';

export default function Footer() {
  return (
    <footer>
      <div className="ft_container">
        <div>
          <p>{FOOTER_TXT.teamName}</p>
          <p>{FOOTER_TXT.projectHost}</p>
        </div>
        <div>
          <Link
            href={FOOTER_TXT.service.contact.link}
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
            <span>{FOOTER_TXT.service.contact.title}</span>
          </Link>
          <Link
            href={FOOTER_TXT.service.Introduction.link}
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
            <span>{FOOTER_TXT.service.Introduction.title}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
