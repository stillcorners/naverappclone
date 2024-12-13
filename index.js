// import axios from 'axios';

// 배포 환경에서는 dotenv를 사용해서 .env 파일에 있는 clientId, clientSecret를 가져옴
// netlify 환경에서는 netlify의 환경 변수에 저장한 clientId, clientSecret를 가져옴 
// if (process.env.NODE_ENV !== 'production') {
  // const dotenv = require('dotenv');
  // dotenv.config();
// }

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// export const handler = async (event) => {
  // const query = event.queryStringParameters?.query;
  const apiUrl = `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(query)}&display=10&start=1&sort=date`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    });
    console.log(response.data);
    
    // return {
      // statusCode: 200,
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*', 
      // },
      // body: JSON.stringify(response.data),
    // };
  } catch (error) {
    console.error('Error:', error);
    // return {
    //   statusCode: error.response?.status || 500,
    //   body: JSON.stringify({ message: error.message }),
    // };
  }
// };