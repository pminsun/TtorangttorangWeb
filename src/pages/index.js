import GuideMent from '@/components/GuideMent';
import SkeletonLoading from '@/components/SkeletonLoading';
import { askListArray, cls, formatNumber, measureTextWidth } from '@/utils/config';
import { diffWords } from 'diff';
import { useEffect, useState, useRef } from 'react';
import HighlightWithinTextarea from 'react-highlight-within-textarea';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';

const testTxt =
  "안녕하세요, 여러분. 오늘은 디자인 프로세스에서 중요한 역할을 하는 퍼소나(Persona)에 대해 이야기해보겠습니다. 퍼소나는 디자인 작업을 진행할 때 필수적인 도구 중 하나예요. 퍼소나는 우리의 제품이나 서비스를 사용할 가상의 사용자를 대표하는 캐릭터로, 실제 사용자 데이터를 기반으로 만들어집니다. 이를 통해 디자이너는 사용자 중심의 디자인을 구현할 수 있어요. 퍼소나를 만드는 과정은 다음과 같습니다. 먼저, 사용자 리서치를 통해 목표 사용자의 행동, 동기, 요구사항 등을 파악해요. 이때 인터뷰, 설문조사, 사용성 테스트 등의 방법을 사용합니다. 수집된 데이터를 분석하여 공통된 특성과 패턴을 찾아내고, 이를 바탕으로 하나 이상의 퍼소나를 정의해요.퍼소나는 예를 들어, 우리의 목표 사용자가 30대 직장인이라면, 그들의 하루 일과, 주요 관심사, 직장에서 겪는 문제점 등을 자세히 기록하는 편이에요. 퍼소나는 디자인 과정에서 여러 가지 중요한 역할을 합니다. 첫째, 팀원들이 사용자에 대한 공통된 이해를 갖게 해요. 이는 의사소통을 원활하게 하고, 팀원들이 같은 방향을 바라보도록 도와줍니다. 둘째, 디자인 결정 시 사용자 관점을 유지해 사용자에게 실제로 필요한 기능과 경험을 제공할 수 있습니다. 셋째, 사용자의 요구와 목표를 구체적으로 함으로써, 디자이너가 더 창의적이고 효율적으로 문제를 해결할 수 있도록 해줘요. 예를 들어, 우리는 '김지훈'이라는 퍼소나를 만들 수 있습니다. 지훈은 35세의 마케팅 매니저로, 바쁜 업무 일정 속에서 효율적으";

const testTxt2 =
  "반갑습니다!!!, 여러분. 오늘은 디자인 프로세스에서 중요한 역할을 하는 퍼소나(Persona)에 대해 이야기해보겠습니다. 퍼소나는 디자인 작업을 진행할 때 필수적인 도구 중 하나예요. 퍼소나는 우리의 제품이나 서비스를 사용할 가상의 사용자를 대표하는 캐릭터로, 실제 사용자 데이터를 기반으로 만들어집니다. 이를 통해 디자이너는 사용자 중심의 디자인을 구현할 수 있어요. 퍼소나를 만드는 과정은 다음과 같습니다. 먼저, 사용자 리서치를 통해 목표 사용자의 행동, 동기, 요구사항 등을 파악해요. 이때 인터뷰, 설문조사, 사용성 테스트 등의 방법을 사용합니다. 수집된 데이터를 분석하여 공통된 특성과 패턴을 찾아내고, 이를 바탕으로 하나 이상의 퍼소나를 만듭니다.퍼소나는 예를 들어, 우리의 목표 사용자가 30대 직장인이라면, 그들의 하루 일과, 주요 관심사, 직장에서 겪는 문제점 등을 자세히 기록하는 편이에요. 퍼소나는 디자인 과정에서 여러 가지 중요한 역할을 합니다. 첫째, 팀원들이 사용자에 대한 공통된 이해를 갖게 해요. 이는 의사소통을 원활하게 하고, 팀원들이 같은 방향을 바라보도록 도와줍니다. 둘째, 디자인 결정 시 사용자 관점을 유지해 사용자에게제로 필요한 기능과 경험을 제공할 수 있습니다. 셋째, 사용자의 요구와 목표를 구체적으로 함으로써, 디자이너가 더 창의적이고 효율적으로 문제를 해결할 수 있도록 해줘요. 예를 들어, 우리는 '김지훈'이라는 퍼소나를 만들 수 있습니다. 지훈은 35세의 마케팅 매니저로, 바쁜 업무 일정 속에서 효율적으로 관리한니다";

