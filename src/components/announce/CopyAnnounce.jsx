import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSettingStore } from '@/store/store';

export default function CopyAnnounce(props) {
  const { compareScriptToggle } = props;
  const { originScript, newScript } = useSettingStore();
  const textToCopy = compareScriptToggle ? newScript : originScript;
  const isDisabled = originScript?.length === 0;

  return (
    <>
      {isDisabled ? (
        <div className="!cursor-default">
          <div className="icon">
            <Image
              src={LocalImages.ImageIconCopy}
              alt="ImageIconCopy"
              width={24}
              height={24}
            />
          </div>
          <p>복사하기</p>
        </div>
      ) : (
        // 복사 기능이 활성화된 경우
        <CopyToClipboard
          className="copyClipboard"
          text={textToCopy}
          onCopy={() => alert('발표문을 복사했어요')}
        >
          <div>
            <div className="icon">
              <Image
                src={LocalImages.ImageIconCopy}
                alt="ImageIconCopy"
                width={24}
                height={24}
              />
            </div>
            <p>복사하기</p>
          </div>
        </CopyToClipboard>
      )}
    </>
  );
}
