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
      // fetch(`https://api.ttorang.site/oauth/kakao/callback?code=${code}`)
      //   .then((response) => {
      //     response.json();
      //     console.log(response);
      //   })
      //   .catch(() => {});

      const grant_type = 'authorization_code&';
      const client_id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
      const client_secret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;
      const redirect_uri = 'https://api.ttorang.site/oauth/kakao/callback';

      const url = `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=http://localhost:3000/oauth/kakao/callback&code=${code}`;

      axios
        .post(
          url,
          {},
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        )
        .then((response) => {
          console.log('Response:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error.response ? error.response.data : error.message);
        });
    }
  }, [router.query.code, router]);

  return (
    <div>
      <h1>로그인 처리 중...</h1>
    </div>
  );
};

export default KakaoCallback;
