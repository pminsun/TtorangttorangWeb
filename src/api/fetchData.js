import axios from 'axios';

export const fetchAnnounceData = async (data) => {
  return await axios({
    method: 'post',
    url: `http://ttorang.site:8080/api/clova/script`,
    data: {
      topic: data.topic,
      purpose: data.purpose,
      word: data.word,
      content: data.content,
      duplicate: data.duplicate,
    },
  });
};
