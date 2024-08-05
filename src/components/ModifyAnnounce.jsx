import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import GuideMent from './GuideMent';
import * as LocalImages from '@/utils/imageImports';
import { cls, formatNumber } from '@/utils/config';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { fetchAnnounceData } from '@/api/fetchData';
import HighlightWithinTextarea from 'react-highlight-within-textarea';
import { diffWords } from 'diff';
import { useNextMoveBtnStore, useSettingStore, useInitialSettingStore, useFinalScriptStore, useScriptLoadingStore } from '@/store/store';

export default function ModifyAnnounce({ userEmail }) {
  const { setNextMoveBtn } = useNextMoveBtnStore();
  const { setFinalScript } = useFinalScriptStore();
  const { setScriptLoading } = useScriptLoadingStore();
  // setting
  const { originScript, setOriginScript, newScript, setNewScript, subject, setSubject, presentPurpose, setPresentPurpose, endingTxt, setEndingTxt, repeat, setRepeat } = useSettingStore();
  const { initialSubject, setInitialSubject, initialPresentPurpose, setInitialPresentPurpose, initialEndingTxt, setInitialEndingTxt, initialrepeat, setInitialRepeat } = useInitialSettingStore();

  useEffect(() => {
    // 선 작성 후 로그인 시 작성문 유지
    if (userEmail) {
      const savedData = localStorage.getItem('settings');
      const data = JSON.parse(savedData);
      setOriginScript(data.state.originScript);
      setSubject(data.state.subject);
      setPresentPurpose(data.state.presentPurpose);
      setEndingTxt(data.state.endingTxt);
      setRepeat(data.state.repeat);
      setNewScript(data.state.newScript);

      if (newScript) {
        setNextMoveBtn(true);
      } else {
        setNextMoveBtn(false);
      }
    }

    if (userEmail === '') {
      setOriginScript('');
      setSubject('');
      setPresentPurpose('회사 컨퍼런스');
      setEndingTxt('합니다체');
      setRepeat(false);
      setNewScript('');
      setNextMoveBtn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  // 초안
  const [charCountOrigin, setCharCountOrigin] = useState(0);
  const [modifyBtn, setModifyBtn] = useState(false);
  // 주제
  const [subjectCharCount, setSubjectCharCount] = useState(0);
  // 개선내용
  const [improvementMent, setImprovementMent] = useState('없음');
  //교정문
  // const [newScript, setNewScript] = useState('');
  const [initialNewScript, setInitialNewScript] = useState('');
  const [charCountNew, setCharCountNew] = useState(0);
  const [compareScriptToggle, setcompareScriptToggle] = useState(false);
  const [highlightedText, setHighlightedText] = useState([]);
  const scriptWriteBoxRef = useRef(null);
  // 예상 발표 시간
  const [estimatedPresentTime, setEstimatedPresentTime] = useState('0분 0초');

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
    setNewScript('');
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
      // 초안, 교정문 변경,세팅값 변경 있을경우 true
      setModifyBtn(
        (originScript && newScript && initialNewScript !== newScript) ||
          initialSubject !== subject ||
          initialPresentPurpose !== presentPurpose ||
          initialEndingTxt !== endingTxt ||
          initialrepeat !== repeat,
      );
    } else {
      // 초안, 주제 있을경우 true
      setModifyBtn(originScript && subject);
    }
  }, [originScript, subject, newScript, initialNewScript, initialSubject, compareScriptToggle, initialPresentPurpose, presentPurpose, initialEndingTxt, endingTxt, initialrepeat, repeat]);

  const filterOut = ['-', '"', '"', '!.', '!', '[', ']', ':'];
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
    setScriptLoading(true);
    try {
      const data = {
        topic: subject,
        purpose: presentPurpose,
        content: originScript,
        word: endingTxt,
        duplicate: repeat === true ? 'Y' : 'N',
      };

      // 비교값 저장
      setInitialSubject(subject);
      setInitialPresentPurpose(presentPurpose);
      setInitialEndingTxt(endingTxt);
      setInitialRepeat(repeat);
      //data
      const response = await fetchAnnounceData(data);
      const redData = response.data.replace(/data:/g, '');
      const events = redData.split('\n\n'); // 이벤트 분리
      const newContentQueue = [];
      events.forEach((event) => {
        if (event.trim()) {
          try {
            const jsonData = JSON.parse(event);
            const content = jsonData.message?.content || '';

            if (content) {
              // 상태를 업데이트하여 새 content 값을 배열에 추가
              newContentQueue.push(content);
            }
          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }
        }
      });

      const finaldata = newContentQueue.join('');
      const improveIndex = finaldata.indexOf('개선 내용');

      // === 교정문 === //
      let extractedScriptText = finaldata.substring(0, improveIndex).replace('발표 대본', '').trim().replace(/[-:*]/g, '').trim();

      // === 개선내용 === //
      let extractedImproveEText = finaldata.substring(improveIndex).replace('개선 내용', '').replace(/[-:*]/g, '').trim();
      const improvementSections = extractedImproveEText.split('\n\n');
      const improvementPairs = improvementSections.flatMap((section) => section.split(',').map((item) => item.trim()));
      setImprovementMent(improvementPairs[0]);

      // 재교정 시 (2회차 이상)
      if (newScript.length > 0 && modifyBtn && compareScriptToggle) {
        const oldScript = newScript.slice(0, 3000);
        const updatedScript = extractedScriptText;

        // 2회차 새로운 교정본을 newScript로 설정 1회차는 구
        setOriginScript(oldScript);
        setInitialNewScript(updatedScript);
        setNewScript(updatedScript);
        setFinalScript(updatedScript);
        highlightDiffs(oldScript, updatedScript);
      } else {
        // 첫 번째 교정
        highlightDiffs(originScript, extractedScriptText);
        setInitialNewScript(extractedScriptText);
        setNewScript(extractedScriptText);
        setFinalScript(extractedScriptText);
      }

      setCharCountNew(extractedScriptText.length);
      setcompareScriptToggle(true);
      setScriptLoading(false);
      setNextMoveBtn(true);
    } catch (error) {
      console.error('Error fetching modified script:', error);
      setScriptLoading(false);
    }
  };

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
            <div>
              <div className="scriptMain_area">
                <p className="title">
                  <span className="required">*</span>발표 내용
                </p>
                <div className="scriptTxt">
                  {!compareScriptToggle && (
                    <>
                      <div
                        ref={scriptWriteBoxRef}
                        className="textSize"
                      >
                        <textarea
                          placeholder="발표문 초안을 작성해 주세요. 꼼꼼히 작성할수록 세심한 교정과 정확한 예상 질문을 받을 수 있어요."
                          maxLength="3000"
                          value={originScript}
                          onChange={writeOriginScript}
                        />
                      </div>
                      <p>{formatNumber(charCountOrigin)} / 3000</p>
                    </>
                  )}
                  {compareScriptToggle && (
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
                              if (value.length > 3000) {
                                setCharCountNew(3000);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <p>{formatNumber(charCountNew)} / 3000</p>
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
                    개선 내용: <span>{compareScriptToggle ? improvementMent : '없음'}</span>
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
