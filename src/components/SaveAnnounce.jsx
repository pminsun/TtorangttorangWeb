import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import GuideMent from './GuideMent';
import * as LocalImages from '@/utils/imageImports';
import { useFinalScriptStore, useSettingStore, useQaLoadingStore } from '@/store/store';
import { askListArray, cls, formatNumber, testScript, testScriptTitle } from '@/utils/config';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from 'next/link';
import { fetchQnAData, fetchSaveScript } from '@/api/fetchData';

export default function SaveAnnounce({session}) {
  const pathname = usePathname();
  const { subject, presentPurpose, endingTxt } = useSettingStore();
  const [announcePage, setAnnouncePage] = useState(true);
  const { finalScript, setFinalScript } = useFinalScriptStore();
  const [charCountFinal, setCharCountFinal] = useState(0);
  const [qaArray, setQaArray] = useState([]);
  const [askListState, setAskListState] = useState([false, false, false, false]);
  // 로딩
  const { setQaLoading } = useQaLoadingStore();
  // 저장한 발표문
  const [modifySaveAnnounce, setModifySaveAnnounce] = useState(false);
  const [saveAnnounce, setSaveAnnounce] = useState('');
  const [saveAnnounceCharCount, setSaveAnnounceCharCount] = useState(0);
  const [modifyTitle, setModifyTitle] = useState('');
  const [modifyTitleCharCount, setModifyTitleCharCount] = useState(0);

  // 교정하기 페이지 = true / 마이 발표문 상세 = false
  useEffect(() => {
    if (pathname === '/announce') {
      setAnnouncePage(true);
    } else {
      setAnnouncePage(false);
    }
  }, [pathname]);

  const userModifyScript = (event) => {
    const MAX_LENGTH = 3000;
    let draft = event.target.value;

    if (draft.length > MAX_LENGTH) {
      draft = event.target.value.slice(0, MAX_LENGTH);
    }

    // 교정하기, 저장본 페이지 구분
    if (announcePage) {
      setFinalScript(draft);
      setCharCountFinal(draft.length);
    } else {
      setSaveAnnounce(draft);
      setSaveAnnounceCharCount(draft.length);
    }
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

  // 예상질문 답변
  const getQAList = async () => {
    setQaLoading(true);
    try {
      const data = {
        content: finalScript.replace(/\n/g, ''),
      };

      //data
      const response = await fetchQnAData(data);
      const redData = response.data.replace(/data:/g, '');
      const events = redData.split('\n\n'); // 이벤트 분리
      const newQnaContentQueue = [];
      events.forEach((event) => {
        if (event.trim()) {
          try {
            const jsonData = JSON.parse(event);
            const content = jsonData.message?.content || '';

            if (content) {
              // 상태를 업데이트하여 새 content 값을 배열에 추가
              newQnaContentQueue.push(content);
            }
          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }
        }
      });
      const finaldata = newQnaContentQueue.join('');

      // Q&A 데이터 파싱
      const qnaArray = [];
      const qnaPairs = finaldata.split('\n\n');
      qnaPairs.forEach((pair) => {
        const [question, answer] = pair.split('\nA');
        if (question && answer) {
          qnaArray.push({
            question: question
              .trim()
              .replace('Q', '')
              .replace(/^\d+\.\s*/, '')
              .trim(),
            answer: answer
              .trim()
              .replace('A', '')
              .replace(/^\d+\.\s*/, '')
              .trim(),
          });
        }
      });

      if (qnaArray.length > 0) {
        setQaArray(qnaArray);
      }
      setQaLoading(false);
      setAskListState([false, false, false, false]);
    } catch (error) {
      console.error('Error fetching modified script:', error);
      setQaLoading(false);
    }
  };

  // 저장
  const saveScriptToAccount = async () => {
    try {
      const data = {
        topic: subject,
        purpose: presentPurpose,
        word: endingTxt,
        content: finalScript.replace(/\n/g, ''),
        qnaList: qaArray,
      };
      const response = await fetchSaveScript(data);
      console.log('response', response);
    } catch (error) {
      console.error('Error fetching save script:', error);
    }
  };

  // 최초로 저장된 발표문
  useEffect(() => {
    if (!announcePage) {
      setModifyTitle(testScriptTitle);
      setModifyTitleCharCount(testScriptTitle.length);
      setSaveAnnounce(testScript);
      setSaveAnnounceCharCount(testScript.length);
      setQaArray(askListArray);
    }
  }, [announcePage]);

  // 저장한 내 발표문 제목
  const userModifyTitle = (event) => {
    const MAX_LENGTH = 30;
    let title = event.target.value;

    if (title.length > MAX_LENGTH) {
      title = event.target.value.slice(0, MAX_LENGTH);
    }
    setModifyTitle(title);
    setModifyTitleCharCount(title.length);
  };

  const sliceTitleOverThirty = (text) => {
    return text.length > 30 ? text.slice(0, 30) + '...' : text;
  };

  return (
    <section className={cls('main_container', announcePage ? '' : 'myAnnounce_detail_container')}>
      {announcePage && <div className="progress_bar"></div>}
      <section className="saveQa_area">
        <form>
          <div className="userModify_box">
            {announcePage && (
              <GuideMent
                firstMent={'완성 발표문'}
                secondMent={'완성된 발표문을 분석하여 예상 질문과 답변을 받아보세요'}
              />
            )}
            {!announcePage && (
              <div className="scriptTitle_area">
                <p>({modifyTitleCharCount}/30)</p>
                <input
                  maxLength="30"
                  value={sliceTitleOverThirty(modifyTitle)}
                  onChange={userModifyTitle}
                />
              </div>
            )}
            <div className="scriptFinal_area">
              <p className="title">발표 대본</p>
              <div className="scriptTxt">
                <textarea
                  placeholder="발표문 초안을 작성해 주세요. 꼼꼼히 작성할수록 세심한 교정과 정확한 예상 질문을 받을 수 있어요."
                  maxLength="3000"
                  value={announcePage ? finalScript : saveAnnounce}
                  onChange={userModifyScript}
                  disabled={modifySaveAnnounce || announcePage ? false : true}
                />
                <p>{announcePage ? formatNumber(charCountFinal) : formatNumber(saveAnnounceCharCount)}/ 3000</p>
              </div>
              <CopyToClipboard
                className="copyClipboard"
                text={announcePage ? finalScript : saveAnnounce}
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
            {!announcePage && (
              <button
                type="button"
                className={cls('scriptSave_btn', modifySaveAnnounce ? 'active_color' : 'gray_colorTxt area_border')}
                onClick={() => setModifySaveAnnounce(!modifySaveAnnounce)}
              >
                {modifySaveAnnounce ? '저장하기' : '수정하기'}
              </button>
            )}
          </div>
          <div className="qa_box">
            <GuideMent
              firstMent={announcePage ? '예상 질문과 답변' : '타이틀'}
              secondMent={announcePage ? '반복 연습으로 더욱 완벽한 발표를 만들어 보세요!' : '타이틀 설명 가이드 텍스트'}
              saveMentStyle={announcePage ? '' : 'saveMentStyle'}
            />
            <div>
              <div className="qa_area">
                {qaArray.length === 0 && announcePage ? (
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
                          <p className="question">{item.question}</p>
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
              {announcePage && (
                <div className="finalBtn_box">
                  <button
                    type="button"
                    onClick={getQAList}
                    className={cls(finalScript.length > 0 ? 'active_color cursor-pointer' : 'cursor-default')}
                  >
                    {qaArray.length > 0 ? '질문 다시 받기' : '예상 질문 받기'}
                  </button>
                  <button
                    type="button"
                    onClick={saveScriptToAccount}
                    className={cls(qaArray.length > 0 ? 'active_color cursor-pointer' : 'cursor-default')}
                  >
                    저장하기
                  </button>
                </div>
              )}
              {!announcePage && (
                <Link
                  href={'/mypage'}
                  type="button"
                  className="back_btn"
                >
                  뒤로가기
                </Link>
              )}
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}
