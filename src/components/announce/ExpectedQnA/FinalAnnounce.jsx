import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import CopyToClipboard from 'react-copy-to-clipboard';
import { cls, formatNumber } from '@/utils/config';
import { ANNOUNCE_TXT } from '@/utils/constants';
import { useFinalScriptStore } from '@/store/store';

export default function FinalAnnounce(props) {
  const { announcePage, saveAnnounce, userModifyScript, modifySaveAnnounce, charCountFinal, saveAnnounceCharCount } = props;
  const { finalScript } = useFinalScriptStore();
  const MAX_LENGTH = 3000;

  // 조건별 css
  const scriptAreaClass = cls('scriptTxt', announcePage ? 'h-[calc(100%-8vmin)]' : 'h-[44vmin]');
  const scriptClass = cls(announcePage ? 'h-[36vmin]' : '!h-[39vmin]');

  // announce, maypage 별
  const scriptValue = announcePage ? finalScript : saveAnnounce;
  const scriptDisabled = modifySaveAnnounce || announcePage ? false : true;
  const scriptLength = announcePage ? formatNumber(charCountFinal) : formatNumber(saveAnnounceCharCount);

  return (
    <>
      <div className={scriptAreaClass}>
        <textarea
          placeholder={ANNOUNCE_TXT.scriptWrite.inputDescription}
          maxLength={MAX_LENGTH}
          value={scriptValue}
          onChange={userModifyScript}
          disabled={scriptDisabled}
          className={scriptClass}
        />
        <p>
          {scriptLength}/ {MAX_LENGTH}
        </p>
      </div>
      <div className="copy_box">
        <CopyToClipboard
          className="copyClipboard"
          text={scriptValue}
          onCopy={() => alert('완성된 발표문을 복사했어요')}
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
      </div>
    </>
  );
}
