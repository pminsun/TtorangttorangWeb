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

export default function TestScript() {
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

      // 전체 단락
      const finaldata = dataArray.join('');

      // 첫 번째 교정
      setNewScript(finaldata);
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
    </main>
  );
}
