import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const KakaoCallback = () => {
  const router = useRouter();

  // useEffect(() => {
  //   // URL에서 쿼리 파라미터 가져오기
  //   const { code } = router.query;

  //   // 카카오 인증 코드가 있는 경우 처리
  //   if (code) {
  //     console.log(code);
  //   }
  // }, [router]);

  useEffect(() => {
    // URL에서 쿼리 파라미터 가져오기
    const { code } = router.query;

    // 카카오 인증 코드가 있는 경우 처리
    if (code) {
      // 백엔드 서버에 GET 요청을 보냅니다
      fetch(`https://api.ttorang.site/oauth/kako/callback?code=${code}`)
        .then((response) => {
          response.json();
          console.log(response);
        })
        .catch(() => {});
    }
  }, [router.query.code, router]);

  return (
    <div>
      <h1>로그인 처리 중...</h1>
    </div>
  );
};

export default KakaoCallback;
