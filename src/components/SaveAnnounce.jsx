import { useEffect, useState } from 'react';
import Image from 'next/image';
import GuideMent from './GuideMent';
import * as LocalImages from '@/utils/imageImports';
import { useFinalScriptStore, useQaLoadingStore } from '@/store/store';
import { askListArray, cls, formatNumber } from '@/utils/config';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function SaveAnnounce() {
  const { finalScript, setFinalScript } = useFinalScriptStore();
  const [charCountFinal, setCharCountFinal] = useState(0);
  const [qaArray, setQaArray] = useState([]);
  const [askListState, setAskListState] = useState([false, false, false, false]);
  // 로딩
  const { qaLoading, setQaLoading } = useQaLoadingStore();

  const userModifyScript = (event) => {
    const MAX_LENGTH = 3000;
    let draft = event.target.value;

    if (draft.length > MAX_LENGTH) {
      draft = event.target.value.slice(0, MAX_LENGTH);
    }
    setFinalScript(draft);
    setCharCountFinal(draft.length);
  };

  // 클릭 시 질문 펼침/접기 처리
  const toggleQAItem = (index) => {
    setAskListState((prevState) => prevState.map((item, i) => (i === index ? !item : item)));
  };

  // 질문 펼침 초기화
  useEffect(() => {
    setAskListState([false, false, false, false]);
    setCharCountFinal(finalScript.length);
  }, []);

  const getQAList = () => {
    setQaLoading(true);
    setTimeout(() => {
      setQaArray(askListArray);
      setQaLoading(false);
    }, 3000);
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
                {qaArray.length === 0 ? (
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
                    {qaArray.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => toggleQAItem(index)}
                      >
                        <div className="question_area">
                          <p>질문</p>
                          <p className="question">{item.ask}</p>
                          <div className={cls('list_arrow', askListState[index] ? 'scale-y-[-1]' : 'scale-y-[1]')}>
                            <Image
                              src={LocalImages.ImageIconArrow}
                              alt="ImageIconArrow"
                              width={24}
                              height={24}
                            />
                          </div>
                        </div>
                        <div className={cls('answer_area', askListState[index] ? 'on' : '')}>
                          <p>답변</p>
                          <p className="answer">{item.answer}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="finalBtn_box">
                <button
                  type="button"
                  onClick={getQAList}
                  className={cls(finalScript.length > 0 ? 'active_color cursor-pointer' : 'cursor-default')}
                >
                  질문 다시 받기
                </button>
                <button
                  type="button"
                  className={cls(qaArray.length > 0 ? 'active_color cursor-pointer' : 'cursor-default')}
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}
