import axios from 'axios';

const api_base_uri = process.env.NEXT_PUBLIC_API_BASE_URL;

//clova
export const fetchAnnounceData = async (data) => {
  return await axios({
    method: 'post',
    url: `${api_base_uri}/api/clova/script`,
    data: {
      topic: data.topic,
      purpose: data.purpose,
      word: data.word,
      content: data.content,
      duplicate: data.duplicate,
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export const fetchQnAData = async (data) => {
  return await axios({
    method: 'post',
    url: `${api_base_uri}/api/clova/qna`,
    data: {
      content: data.content,
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

// userScript
export const fetchSaveScript = async (data, userAccessToken) => {
  return await axios({
    method: 'post',
    url: `${api_base_uri}/api/script`,
    data: {
      content: data.content,
      topic: data.topic,
      qnaList: data.qnaList,
    },
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export const getUserScript = async (userAccessToken) => {
  return await axios({
    method: 'get',
    url: `${api_base_uri}/api/script`,
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export const deleteUserScript = async (userAccessToken, id) => {
  return await axios({
    method: 'delete',
    url: `${api_base_uri}/api/script/${id}`,
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export const getDetailScript = async (userAccessToken, id) => {
  return await axios({
    method: 'get',
    url: `${api_base_uri}/api/script/${id}`,
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export const fetchModifyScript = async (data, userAccessToken, id) => {
  return await axios({
    method: 'post',
    url: `${api_base_uri}/api/script/${id}`,
    data: {
      content: data.content,
      topic: data.topic,
    },
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

// Login
const grant_type = 'authorization_code';
const client_id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;

// 인가코드 Link
export const authorizationCodeLink = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&prompt=login`;

// 액세스 토큰 요청
export const fetchKakaoAccessToken = async (code) => {
  const url = `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}`;

  return await axios.post(
    url,
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    },
  );
};

// 카카오 유저 정보 요청
export const fetchKakaoUserInfo = async (accessToken) => {
  return await axios.post(
    'https://kapi.kakao.com/v2/user/me',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
};

// DB에 유저 정보 저장 요청
export const fetchSaveKakaoLoginDb = async (accessToken) => {
  return await axios({
    method: 'post',
    url: `${api_base_uri}/api/oauth/login`,
    data: {
      userType: 'KAKAO',
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken} `,
    },
  });
};

// 카카오 로그아웃
export const fetchKakaoLogOut = async (accessToken) => {
  return await axios({
    method: 'post',
    url: `https://kapi.kakao.com/v1/user/logout`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};
