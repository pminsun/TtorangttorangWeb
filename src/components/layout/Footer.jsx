import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';
import { footerTxt } from '@/utils/constants';

export default function Footer() {
  return (
    <footer>
      <div className="ft_container">
        <div>
          <p>{footerTxt.teamName}</p>
          <p>{footerTxt.projectHost}</p>
        </div>
        <div>
          <Link
            href={footerTxt.service.contact.link}
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
            <span>{footerTxt.service.contact.title}</span>
          </Link>
          <Link
            href={footerTxt.service.Introduction.link}
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
            <span>{footerTxt.service.Introduction.title}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
