import Image from 'next/image';
import GuideMent from './GuideMent';
import * as LocalImages from '@/utils/imageImports';

export default function ModifyAnnounce() {
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
                  <textarea
                    placeholder="발표문 초안을 작성해 주세요. 꼼꼼히 작성할수록 세심한 교정과 정확한 예상 질문을 받을 수 있어요."
                    maxLength="3000"
                  />
                  <p>3000 / 3000</p>
                </div>
              </div>
              <div className="contentInfo_area">
                <div className="script_fun">
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
                  <div>
                    <div className="icon">
                      <Image
                        src={LocalImages.ImageIconSyncAlt}
                        alt="ImageIconSyncAlt"
                        width={24}
                        height={24}
                      />
                    </div>
                    <p>원문 보기</p>
                  </div>
                </div>
                <div className="script_info">
                  <p className="gray_colorTxt">99분 99초 (예상 발표 시간)</p>
                  <p className="gray_colorTxt">개선 내용: </p>
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
                    />
                    <span className="subject_charCount">100 / 100</span>
                  </div>
                </div>
                <div>
                  <p className="title">
                    2. <span className="required">*</span>발표 목적을 선택해 주세요
                  </p>
                  <div className="purposeCheck">
                    {['회사 컨퍼런스', '학교 발표', '소모임'].map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="title">
                    3. <span className="required">*</span>종결 어미를 선택해 주세요
                  </p>
                  <div className="endingTxtCheck">
                    {['합니다체', '해요체', '소모임'].map((item, index) => (
                      <p key={index}>- {item}</p>
                    ))}
                  </div>
                </div>
                <div className="repeat_box">
                  <div>
                    <div className="checkbox disabled_color">
                      {/* {repeat && (
                <Image
                  src={LocalImages.ImageIconCheckboxArrow}
                  alt="ImageIconCheckboxArrow"
                  width={11}
                  height={10}
                />
              )} */}
                    </div>
                    <p>중복 표현을 제거할게요</p>
                  </div>
                </div>
              </div>
              <div className="modifyBtn_box">
                <button type="button">초기화</button>
                <button type="submit">교정하기</button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}
