// 서버 코드

// import express from 'express';
// import fetch from 'node-fetch';
// import path from 'path';
// import { api_url } from './index';
// import { dirname } from 'path';

// // 서버 코드
// const app = express();
// const client_id = 'oINvcti2ijXhM9DxWau8';
// const client_secret = 'laXayxxY8j';

// const __filename = api_url(import.meta.url);
// const __dirname = dirname(__filename);

// app.use(express.static('public'));

// app.use((res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

// app.get('/search/blog', async (req, res) => {
//   const query = req.query.query;
//   const api_url =
//     'https://openapi.naver.com/v1/search/blog.json?' + encodeURIComponent(query);
//   +'=&display=10&start=1&sort=random';

//   const options = {
//     method: 'GET',
//     url: api_url,
//     header: {
//       'X-Naver-Client-Id': client_id,
//       'X-Naver-Client-Secret': client_secret,
//     },
//   };

//   try {
//     const response = await fetch(api_url, options);
//     if (response.ok) {
//       const body = await response.json();
//       res.status(200).json(body);
//     } else {
//       res.status(response.status).end();
//       console.log('error = ' + response.status);
//     }
//   } catch (error) {
//     res.status(500).send('Internal Server Error');
//     console.log('Fetch error = ' + error);
//   }
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.listen(5500, () => {
//   console.log('app listening on port 5500!');
// });
