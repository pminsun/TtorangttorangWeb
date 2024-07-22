import GuideMent from '@/components/GuideMent';
import { cls } from '@/utils/config';
import { useState } from 'react';

export default function Home() {
  const [presentPurpose, setpresentPurpose] = useState('');
  const [endingTxt, setEndingTxt] = useState('');

  const selectPurpose = (purpose) => {
    setpresentPurpose(purpose);
  };

  const selectEndingTxt = (txt) => {
    setEndingTxt(txt);
  };

  return (
    <main className="main_container">
      <section className="topBanner_area"></section>
      <section className="correction_area">
        <GuideMent
          firstMent={'아무리 해도 익숙해지지 않는 발표! 또랑또랑이 도와드릴게요'}
          secondMent={'또랑또랑의 세심한 교정으로 더욱 명확하고 논리적인 메시지를 전달해 보세요'}
        />
        <div className="scriptModify_box">
          <div className="scriptWrite_box">
            <div className="script">
              <p>
                <span className="required">*</span>발표 내용
              </p>
              <textarea
                placeholder="발표문 초안을 작성해주세요"
                maxLength="5000"
              />
              <div className="copy">
                <div className="icon"></div>
                <p>복사하기</p>
              </div>
            </div>
            <div className="script_info">
              <div>
                <span>5,000 / 5,000 (글자수)</span>
              </div>
              <div>
                <span>99분 99초 (예상 발표 시간)</span>
              </div>
              <div>
                <span>개선 내용: 핵심 요점을 짚고 논리적 흐름을 개선했어요</span>
              </div>
            </div>
          </div>
          <div className="scriptSetting_box">
            <div className="detailSetting">
              <div>
                <p>
                  1. <span className="required">*</span>발표의 주제에 대해 간략히 설명해 주세요
                </p>
                <textarea
                  placeholder="ex : 생활 속에서 실천할 수 있는 환경 보호 방안"
                  maxLength="100"
                />
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
                </div>
              </div>
              <div className="repeat_box">
                <input
                  type="checkbox"
                  value=""
                  id="repeat"
                />
                <label
                  htmlFor="repeat"
                  className="checkboxCustom"
                ></label>
                <label
                  htmlFor="repeat"
                  className="checkboxTxt"
                >
                  중복 표현을 제거할게요
                </label>
              </div>
            </div>
            <div className="btn_box">
              <button>초기화</button>
              <button>교정하기</button>
            </div>
          </div>
        </div>
      </section>
      <section className="ask_area">
        <GuideMent
          firstMent={'예상되는 질문들을 모아봤어요'}
          secondMent={'또랑또랑이 준비한 예상 질문과 답변으로, 발표를 더욱 완성도 있게 만들어 보세요'}
        />
        <div className="ask_box">
          <div className="none_ask">
            <div className="illust_box"></div>
            <p>
              아직 발표문을 분석하지 못했어요.
              <br /> 발표문 초안을 작성한 후, 교정하기 버튼을 눌러주세요
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
