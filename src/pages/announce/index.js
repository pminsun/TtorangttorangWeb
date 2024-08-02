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

export default function Announce() {
  const [originScript, setOriginScript] = useState('');
  const [newScript, setNewScript] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [charCountNew, setCharCountNew] = useState(0);
  const [subject, setSubject] = useState('');
  const [retrysubject, setRetrySubject] = useState('');

  const [subjectCharCount, setSubjectCharCount] = useState(0);
  const [presentPurpose, setPresentPurpose] = useState('회사 컨퍼런스');
  const [retryPresentPurpose, setRetrPresentPurpose] = useState('회사 컨퍼런스');

  const [endingTxt, setEndingTxt] = useState('합니다체');
  const [retryEndingTxt, setRetryEndingTxt] = useState('합니다체');

  const [modifyBtn, setModifyBtn] = useState(false);
  const [estimatedPresentTime, setEstimatedPresentTime] = useState('0분 0초'); // 예상 발표 시간
  const [repeat, setRepeat] = useState(false);
  const [retryRepeat, setRetryRepeat] = useState(false);
  const [askListState, setAskListState] = useState([false, false, false]);
  const [askListTotalShow, setAskLisTotalShow] = useState(false);
  const [improvements, setImprovements] = useState('');

  const [qaArray, setQaArray] = useState([]);

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
      setModifyBtn(
        originScript &&
          newScript &&
          (retryRepeat !== repeat || retryPresentPurpose !== presentPurpose || retryEndingTxt !== endingTxt || retrysubject !== subject || retryScriptCompareTxt !== newScript),
      );
    } else {
      setModifyBtn(originScript && subject && presentPurpose && endingTxt);
    }
  }, [originScript, subject, newScript, retryRepeat, repeat, retryPresentPurpose, retryScriptCompareTxt, retryEndingTxt, presentPurpose, endingTxt, scriptToggle, retrysubject]);

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

  const filterOut = ['-', '"', '"', '!.', '!', '['];
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

      setRetrySubject(data.topic);
      setRetrPresentPurpose(data.purpose);
      setRetryEndingTxt(data.word);
      const changeValue = data.duplicate === 'Y' ? true : false;
      setRetryRepeat(changeValue);

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

      // 전체 단락
      const finaldata = dataArray.join('');
      const improveIndex = finaldata.indexOf('개선 내용');
      const QAIndex = finaldata.indexOf('예상 질문');
      const lastIndex = finaldata.length;

      // === 교정문 === //
      let extractedScriptText = finaldata.substring(0, improveIndex).replace('발표 대본', '').trim();
      const twoNum = extractedScriptText.slice(extractedScriptText.length - 2);
      const oneNum = extractedScriptText.slice(0, 2);

      // 교정문 마지막에 2. 가 있을 경우 2. 제거
      if (twoNum === '2.') {
        extractedScriptText = extractedScriptText.slice(0, -2).trim();
      }
      // 교정문 첫번쨰에 1. 가 있을 경우 1. 제거
      if (oneNum === '1.') {
        extractedScriptText = extractedScriptText.slice(2).trim();
      }

      // === 개선내용 === //
      let extractedImproveEText = finaldata.substring(improveIndex, QAIndex).replace('개선 내용', '').replace(/[-:*]/g, '').trim();
      const threeNum = extractedImproveEText.slice(extractedImproveEText.length - 2);
      // 예상 질문 앞에 3. 이 붙어있을경우 마지막 3. 제거
      if (threeNum === '3.') {
        extractedImproveEText = extractedImproveEText.slice(0, -2).trim();
      }
      // 개선내용 여러개일 경우
      const improveLlines = extractedImproveEText.split('\n');
      setImprovements(improveLlines);

      // === 예상 질문 === //
      let extractedOAText = finaldata.substring(QAIndex, lastIndex).replace('예상 질문,', '').replace('답', '').replace('변', '').trim();
      // qa 배열화
      const regex = /(?:Q\s*:\s*|질문\s*:\s*)([^?]+?)\?\s*(?:A\s*:\s*|답변\s*:\s*|답\s*:\s*)([^?]+?)(?=\s*(?:Q\s*:\s*|질문\s*:\s*|$))/g;
      let match;
      const askListArray = [];
      while ((match = regex.exec(extractedOAText)) !== null) {
        askListArray.push({
          question: match[1].trim(),
          answer: match[2].trim(),
        });
      }
      setQaArray(askListArray);

      if (newScript.length > 0 && modifyBtn && scriptToggle) {
        // 재교정 시 (2회차 이상)
        const oldScript = newScript.slice(0, 3000);
        const updatedScript = extractedScriptText;

        // 2회차 새로운 교정본을 newScript로 설정 1회차는 구
        setOriginScript(oldScript);
        setRetryScriptCompareTxt(updatedScript);
        setNewScript(updatedScript);
        setCharCountNew(updatedScript.length);

        // 원본과 새 스크립트 비교
        highlightDiffs(oldScript, updatedScript);

        setShowNewSkeleton(false);
      } else {
        // 첫 번째 교정
        setNewScript(extractedScriptText);
        setCharCountNew(extractedScriptText.length);

        setRetryScriptCompareTxt(extractedScriptText);

        // 원본과 새 스크립트 비교
        highlightDiffs(originScript, extractedScriptText);

        setShowSkeleton(false);
      }
      // 나머지 상태 업데이트
      setAskLisTotalShow(true);
      setScriptToggle(true);
      setAskListState([false, false, false]);

      if (scriptUpdateTextareaRef.current) {
        scriptUpdateTextareaRef.current.style.opacity = '1';
      }
      if (scriptTextareaRef.current) {
        scriptTextareaRef.current.style.opacity = '1';
      }
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
        const numberedQuestion = `${index + 1}.질문 ${item.Q}\n답변 ${item.A}\n\n`;
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
                  </div>
                )}
                {scriptToggle && (
                  <div className="newScript">
                    <div ref={scriptUpdateTextareaRef}>
                      <HighlightWithinTextarea
                        highlight={[
                          {
                            highlight: highlightedText.filter((item) => !filterOut.includes(item)),
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
                <span className={cls(charCountNew > 3000 ? 'text-red-600' : 'gray_colorTxt')}>{scriptToggle ? formatNumber(charCountNew) : formatNumber(charCount)} / 3,000 (글자수)</span>
              </div>
              <div>
                <span className="gray_colorTxt">{estimatedPresentTime} (예상 발표 시간)</span>
              </div>
              <div>
                <span className="gray_colorTxt">개선 내용: {scriptToggle && <span className="main_colorTxt">{improvements[0]}</span>}</span>
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
                {qaArray.map((item, index) => {
                  return (
                    <li key={index}>
                      <div
                        className="list_ask"
                        onClick={() => toggleItem(index)}
                      >
                        <span className={cls(askListState[index] ? 'font-semibold' : 'font-medium')}>{item.question}</span>
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
                  );
                })}
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
