import GuideMent from '@/components/GuideMent';
import SkeletonLoading from '@/components/SkeletonLoading';
import { cls, formatNumber, measureTextWidth, temData, dataT } from '@/utils/config';
import { diffWords } from 'diff';
import { useEffect, useState, useRef } from 'react';
import HighlightWithinTextarea from 'react-highlight-within-textarea';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { fetchAnnounceData } from '@/api/fetchData';
import axios from 'axios';

export default function Announce() {
  const [originScript, setOriginScript] = useState('');
  const [newScript, setNewScript] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [charCountNew, setCharCountNew] = useState(0);
  const [subject, setSubject] = useState('');
  const [subjectCharCount, setSubjectCharCount] = useState(0);
  const [presentPurpose, setPresentPurpose] = useState('회사 컨퍼런스');
  const [endingTxt, setEndingTxt] = useState('합니다체');
  const [modifyBtn, setModifyBtn] = useState(false);
  const [estimatedPresentTime, setEstimatedPresentTime] = useState('0분 0초'); // 예상 발표 시간
  const [repeat, setRepeat] = useState(false);
  const [askListState, setAskListState] = useState([false, false, false]);
  const [askListTotalShow, setAskLisTotalShow] = useState(false);
  const [improvements, setImprovements] = useState('');

  const [qaArray, setQaArray] = useState([]);
  //let qaArray = [];

  // 교정본 수정 여부 확인용 state
  const [retryScriptCompareTxt, setRetryScriptCompareTxt] = useState('');
  const [scriptToggle, setScriptToggle] = useState(false);
  const [highlightedText, setHighlightedText] = useState([]);
  const scriptWriteBoxRef = useRef(null);

  //skeleton
  const [containerWidth, setContainerWidth] = useState(725);
  const scriptTextareaRef = useRef(null);
  const scriptUpdateTextareaRef = useRef(null);
  const skeletonRef = useRef(null);
  const skeletonNewScriptRef = useRef(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showNewSkeleton, setShowNewSkeleton] = useState(false);
  const [lineWidths, setLineWidths] = useState([]);

  const selectPurpose = (purpose) => {
    setPresentPurpose(purpose);
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
    setPresentPurpose('회사 컨퍼런스');
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

  function extractContents(data) {
    return data.map((item) => item.message.content).join('');
  }

  //  교정하기
  const modifyScript = async () => {
    // Skeleton loading start
    if (scriptTextareaRef.current) {
      setShowSkeleton(true);
      scriptTextareaRef.current.style.opacity = '0';
    }

    if (newScript.length > 0 && modifyBtn && scriptToggle && scriptUpdateTextareaRef.current) {
      setShowNewSkeleton(true);
      scriptUpdateTextareaRef.current.style.opacity = '0';
    }

    try {
      const data = {
        topic: subject,
        purpose: presentPurpose,
        content: newScript.length > 0 && modifyBtn && scriptToggle ? newScript.slice(0, 3000) : originScript,
        word: endingTxt,
        duplicate: repeat === true ? 'Y' : 'N',
      };

      let jsonStringArray = [];
      let dataArray = [];

      const response = await fetchAnnounceData(data);
      jsonStringArray.push(response.data);

      jsonStringArray.forEach((jsonString) => {
        // 문자열을 줄 단위로 분리
        const lines = jsonString.split('\n');

        // 각 줄을 처리하여 JSON 객체로 변환
        lines.forEach((line) => {
          // 'data:' 접두사 제거
          const jsonString = line.replace(/^data:/, '').trim();

          // JSON 문자열이 비어 있지 않은 경우
          if (jsonString) {
            try {
              const parsedObject = JSON.parse(jsonString);

              // 'message'와 'content'가 있는 경우에만 추출
              if (parsedObject.message && parsedObject.message.content) {
                dataArray.push(parsedObject.message.content);
              }
            } catch (e) {
              console.error('Error parsing JSON string:', e);
            }
          }
        });
      });

      const finaldata = dataArray.join('');

      const scriptStartIndex = finaldata.indexOf('1. 발표 대본');
      const scriptEndIndex = finaldata.indexOf('2. 개선 내용');
      const improveEndIndex = finaldata.indexOf('3. 예상 질문');
      const lastIndex = finaldata.length;

      const extractedScriptText = finaldata.substring(scriptStartIndex, scriptEndIndex).trim();
      const extractedImproveEText = finaldata.substring(scriptEndIndex, improveEndIndex).trim();
      const extractedOAText = finaldata.substring(improveEndIndex, lastIndex).trim();
      const removeOne = extractedScriptText.replace(/^1\.\s+/m, '').replace('발표 대본', '');
      const removeTwo = extractedImproveEText.replace(/^2\.\s+/m, '');

      const improveLlines = removeTwo.split('\n');
      const removeWord = improveLlines.map((item) => item.replace('개선 내용 : ', ''));

      setImprovements(removeWord);

      // qa 배열화
      const qAcleanText = extractedOAText.replace(/^3\. 예상 질문, 답변\s+/m, '').trim();
      const lines = qAcleanText.split('\n');
      const askListArray = [];

      let currentObject = {};

      lines.forEach((line) => {
        if (line.startsWith('Q :')) {
          if (currentObject.Q) {
            askListArray.push(currentObject);
            currentObject = {};
          }
          currentObject.Q = line.slice(2).trim();
        } else if (line.startsWith('A :')) {
          currentObject.A = line.slice(2).trim();
        } else if (line.trim() === '' && currentObject.Q && currentObject.A) {
          askListArray.push(currentObject);
          currentObject = {};
        }
      });

      // Push the last object if it exists
      if (currentObject.Q && currentObject.A) {
        askListArray.push(currentObject);
      }

      if (newScript.length > 0 && modifyBtn && scriptToggle) {
        // 재교정 시 (2회차 이상)
        const oldScript = newScript.slice(0, 3000);
        const updatedScript = removeOne;

        // 2회차 새로운 교정본을 newScript로 설정 1회차는 구
        setOriginScript(oldScript);
        setRetryScriptCompareTxt(updatedScript);
        setNewScript(updatedScript);
        setCharCountNew(updatedScript.length);

        // 원본과 새 스크립트 비교
        highlightDiffs(oldScript, updatedScript);

        setShowNewSkeleton(false);
        if (scriptUpdateTextareaRef.current) {
          scriptUpdateTextareaRef.current.style.opacity = '1';
        }
      } else {
        // 첫 번째 교정
        setNewScript(removeOne);
        setCharCountNew(removeOne.length);

        setRetryScriptCompareTxt(removeOne);

        setQaArray(askListArray);
        // 원본과 새 스크립트 비교
        highlightDiffs(originScript, removeOne);
        if (scriptTextareaRef.current) {
          scriptTextareaRef.current.style.opacity = '1';
        }
        setShowSkeleton(false);
      }
      // 나머지 상태 업데이트
      setAskLisTotalShow(true);
      setScriptToggle(true);
      setAskListState([false, false, false]);
    } catch (error) {
      console.error('Error fetching modified script:', error);
      setShowSkeleton(false);
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
      <section className="topBanner_area">
        <Image
          src={LocalImages.ImageBenner}
          alt="ImageBenner"
          width={1493}
          height={300}
        />
        <div className="topBanner_ment">
          <div className="topBanner_mentArea">
            <p>발표가 자신 없고 어려울 땐?</p>
            <p>AI가 도와주는 완벽한 발표 준비</p>
          </div>
          <div className="topBanner_logo">
            <Image
              src={LocalImages.ImageVarLogo}
              alt="ImageVarLogo"
              width={188}
              height={92}
            />
          </div>
        </div>
      </section>
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
                <span>개선 내용: {scriptToggle && <span className="main_colorTxt">{improvements[0] === '개선 내용' ? improvements[1] : improvements[0]}</span>}</span>
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
                    <span>- 합니다체</span>
                  </div>
                  <div
                    onClick={() => selectEndingTxt('해요체')}
                    className={cls(endingTxt === '해요체' ? 'active_color' : 'disabled_color')}
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
                onClick={() => {
                  if (originScript.length > 0 || subject.length > 0) {
                    deleteAllScript();
                  }
                }}
                className={cls(originScript.length > 0 || subject.length > 0 ? 'active_color cursor-pointer' : 'disabled_color cursor-default')}
              >
                초기화
              </button>
              <button
                type="button"
                onClick={() => {
                  if (modifyBtn) {
                    modifyScript();
                  }
                }}
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
          {askListTotalShow ? (
            <div className="askList">
              <ul>
                {qaArray.map((item, index) => (
                  <li key={index}>
                    <div
                      className="list_ask"
                      onClick={() => toggleItem(index)}
                    >
                      <span className={cls(askListState[index] ? 'font-semibold' : 'font-medium')}>{item.Q.replace(':', '')}</span>
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
                        <p>{item.A.replace(':', '')}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="askCopy">
                <CopyToClipboard
                  className="copyAskClipboard"
                  text={askCopyTxt(qaArray)}
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
