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
