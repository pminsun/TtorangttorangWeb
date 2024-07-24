import GuideMent from '@/components/GuideMent';
import SkeletonLoading from '@/components/SkeletonLoading';
import { cls, formatNumber, measureTextWidth } from '@/utils/config';
import { useEffect, useState, useRef } from 'react';

const testTxt =
  "안녕하세요, 여러분. 오늘은 디자인 프로세스에서 중요한 역할을 하는 퍼소나(Persona)에 대해 이야기해보겠습니다. 퍼소나는 디자인 작업을 진행할 때 필수적인 도구 중 하나예요. 퍼소나는 우리의 제품이나 서비스를 사용할 가상의 사용자를 대표하는 캐릭터로, 실제 사용자 데이터를 기반으로 만들어집니다. 이를 통해 디자이너는 사용자 중심의 디자인을 구현할 수 있어요. 퍼소나를 만드는 과정은 다음과 같습니다. 먼저, 사용자 리서치를 통해 목표 사용자의 행동, 동기, 요구사항 등을 파악해요. 이때 인터뷰, 설문조사, 사용성 테스트 등의 방법을 사용합니다. 수집된 데이터를 분석하여 공통된 특성과 패턴을 찾아내고, 이를 바탕으로 하나 이상의 퍼소나를 정의해요.퍼소나는 예를 들어, 우리의 목표 사용자가 30대 직장인이라면, 그들의 하루 일과, 주요 관심사, 직장에서 겪는 문제점 등을 자세히 기록하는 편이에요. 퍼소나는 디자인 과정에서 여러 가지 중요한 역할을 합니다. 첫째, 팀원들이 사용자에 대한 공통된 이해를 갖게 해요. 이는 의사소통을 원활하게 하고, 팀원들이 같은 방향을 바라보도록 도와줍니다. 둘째, 디자인 결정 시 사용자 관점을 유지해 사용자에게 실제로 필요한 기능과 경험을 제공할 수 있습니다. 셋째, 사용자의 요구와 목표를 구체적으로 함으로써, 디자이너가 더 창의적이고 효율적으로 문제를 해결할 수 있도록 해줘요. 예를 들어, 우리는 '김지훈'이라는 퍼소나를 만들 수 있습니다. 지훈은 35세의 마케팅 매니저로, 바쁜 업무 일정 속에서 효율적으";

