import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import ShapeBg from '@/components/ShapeBg';
import { useUserStore } from '@/store/store';
import { sliceMyScript, sliceMyScriptDateOnly, sliceMyScriptTitle, reverseData } from '@/utils/config';
import { fetchKakaoLogOut, getUserScript } from '@/api/fetchData';

export default function Mypage() {
  const router = useRouter();
  const [deleteAnnounce, setDeleteAnnounce] = useState(false);
  const [withdrawal, setWithdrawal] = useState(false);
  const { userEmail, accessToken, userAccessToken, clearUser } = useUserStore();
  const [addListLength, setAddListLength] = useState(0);

  // 내 발표문 data
  const {
    data: myScripts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['myScriptsData'],
    queryFn: () => getUserScript(userAccessToken),
  });

  const fiveItemInoneLine = myScripts?.data.data.length % 5;

  useEffect(() => {
    if (myScripts) {
      const myScriptDataLength = myScripts?.data.data.length;
      const remainder = myScriptDataLength % 5;
      const itemsNeeded = remainder === 0 ? 0 : 5 - remainder;

      setAddListLength(itemsNeeded);
    }
  }, [myScripts]);

  // 슬라이드
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

  // 카카오 로그아웃
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
                {reverseData(
                  myScripts?.data.data.map((item, index) => (
                    <div
                      className="myAnnounce"
                      key={item.id}
                    >
                      <div className="announce_title">
                        <p>{sliceMyScriptTitle(item.topic)}</p>
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
                        href={`/mypage/announce/${item.id}`}
                        className="announce_content"
                      >
                        <p>{sliceMyScript(item.content)}</p>
                        <p className="date">{sliceMyScriptDateOnly(item.regTime)}</p>
                      </Link>
                    </div>
                  )),
                )}

                {Array.from({ length: addListLength }, (_, index) => (
                  <div
                    className="myAnnounce"
                    key={index}
                  >
                    <div className="announce_title">
                      <p>새 발표문 쓰기</p>
                    </div>
                    <Link
                      href={`/announce`}
                      className="announce_content"
                    >
                      <div className="plusBtn">
                        <Image
                          src={LocalImages.ImageAddPlus}
                          alt="ImageAddPlus"
                          width={64}
                          height={64}
                        />
                      </div>
                    </Link>
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
