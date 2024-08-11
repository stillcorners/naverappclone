import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3000;

const client_id = 'oINvcti2ijXhM9DxWau8';
const client_secret = 'laXayxxY8j';

app.use(cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.get('/search/blog', async (req, res) => {
  const query = req.query.query;
  const api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(query);

  try {
    const response = await axios.get(api_url, {
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});
// var request = require('request');
// var options = {
//   url: api_url,
//   headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
// };
//   request.get(options, function (error, response, body) {
//     if (!error && response.statusCode == 200ㅇ
//) {
//       res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
//       res.end(body);
//     } else {
//       res.status(response.statusCode).end();
//       console.log('error = ' + response.statusCode);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
