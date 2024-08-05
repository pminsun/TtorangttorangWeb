import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/store';
import { fetchKakaoAccessToken, fetchKakaoUserInfo, fetchSaveKakaoLoginDb } from '@/api/fetchData';

const KakaoCallback = () => {
  const router = useRouter();
  const { setUserEmail, setAccessToken } = useUserStore();

  useEffect(() => {
    const { code } = router.query;

    if (code) {
      fetchKakaoAccessToken(code)
        .then((response) => {
          const { access_token } = response.data;
          setAccessToken(access_token);

          if (access_token) {
            fetchKakaoUserInfo(access_token)
              .then((res) => {
                const email = res.data.kakao_account.email;
                setUserEmail(email);

                // DB에 유저 정보 저장
                fetchSaveKakaoLoginDb(access_token)
                  .then((dbRes) => {
                    router.push('/');
                  })
                  .catch((dbError) => {
                    console.error('DB 저장 에러:', dbError.response ? dbError.response.data : dbError.message);
                  });
              })
              .catch((userError) => {
                console.error('유저 정보 에러:', userError.response ? userError.response.data : userError.message);
              });
          }
        })
        .catch((tokenError) => {
          console.error('토큰 에러:', tokenError.response ? tokenError.response.data : tokenError.message);
        });
    }
  }, [router.query.code, router, setAccessToken, setUserEmail]);

  return (
    <div className="w-full h-full flex_center">
      <h1>로그인중</h1>
    </div>
  );
};

export default KakaoCallback;
