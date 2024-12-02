import axios from 'axios';
import { clientId, clientSecret } from './secret.js';

export const handler = async (event) => {
  const query = event.queryStringParameters.query;
  const apiUrl = `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(query)}&display=10&start=1&sort=date`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    });
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};