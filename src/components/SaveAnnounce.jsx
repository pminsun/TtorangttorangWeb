import { useEffect, useState } from 'react';
import Image from 'next/image';
import GuideMent from './GuideMent';
import * as LocalImages from '@/utils/imageImports';
import { useFinalScriptStore } from '@/store/store';
import { cls, formatNumber } from '@/utils/config';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function SaveAnnounce() {
  const { finalScript, setFinalScript } = useFinalScriptStore();
  const [charCountFinal, setCharCountFinal] = useState(0);
  const [qaArray, setQaArray] = useState([]);

  const userModifyScript = (event) => {
    const MAX_LENGTH = 3000;
    let draft = event.target.value;

    if (draft.length > MAX_LENGTH) {
      draft = event.target.value.slice(0, MAX_LENGTH);
    }
    setFinalScript(draft);
    setCharCountFinal(draft.length);
  };

  return (
    <section className="main_container">
      <div className="progress_bar"></div>
      <section className="saveQa_area">
        <form>
          <div className="userModify_box">
            <GuideMent
              firstMent={'완성 발표문'}
              secondMent={'완성된 발표문을 분석하여 예상 질문과 답변을 받아보세요'}
            />
            <div className="scriptFinal_area">
              <p className="title">발표 대본</p>
              <div className="scriptTxt">
                <textarea
                  placeholder="발표문 초안을 작성해 주세요. 꼼꼼히 작성할수록 세심한 교정과 정확한 예상 질문을 받을 수 있어요."
                  maxLength="3000"
                  value={finalScript}
                  onChange={userModifyScript}
                />
                <p>{formatNumber(charCountFinal)}/ 3000</p>
              </div>
              <CopyToClipboard
                className="copyClipboard"
                text={finalScript}
                onCopy={() => alert('완성된 발표문을 복사했어요')}
              >
                <div className="copy_area">
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
          </div>
          <div className="qa_box">
            <GuideMent
              firstMent={'예상 질문과 답변'}
              secondMent={'반복 연습으로 더욱 완벽한 발표를 만들어 보세요! '}
            />
            <div>
              <div className="qa_area">
                {qaArray ? (
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
                      아직 발표문을 분석하지 못했어요
                      <br />
                      아래의 [예상 질문 받기] 버튼을 눌러주세요
                    </p>
                  </div>
                ) : (
                  <ul>
                    {[1, 2, 3, 4].map((item, index) => (
                      <li key={index}>
                        <p>질문</p>
                        <p>디자인 소프트웨어나 도구 중에 즐겨 사용하는 것이 있나요?</p>
                        <div className="list_arrow">
                          <Image
                            src={LocalImages.ImageIconArrow}
                            alt="ImageIconArrow"
                            width={24}
                            height={24}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="finalBtn_box">
                <button
                  type="button"
                  className={cls(finalScript.length > 0 ? 'active_color cursor-pointer' : 'cursor-default')}
                >
                  질문 다시 받기
                </button>
                <button type="button">저장하기</button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}
