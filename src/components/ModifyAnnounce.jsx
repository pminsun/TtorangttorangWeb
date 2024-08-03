import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import GuideMent from './GuideMent';
import * as LocalImages from '@/utils/imageImports';
import { cls, formatNumber, measureTextWidth } from '@/utils/config';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { fetchAnnounceData } from '@/api/fetchData';
import SkeletonLoading from './SkeletonLoading';
import HighlightWithinTextarea from 'react-highlight-within-textarea';
import { diffWords } from 'diff';

export default function ModifyAnnounce() {
  // 초안
  const [originScript, setOriginScript] = useState('');
  const [charCountOrigin, setCharCountOrigin] = useState(0);
  const [modifyBtn, setModifyBtn] = useState(false);
  // 주제
  const [subject, setSubject] = useState('');
  const [subjectCharCount, setSubjectCharCount] = useState(0);
  // 개선내용
  const [improvementMent, setImprovementMent] = useState('없음');
  //교정문
  const [newScript, setNewScript] = useState('');
  const [charCountNew, setCharCountNew] = useState(0);
  const [compareScriptToggle, setcompareScriptToggle] = useState(false);
  const [highlightedText, setHighlightedText] = useState([]);
  const scriptWriteBoxRef = useRef(null);
  // setting
  const [presentPurpose, setPresentPurpose] = useState('회사 컨퍼런스');
  const [endingTxt, setEndingTxt] = useState('합니다체');
  const [repeat, setRepeat] = useState(false);
  // 예상 발표 시간
  const [estimatedPresentTime, setEstimatedPresentTime] = useState('0분 0초');
  //skeleton
  const [containerWidth, setContainerWidth] = useState(550);
  const scriptTextareaRef = useRef(null);
  const scriptUpdateTextareaRef = useRef(null);
  const skeletonRef = useRef(null);
  const skeletonNewScriptRef = useRef(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showNewSkeleton, setShowNewSkeleton] = useState(false);
  const [lineWidths, setLineWidths] = useState([]);

  console.log(lineWidths);

  // 초안 작성
  const writeOriginScript = (event) => {
    const MAX_LENGTH = 3000;
    let draft = event.target.value;

    if (draft.length > MAX_LENGTH) {
      draft = event.target.value.slice(0, MAX_LENGTH);
    }
    setOriginScript(draft);
    setCharCountOrigin(draft.length);
  };

  // 주제 작성
  const writeSubject = (event) => {
    const MAX_LENGTH = 100;
    let draft = event.target.value;

    if (draft.length > MAX_LENGTH) {
      draft = event.target.value.slice(0, MAX_LENGTH);
    }

    setSubject(draft);
    setSubjectCharCount(draft.length);
  };

  // 발표 목적
  const selectPurpose = (purpose) => {
    setPresentPurpose(purpose);
  };

  // 종결 어미
  const selectEndingTxt = (txt) => {
    setEndingTxt(txt);
  };

  // 예상 발표 시간
  useEffect(() => {
    const estimatedTime = compareScriptToggle ? Math.ceil(charCountNew / 5) : Math.ceil(charCountOrigin / 5); // 초 단위
    const minutes = Math.floor(estimatedTime / 60);
    const seconds = estimatedTime % 60;
    setEstimatedPresentTime(`${minutes < 10 ? '0' + minutes : minutes}분 ${seconds < 10 ? '0' + seconds : seconds}초`);
  }, [charCountOrigin, charCountNew, originScript, compareScriptToggle]);

  // script 초기화 버튼
  const deleteAllScript = () => {
    setOriginScript('');
    setSubject('');
    setCharCountOrigin(0);
    setSubjectCharCount(0);
    setPresentPurpose('회사 컨퍼런스');
    setEndingTxt('합니다체');
    setRepeat(false);
    setEstimatedPresentTime('0분 0초');
    setcompareScriptToggle(false);
  };

  // 교정하기 버튼 활성화
  useEffect(() => {
    if (compareScriptToggle) {
      setModifyBtn(originScript && newScript);
    } else {
      setModifyBtn(originScript && subject);
    }
  }, [originScript, subject, newScript, compareScriptToggle]);

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

  //  교정하기 버튼
  const modifyScript = async () => {
    // Skeleton loading start
    if (scriptTextareaRef.current) {
      setShowSkeleton(true);
      scriptTextareaRef.current.style.opacity = '0';
    }

    if (newScript.length > 0 && modifyBtn && compareScriptToggle && scriptUpdateTextareaRef.current) {
      setShowNewSkeleton(true);
      scriptUpdateTextareaRef.current.style.opacity = '0';
    }

    try {
      const data = {
        topic: subject,
        purpose: presentPurpose,
        content: originScript,
        word: endingTxt,
        duplicate: repeat === true ? 'Y' : 'N',
      };

      const response = await fetchAnnounceData(data);
      let jsonStringArray = [];
      let dataArray = [];
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
      highlightDiffs(originScript, finaldata);
      //setNewScript((prevQueue) => [...prevQueue, ...newContentQueue]);
      setNewScript(finaldata);

      // 첫 번째 교정
      setcompareScriptToggle(true);
      setShowSkeleton(false);

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
    const lines = compareScriptToggle ? newScript.split('\n') : originScript.split('\n');
    const skeletonLineWidths = lines.map((line) => measureTextWidth(line, '16px NotoSansKR'));
    setLineWidths(skeletonLineWidths);
  }, [newScript, originScript, compareScriptToggle]);

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
    <section className="main_container">
      <div className="progress_bar"></div>
      <section className="correction_area">
        <form>
          <div className="scriptWrite_box">
            <GuideMent
              firstMent={'발표문 초안 작성'}
              secondMent={'또랑또랑의 세심한 교정으로 더욱 명확하고 논리적인 발표문을 만들어 드려요'}
            />
            <div ref={scriptWriteBoxRef}>
              <div className="scriptMain_area">
                <p className="title">
                  <span className="required">*</span>발표 내용
                </p>
                <div className="scriptTxt">
                  {!compareScriptToggle && (
                    <>
                      <textarea
                        ref={scriptTextareaRef}
                        placeholder="발표문 초안을 작성해 주세요. 꼼꼼히 작성할수록 세심한 교정과 정확한 예상 질문을 받을 수 있어요."
                        maxLength="3000"
                        value={originScript}
                        onChange={writeOriginScript}
                      />
                      <p>{formatNumber(charCountOrigin)} / 3000</p>
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
                    </>
                  )}
                  {compareScriptToggle && (
                    <>
                      <div
                        className="newScript"
                        ref={scriptUpdateTextareaRef}
                      >
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
                      <p className="mt-[5px]">{formatNumber(charCountNew)} / 3000</p>
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
                    </>
                  )}
                </div>
              </div>
              <div className="contentInfo_area">
                <div className="script_fun">
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
                        text={compareScriptToggle ? newScript : originScript}
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
                  {newScript.length > 0 && (
                    <div onClick={() => setcompareScriptToggle(!compareScriptToggle)}>
                      <div className="icon">
                        <Image
                          src={LocalImages.ImageIconSyncAlt}
                          alt="ImageIconSyncAlt"
                          width={24}
                          height={24}
                        />
                      </div>
                      <p>{compareScriptToggle ? '원문 보기' : '교정문 보기'}</p>
                    </div>
                  )}
                </div>
                <div className="script_info">
                  <p>{estimatedPresentTime} (예상 발표 시간)</p>
                  <p>
                    개선 내용: <span>{improvementMent}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="scriptSetting_box">
            <GuideMent
              firstMent={'발표 정보 입력'}
              secondMent={'발표에 대한 간단한 정보를 입력해 주세요'}
            />
            <div>
              <div className="detailSetting">
                <div>
                  <p className="title">
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
                  <p className="title">
                    2. <span className="required">*</span>발표 목적을 선택해 주세요
                  </p>
                  <div className="purposeCheck">
                    {['회사 컨퍼런스', '학교 발표', '소모임'].map((item, index) => (
                      <p
                        key={index}
                        onClick={() => selectPurpose(item)}
                        className={cls(presentPurpose === item ? 'active_color' : 'disabled_color')}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="title">
                    3. <span className="required">*</span>종결 어미를 선택해 주세요
                  </p>
                  <div className="endingTxtCheck">
                    {['합니다체', '해요체'].map((item, index) => (
                      <p
                        key={index}
                        onClick={() => selectEndingTxt(item)}
                        className={cls(endingTxt === item ? 'active_color' : 'disabled_color')}
                      >
                        - {item}
                      </p>
                    ))}
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
              <div className="modifyBtn_box">
                <button
                  type="button"
                  onClick={() => {
                    if (originScript.length > 0 || subject.length > 0) {
                      deleteAllScript();
                    }
                  }}
                  className={cls(originScript.length > 0 || subject.length > 0 ? 'active_color cursor-pointer' : 'cursor-default')}
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
                  className={cls(modifyBtn ? 'active_color cursor-pointer' : 'cursor-default')}
                >
                  교정하기
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}
