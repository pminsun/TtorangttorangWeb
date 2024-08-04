import axios from 'axios';

export const fetchAnnounceData = async (data) => {
  return await axios({
    method: 'post',
    url: `https://api.ttorang.site/api/clova/script`,
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
    url: `https://api.ttorang.site/api/clova/qna`,
    data: {
      content: data.content,
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export const fetchKakaoLogin = async () => {
  return await axios({
    method: 'get',
    url: `https://api.ttorang.site/kakao`,
  });
};

export const fetchSaveScript = async (data) => {
  console.log(data);
  return await axios({
    method: 'post',
    url: `https://api.ttorang.site/api/script`,
    data: {
      topic: data.topic,
      purpose: data.purpose,
      word: data.word,
      content: data.content,
      qnaList: data.qnaList,
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