export default function Home() {
  const [originScript, setOriginScript] = useState('');
  const [newScript, setNewScript] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [charCountNew, setCharCountNew] = useState(0);
  const [subject, setSubject] = useState('');
  const [subjectCharCount, setSubjectCharCount] = useState(0);
  const [presentPurpose, setpresentPurpose] = useState('회사 컨퍼런스');
  const [endingTxt, setEndingTxt] = useState('합니다체');
  const [modifyBtn, setModifyBtn] = useState(false);
  const [estimatedPresentTime, setEstimatedPresentTime] = useState('0분 0초'); // 예상 발표 시간
  const [repeat, setRepeat] = useState(false);
  const [askListState, setAskListState] = useState([false, false, false]);
  const [askListTotalShow, setAskLisTotalShow] = useState(false);

  // 교정본 수정 여부 확인용 state
  const [retryScriptCompareTxt, setRetryScriptCompareTxt] = useState('');

  const [scriptToggle, setScriptToggle] = useState(false);
  const [highlightedText, setHighlightedText] = useState([]);

  const scriptWriteBoxRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(725);

  //skeleton
  const scriptTextareaRef = useRef(null);
  const scriptUpdateTextareaRef = useRef(null);
  const skeletonRef = useRef(null);
  const skeletonNewScriptRef = useRef(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showNewSkeleton, setShowNewSkeleton] = useState(false);
  const [lineWidths, setLineWidths] = useState([]);

  const selectPurpose = (purpose) => {
    setpresentPurpose(purpose);
  };

  const selectEndingTxt = (txt) => {
    setEndingTxt(txt);
  };

  const writeOriginScript = (event) => {
    const MAX_LENGTH = 3000;
    let draft = event.target.value;

    if (draft.length > MAX_LENGTH) {
      draft = event.target.value.slice(0, MAX_LENGTH);
    }
    setOriginScript(draft);
    setCharCount(draft.length);
  };

  const writeSubject = (event) => {
    const MAX_LENGTH = 100;
    let draft = event.target.value;

    if (draft.length > MAX_LENGTH) {
      draft = event.target.value.slice(0, MAX_LENGTH);
    }

    setSubject(draft);
    setSubjectCharCount(draft.length);
  };

  // 교정하기 버튼 활성화
  useEffect(() => {
    if (scriptToggle) {
      setModifyBtn(originScript && newScript && subject && presentPurpose && endingTxt && retryScriptCompareTxt !== newScript);
    } else {
      setModifyBtn(originScript && subject && presentPurpose && endingTxt);
    }
  }, [originScript, subject, newScript, retryScriptCompareTxt, presentPurpose, endingTxt, scriptToggle]);

  // script 초기화
  const deleteAllScript = () => {
    setOriginScript('');
    setSubject('');
    setCharCount(0);
    setSubjectCharCount(0);
    setpresentPurpose('회사 컨퍼런스');
    setEndingTxt('합니다체');
    setRepeat(false);
    setEstimatedPresentTime('0분 0초');
    setAskLisTotalShow(false);
    setScriptToggle(false);
    setNewScript('');
  };

  // 예상 발표 시간
  useEffect(() => {
    const estimatedTime = scriptToggle ? Math.ceil(charCountNew / 5) : Math.ceil(charCount / 5); // 초 단위
    const minutes = Math.floor(estimatedTime / 60);
    const seconds = estimatedTime % 60;
    setEstimatedPresentTime(`${minutes < 10 ? '0' + minutes : minutes}분 ${seconds < 10 ? '0' + seconds : seconds}초`);
  }, [charCount, charCountNew, originScript, scriptToggle]);

  // 클릭 시 질문 펼침/접기 처리
  const toggleItem = (index) => {
    setAskListState((prevState) => prevState.map((item, i) => (i === index ? !item : item)));
  };
  // 질문 펼침 초기화
  useEffect(() => {
    setAskListState([false, false, false]);
  }, []);

  const highlightDiffs = (oldStr, newStr) => {
    const diff = diffWords(oldStr, newStr);
    const highlights = [];

    diff
      .map((part) => {
        if (part.added) {
          highlights.push(part.value.trim());
        }
        if (!part.removed) {
          return part.value;
        }
      })
      .join('');

    setHighlightedText(highlights);
  };

  //  교정하기
  const modifyScript = () => {
    if (scriptTextareaRef.current || scriptUpdateTextareaRef.current) {
      // 스켈레톤 표시
      if (scriptTextareaRef.current) {
        setShowSkeleton(true);
        scriptTextareaRef.current.style.opacity = '0';
      }

      if (newScript.length > 0 && modifyBtn && scriptToggle && scriptUpdateTextareaRef.current) {
        setShowNewSkeleton(true);
        scriptUpdateTextareaRef.current.style.opacity = '0';
      }

      // 3초 후 처리
      setTimeout(() => {
        // 재교정 시 (2회차 이상)
        if (newScript.length > 0 && modifyBtn && scriptToggle) {
          const oldScript = newScript.slice(0, 3000);
          const updatedScript = testTxt2;
          // 1회차 교정본을 originScript로 설정
          setOriginScript(oldScript);

          // 2회차 새로운 교정본을 newScript로 설정
          // retryScriptCompareTxt 업데이트
          setRetryScriptCompareTxt(updatedScript);
          setNewScript(updatedScript);

          // 여기서 비교할 값을 로컬 변수에 저장

          // 스켈레톤 표시 제거
          setShowNewSkeleton(false);
          if (scriptUpdateTextareaRef.current) {
            scriptUpdateTextareaRef.current.style.opacity = '1';
          }
          // 새 스크립트로 업데이트
          // setNewScript(testTxt);
          setCharCountNew(updatedScript.length);

          // 원본과 새 스크립트 비교
          highlightDiffs(oldScript, updatedScript);

          // 나머지 상태 업데이트
          setAskLisTotalShow(true);
          setScriptToggle(true);
          setAskListState([false, false, false]);
        } else {
          // 첫 번째 교정
          setNewScript(testTxt);
          setRetryScriptCompareTxt(testTxt);
          setCharCountNew(testTxt.length);

          // 스켈레톤 표시 제거
          setShowSkeleton(false);

          // 원본과 새 스크립트 비교
          highlightDiffs(originScript, testTxt);

          if (scriptTextareaRef.current) {
            scriptTextareaRef.current.style.opacity = '1';
          }

          // 나머지 상태 업데이트
          setAskLisTotalShow(true);
          setScriptToggle(true);
          setAskListState([false, false, false]);
        }
      }, 3000);
    } else {
      console.error('scriptTextareaRef is null');
    }
  };

  // 스켈레톤 로딩
  useEffect(() => {
    const lines = scriptToggle ? newScript.split('\n') : originScript.split('\n');
    const skeletonLineWidths = lines.map((line) => measureTextWidth(line, '16px NotoSansKR'));
    setLineWidths(skeletonLineWidths);
  }, [newScript, originScript, scriptToggle]);

  // script box width 동적
  useEffect(() => {
    const updateWidth = () => {
      if (scriptWriteBoxRef.current) {
        setContainerWidth(scriptWriteBoxRef.current.offsetWidth);
      }
    };

    // Update width on mount and on resize
    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (skeletonRef.current) {
        skeletonRef.current.style.top = `-${scriptTextareaRef.current.scrollTop}px`;
      }
    };

    const textarea = scriptTextareaRef.current;
    if (textarea) {
      textarea.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (textarea) {
        textarea.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // 예상질문 Copy용
  const askCopyTxt = (totalAsk) => {
    return totalAsk
      ?.map((item, index) => {
        const numberedQuestion = `${index + 1}.질문: ${item.ask}\n답변: ${item.answer}\n\n`;
        return numberedQuestion;
      })
      .join('\n');
  };

  return (
    <main className="main_container">
      <section className="topBanner_area"></section>
      <section className="correction_area">
        <GuideMent
          order={1}
          firstMent={'아무리 해도 익숙해지지 않는 발표! 또랑또랑이 도와드릴게요'}
          secondMent={'또랑또랑의 세심한 교정으로 더욱 명확하고 논리적인 메시지를 전달해 보세요'}
        />
        <form className="scriptModify_box">
          <div
            ref={scriptWriteBoxRef}
            className="scriptWrite_box"
          >
            <div className="script">
              <p>
                <span className="required">*</span>발표 내용
              </p>
              <div className="scriptText_box">
                {newScript.length > 0 && (
                  <button
                    type="button"
                    className="scriptToggle_btn"
                    onClick={() => setScriptToggle(!scriptToggle)}
                  ></button>
                )}
                {!scriptToggle && (
                  <div>
                    <textarea
                      ref={scriptTextareaRef}
                      placeholder="발표문 초안을 작성해주세요"
                      maxLength="3000"
                      value={originScript}
                      onChange={writeOriginScript}
                    />
                    <div
                      ref={skeletonRef}
                      className="skeleton_box"
                      style={{ pointerEvents: 'none' }}
                    >
                      {showSkeleton && (
                        <SkeletonLoading
                          lineWidths={lineWidths}
                          containerWidth={containerWidth}
                        />
                      )}
                    </div>
                  </div>
                )}
                {scriptToggle && (
                  <div className="newScript">
                    <div ref={scriptUpdateTextareaRef}>
                      <HighlightWithinTextarea
                        highlight={[
                          {
                            highlight: highlightedText,
                            className: 'bg-[#cbeaff]',
                          },
                        ]}
                        value={newScript}
                        onChange={(value) => {
                          setNewScript(value);
                          setCharCountNew(value.length);

                          if (value.length > 3000) {
                            setCharCountNew(3000);
                          }
                        }}
                      />
                    </div>
                    <div
                      ref={skeletonNewScriptRef}
                      className="skeleton_box"
                      style={{ pointerEvents: 'none' }}
                    >
                      {showNewSkeleton && (
                        <SkeletonLoading
                          lineWidths={lineWidths}
                          containerWidth={containerWidth}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="scriptRef_btns">
                {newScript.length > 0 && (
                  <div
                    className="scriptToggle_btn"
                    onClick={() => setScriptToggle(!scriptToggle)}
                  >
                    <div className="icon">
                      <Image
                        src={LocalImages.ImageIconSyncAlt}
                        alt="ImageIconSyncAlt"
                        width={24}
                        height={24}
                      />
                    </div>
                    <p>{scriptToggle ? '원문 보기' : '교정문 보기'}</p>
                  </div>
                )}
                <div className="copy_box">
                  {originScript.length === 0 ? (
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
                  ) : (
                    <CopyToClipboard
                      className="copyClipboard"
                      text={scriptToggle ? newScript : originScript}
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
                </div>
              </div>
            </div>
            <div className="script_info">
              <div>
                <span>{scriptToggle ? formatNumber(charCountNew) : formatNumber(charCount)} / 3,000 (글자수)</span>
              </div>
              <div>
                <span>{estimatedPresentTime} (예상 발표 시간)</span>
              </div>
              <div>
                <span>개선 내용: {scriptToggle && <span className="main_colorTxt">핵심 요점을 짚고 논리적 흐름을 개선했어요</span>}</span>
              </div>
            </div>
          </div>
          <div className="scriptSetting_box">
            <div className="detailSetting">
              <div>
                <p>
                  1. <span className="required">*</span>발표의 주제에 대해 간략히 설명해 주세요
                </p>
                <div className="subject_box">
                  <textarea
                    placeholder="ex : 생활 속에서 실천할 수 있는 환경 보호 방안"
                    maxLength="100"
                    value={subject}
                    onChange={writeSubject}
                  />
                  <span className="subject_charCount">{subjectCharCount} / 100</span>
                </div>
              </div>
              <div>
                <p>
                  2. <span className="required">*</span>발표 목적을 선택해 주세요
                </p>
                <div className="purposeCheck">
                  <div
                    onClick={() => selectPurpose('회사 컨퍼런스')}
                    className={cls(presentPurpose === '회사 컨퍼런스' ? 'active_color' : 'disabled_color')}
                  >
                    <span>회사 컨퍼런스</span>
                  </div>
                  <div
                    onClick={() => selectPurpose('학교 발표')}
                    className={cls(presentPurpose === '학교 발표' ? 'active_color' : 'disabled_color')}
                  >
                    <span>학교 발표</span>
                  </div>
                  <div
                    onClick={() => selectPurpose('소모임')}
                    className={cls(presentPurpose === '소모임' ? 'active_color' : 'disabled_color')}
                  >
                    <span>소모임</span>
                  </div>
                </div>
              </div>
              <div>
                <p>
                  3. <span className="required">*</span>종결 어미를 선택해 주세요
                </p>
                <div className="endingTxtCheck">
                  <div
                    onClick={() => selectEndingTxt('합니다체')}
                    className={cls(endingTxt === '합니다체' ? 'active_color' : 'disabled_color')}
                  >
                    <span>합니다체</span>
                  </div>
                  <div
                    onClick={() => selectEndingTxt('해요체')}
                    className={cls(endingTxt === 'haeyo' ? 'active_color' : 'disabled_color')}
                  >
                    <span>- 해요체</span>
                  </div>
                  <div className="!cursor-default"></div>
                </div>
              </div>
              <div className="repeat_box">
                <div onClick={() => setRepeat(!repeat)}>
                  <div className={cls('checkbox', repeat ? 'active_color' : 'disabled_color')}>
                    {repeat && (
                      <Image
                        src={LocalImages.ImageIconCheckboxArrow}
                        alt="ImageIconCheckboxArrow"
                        width={11}
                        height={10}
                      />
                    )}
                  </div>
                  <p>중복 표현을 제거할게요</p>
                </div>
              </div>
            </div>
            <div className="btn_box">
              <button
                type="button"
                onClick={deleteAllScript}
                className={cls(originScript.length > 0 || subject.length > 0 ? 'active_color cursor-pointer' : 'disabled_color cursor-default')}
              >
                초기화
              </button>
              <button
                type="button"
                onClick={modifyScript}
                className={cls(modifyBtn ? 'active_color cursor-pointer' : 'disabled_color cursor-default')}
              >
                교정하기
              </button>
              {/* 임시 type button */}
            </div>
          </div>
        </form>
      </section>
      <section className="ask_area">
        <GuideMent
          order={2}
          firstMent={'예상되는 질문들을 모아봤어요'}
          secondMent={'또랑또랑이 준비한 예상 질문과 답변으로, 발표를 더욱 완성도 있게 만들어 보세요'}
        />
        <div className="ask_box">
          {!askListTotalShow ? (
            <div className="askList">
              <ul>
                {askListArray.map((item, index) => (
                  <li key={index}>
                    <div
                      className="list_ask"
                      onClick={() => toggleItem(index)}
                    >
                      <span className={cls(askListState[index] ? 'font-semibold' : 'font-medium')}>{item.ask}</span>
                      <div className={cls('list_arrow', askListState[index] ? 'scale-y-[-1]' : 'scale-y-[1]')}>
                        <Image
                          src={LocalImages.ImageIconArrow}
                          alt="ImageIconArrow"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                    <div className={cls('list_answer', askListState[index] ? 'on' : '')}>
                      <div>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="askCopy">
                <CopyToClipboard
                  className="copyAskClipboard"
                  text={askCopyTxt(askListArray)}
                  onCopy={() => alert('예상 질문과 답변을 복사했어요')}
                >
                  <span>질문 복사하기</span>
                </CopyToClipboard>
              </div>
            </div>
          ) : (
            <div className="askNone">
              <div>
                <div className="illust_box">
                  <Image
                    src={LocalImages.ImageTtorangNote}
                    alt="ImageTtorangNote"
                    width={254}
                    height={254}
                  />
                </div>
                <p>
                  아직 발표문을 분석하지 못했어요.
                  <br /> 발표문 초안을 작성한 후, 교정하기 버튼을 눌러주세요
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