export default function Home() {
  const [originScript, setOriginScript] = useState('');
  const [newScript, setNewScript] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [subject, setSubject] = useState('');
  const [subjectCharCount, setSubjectCharCount] = useState(0);
  const [presentPurpose, setpresentPurpose] = useState('company');
  const [endingTxt, setEndingTxt] = useState('hapnida');
  const [modifyBtn, setModifyBtn] = useState(false);
  const [estimatedPresentTime, setEstimatedPresentTime] = useState('0분 0초'); // 예상 발표 시간
  const [repeat, setRepeat] = useState(false);
  const [askListState, setAskListState] = useState([false, false, false]);
  const [askList, setAskList] = useState(false);

  const [scriptToggle, setScriptToggle] = useState(false);

  //
  const scriptTextareaRef = useRef(null);
  const skeletonRef = useRef(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
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

  const writeNewScript = (event) => {
    const MAX_LENGTH = 3000;
    let draft = event.target.value;

    if (draft.length > MAX_LENGTH) {
      draft = event.target.value.slice(0, MAX_LENGTH);
    }
    setNewScript(draft);
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
    setModifyBtn(originScript && subject && presentPurpose && endingTxt);
  }, [originScript, subject, presentPurpose, endingTxt]);

  // script 초기화
  const deleteAllScript = () => {
    setOriginScript('');
    setSubject('');
    setCharCount(0);
    setSubjectCharCount(0);
    setpresentPurpose('company');
    setEndingTxt('hapnida');
    setRepeat(false);
    setEstimatedPresentTime('0분 0초');
  };

  // 예상 발표 시간
  useEffect(() => {
    const estimatedTime = Math.ceil(charCount / 5); // 초 단위
    const minutes = Math.floor(estimatedTime / 60);
    const seconds = estimatedTime % 60;
    setEstimatedPresentTime(`${minutes < 10 ? '0' + minutes : minutes}분 ${seconds < 10 ? '0' + seconds : seconds}초`);
  }, [charCount, originScript]);

  // 클릭 시 질문 펼침/접기 처리
  const toggleItem = (index) => {
    setAskListState((prevState) => prevState.map((item, i) => (i === index ? !item : item)));
  };

  //  교정하기
  const modifyScript = () => {
    setShowSkeleton(true);
    scriptTextareaRef.current.style.opacity = '0';
    setTimeout(() => {
      setShowSkeleton(false);
      scriptTextareaRef.current.style.opacity = '1';
      setAskList(true);
      setScriptToggle(true);
      setNewScript(testTxt);
    }, 3000);
  };

  // 스켈레톤 로딩
  useEffect(() => {
    const lines = originScript.split('\n');
    const newLineWidths = lines.map((line) => measureTextWidth(line, '16px NotoSansKR'));
    setLineWidths(newLineWidths);
  }, [originScript]);

  useEffect(() => {
    const handleScroll = () => {
      if (skeletonRef.current) {
        skeletonRef.current.style.top = `-${scriptTextareaRef.current.scrollTop}px`;
      }
    };

    const textarea = scriptTextareaRef.current;
    textarea.addEventListener('scroll', handleScroll);

    return () => {
      textarea.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="main_container">
      <section className="topBanner_area"></section>
      <section className="correction_area">
        <GuideMent
          order={1}
          firstMent={'아무리 해도 익숙해지지 않는 발표! 또랑또랑이 도와드릴게요'}
          secondMent={'또랑또랑의 세심한 교정으로 더욱 명확하고 논리적인 메시지를 전달해 보세요'}
        />
        <div className="scriptModify_box">
          <div className="scriptWrite_box">
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
                      className={cls(newScript.length > 0 ? 'indentTxt' : '')}
                    />
                    <div
                      ref={skeletonRef}
                      className="skeleton_box"
                      style={{ pointerEvents: 'none' }}
                    >
                      {showSkeleton && <SkeletonLoading lineWidths={lineWidths} />}
                    </div>
                  </div>
                )}
                {scriptToggle && (
                  <div className="newScript">
                    <textarea
                      placeholder="발표문 초안을 작성해주세요"
                      maxLength="3000"
                      value={newScript}
                      onChange={writeOriginScript}
                    />
                  </div>
                )}
              </div>
              <div className="copy_box">
                <div>
                  <div className="icon"></div>
                  <p>복사하기</p>
                </div>
              </div>
            </div>
            <div className="script_info">
              <div>
                <span>{formatNumber(charCount)} / 3,000 (글자수)</span>
              </div>
              <div>
                <span>{estimatedPresentTime} (예상 발표 시간)</span>
              </div>
              <div>
                <span>
                  개선 내용: <span className="main_colorTxt">핵심 요점을 짚고 논리적 흐름을 개선했어요</span>
                </span>
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
                    onClick={() => selectPurpose('company')}
                    className={cls(presentPurpose === 'company' ? 'active_color' : 'disabled_color')}
                  >
                    <span>회사 컨퍼런스</span>
                  </div>
                  <div
                    onClick={() => selectPurpose('school')}
                    className={cls(presentPurpose === 'school' ? 'active_color' : 'disabled_color')}
                  >
                    <span>학교 발표</span>
                  </div>
                  <div
                    onClick={() => selectPurpose('club')}
                    className={cls(presentPurpose === 'club' ? 'active_color' : 'disabled_color')}
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
                    onClick={() => selectEndingTxt('hapnida')}
                    className={cls(endingTxt === 'hapnida' ? 'active_color' : 'disabled_color')}
                  >
                    <span>- 합니다체</span>
                  </div>
                  <div
                    onClick={() => selectEndingTxt('haeyo')}
                    className={cls(endingTxt === 'haeyo' ? 'active_color' : 'disabled_color')}
                  >
                    <span>- 해요체</span>
                  </div>
                  <div className="!cursor-default"></div>
                </div>
              </div>
              <div className="repeat_box">
                <div onClick={() => setRepeat(!repeat)}>
                  <div className={cls('checkbox', repeat ? 'active_color' : 'disabled_color')}></div>
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
        </div>
      </section>
      <section className="ask_area">
        <GuideMent
          order={2}
          firstMent={'예상되는 질문들을 모아봤어요'}
          secondMent={'또랑또랑이 준비한 예상 질문과 답변으로, 발표를 더욱 완성도 있게 만들어 보세요'}
        />
        <div className="ask_box">
          {askList ? (
            <div className="askList">
              <ul>
                {[1, 2, 3].map((item, index) => (
                  <li key={index}>
                    <div
                      className="list_ask"
                      onClick={() => toggleItem(index)}
                    >
                      <span>디자인 프로세스를 설명해 주세요. 프로젝트의 시작부터 끝까지 어떤 단계들을 거치나요?</span>
                      <div className="list_arrow"></div>
                    </div>
                    <div className={cls('list_answer', askListState[index] ? 'on' : '')}>
                      <div>
                        <p>
                          디자인 프로세스는 체계적이고 단계적으로 진행됩니다. 먼저 요구사항을 분석하고 시장 조사를 통해 사용자 페르소나를 정의합니다. 그런 다음 브레인스토밍을 통해 다양한 아이디어를
                          구상하고, 와이어프레임을 작성하여 기본 구조를 시각화합니다. 이후 디지털 프로토타입을 제작해 사용자 테스트를 진행하고, 피드백을 반영하여 디자인을 개선합니다.
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="askCopy">질문 복사하기</div>
            </div>
          ) : (
            <div className="askNone">
              <div>
                <div className="illust_box"></div>
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
