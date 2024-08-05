import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Slider from 'react-slick';
import ShapeBg from '@/components/ShapeBg';
import { useSettingStore, useUserStore } from '@/store/store';
import { fetchKakaoLogOut } from '@/api/fetchData';

export default function Mypage() {
  const router = useRouter();
  const [deleteAnnounce, setDeleteAnnounce] = useState(false);
  const [withdrawal, setWithdrawal] = useState(false);
  const { userEmail, setUserEmail, accessToken, setAccessToken, clearUser } = useUserStore();

  function NextArrow(props) {
    const { className, style, onClick } = props;

    const dynamicStyle = {
      ...style,
      display: 'block',
      cursor: 'pointer',
      zIndex: 50,
    };

    return (
      <div
        className={className}
        style={dynamicStyle}
        onClick={onClick}
      >
        <Image
          src={LocalImages.ImageMainStepArrowRight}
          alt="ImageMainStepArrowRight"
          width={80}
          height={80}
        />
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', cursor: 'pointer', zIndex: 50 }}
        onClick={onClick}
      >
        <Image
          src={LocalImages.ImageMainStepArrowLeft}
          alt="ImageMainStepArrowLeft"
          width={80}
          height={80}
        />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: false,
    swipe: false,
    appendDots: (dots) => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom',
  };

  const kakaoLogOut = async () => {
    try {
      await fetchKakaoLogOut(accessToken);
      clearUser();
      router.push('/');
    } catch (e) {
      // 이미 만료된 토큰일 경우
      if (e.response && e.response.data && e.response.data.code === -401) {
        window.location.href = '/';
      } else {
        console.error('Error LogOut:', e);
      }
    }
  };

  return (
    <>
      <section className="mypage_container">
        <ShapeBg />
        <div className="content_area">
          <div className="userInfo_area">
            <p className="mypage_title">내 정보</p>
            <div>
              <div className="user">
                <div className="userIcon"></div>
                <p>{userEmail}</p>
              </div>
              <button
                type="button"
                onClick={kakaoLogOut}
              >
                로그아웃
              </button>
            </div>
          </div>
          <div className="myAnnounce_area">
            <p className="mypage_title">나의 발표문</p>
            <div className="myAnnounce_slide">
              <Slider {...settings}>
                <div className="myAnnounce">
                  <div className="announce_title">
                    <p>가나다라마가나</p>
                    <div
                      onClick={() => setDeleteAnnounce(true)}
                      className="delteBtn"
                    >
                      <Image
                        src={LocalImages.ImageDeleteX}
                        alt="ImageDeleteX"
                        width={14}
                        height={14}
                      />
                    </div>
                  </div>
                  <Link
                    href={'/mypage/announce/1'}
                    className="announce_content"
                  >
                    <p>디자인 프로세스를 설명해 주세요. 프로젝트의 시작부터 끝까지 어떤 단계들을 거치나요?디자인 프로세스를 설명해 주세요. 텍스트 예시 텍스트 예시텍스트 예시 텍스트 아무...</p>
                    <p className="date">2023.8.19</p>
                  </Link>
                </div>
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div
                    key={index}
                    className="myAnnounce"
                  >
                    <div className="announce_title">
                      <p>새 발표문 쓰기</p>
                    </div>
                    <div className="announce_content">
                      <div className="plusBtn">
                        <Image
                          src={LocalImages.ImageAddPlus}
                          alt="ImageAddPlus"
                          width={64}
                          height={64}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="other_area">
            <p className="mypage_title">기타</p>
            <ul>
              <li>
                <Link href={'/'}>공지사항</Link>
              </li>
              <li>
                <Link href={'/'}>개인정보처리방침</Link>
              </li>
              <li>
                <Link href={'/'}>이용약관</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setWithdrawal(true)}
                >
                  회원탈퇴
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* 삭제 모달 */}
      {deleteAnnounce && (
        <>
          <div
            className="modalBlackBg"
            onClick={() => setDeleteAnnounce(false)}
          ></div>
          <div className="modal_box withdrawal_box">
            <div className="character_box">
              <Image
                src={LocalImages.ImageModalDelete}
                alt="ImageModalDelete"
                width={120}
                height={120}
                className="scale-125"
              />
            </div>
            <div className="withdrawalMent_box">
              <p>정말 삭제를 진행하시겠어요?</p>
              <p>삭제 시 복구가 불가능해요</p>
            </div>
            <div className="modalBtn_area">
              <button
                type="button"
                onClick={() => setDeleteAnnounce(false)}
              >
                아니요
              </button>
              <button type="button">네</button>
            </div>
          </div>
        </>
      )}
      {/* 탈퇴 모달 */}
      {withdrawal && (
        <>
          <div
            className="modalBlackBg"
            onClick={() => setWithdrawal(false)}
          ></div>
          <div className="modal_box withdrawal_box">
            <div className="character_box"></div>
            <div className="withdrawalMent_box">
              <p>정말 탈퇴하시겠어요?</p>
              <p>탈퇴하시면 모든 정보를 잃게 돼요</p>
            </div>
            <div className="modalBtn_area">
              <button
                type="button"
                onClick={() => setWithdrawal(false)}
              >
                아니요
              </button>
              <button type="button">네</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
