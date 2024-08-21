import { useCompareScriptStore, useFinalScriptStore, useSettingStore } from '@/store/store';
import { formatNumber } from '@/utils/config';
import { ANNOUNCE_TXT } from '@/utils/constants';
import HighlightWithinTextarea from 'react-highlight-within-textarea';

export default function AnnouncContent(props) {
  const { scriptWriteBoxRef, writeOriginScript, charCountOrigin, highlightedText, charCountNew, setCharCountNew } = props;
  const { compareScriptToggle } = useCompareScriptStore();
  const { originScript, newScript, setNewScript } = useSettingStore();
  const { setFinalScript } = useFinalScriptStore();
  const MAX_LENGTH = 3000;
  const filterOut = ['-', '"', '"', '!.', '!', '[', ']', ':'];

  const normalTxtArea = () => (
    <>
      <div
        ref={scriptWriteBoxRef}
        className="textSize"
      >
        <textarea
          placeholder={ANNOUNCE_TXT.scriptWrite.inputDescription}
          maxLength={MAX_LENGTH}
          value={originScript}
          onChange={writeOriginScript}
        />
      </div>
      <p>
        {formatNumber(charCountOrigin)} / {MAX_LENGTH}
      </p>
    </>
  );

  const modifyTxtArea = () => (
    <>
      <div className="textSize">
        <div className="newScript">
          <HighlightWithinTextarea
            highlight={[
              {
                highlight: highlightedText.filter((item) => !filterOut.includes(item) && item.length > 1),
                className: '!bg-[#cbeaff]',
              },
            ]}
            value={newScript}
            onChange={(value) => {
              setNewScript(value);
              setFinalScript(value);
              setCharCountNew(value.length);
              if (value.length > MAX_LENGTH) {
                setCharCountNew(MAX_LENGTH);
              }
            }}
          />
        </div>
      </div>
      <p>
        {formatNumber(charCountNew)} / {MAX_LENGTH}
      </p>
    </>
  );

  return <>{!compareScriptToggle ? normalTxtArea() : modifyTxtArea()}</>;
}
