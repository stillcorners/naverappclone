import https from 'https';
import fs from 'fs';
import axios from 'axios';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// const SSL_CRT_FILE= .cert/server.crt
// const SSL_KEY_FILE= .cert/server.key

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/search/blog', async (req, res) => {
  const query = req.query.query;
  const api_url =
    'https://openapi.naver.com/v1/search/blog.json?query=' +
    encodeURIComponent(query) +
    '&display=10&start=1&sort=random';

  try {
    const response = await axios.get(api_url, {
      headers: {
        'X-Naver-Client-Id': 'oINvcti2ijXhM9DxWau8',
        'X-Naver-Client-Secret': 'laXayxxY8j',
      },
    });

    if (response.status === 200) {
      res.json(response.data);
    } else {
      res.status(response.status).send('Error');
    }
  } catch (error) {
    res.status(500).send('Error');
  }
});

const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`HTTPS Server is running at https://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// // 검색창에서 엔터 누르면 API 요청
// function searchEnter() {
//   var searchInput = document.getElementById('searchQuery');

//   if (searchInput) {
//     searchInput.addEventListener('keydown', function (event) {
//       if (event.key === 'Enter') {
//         event.preventDefault();
//         var query = searchInput.value;
//         searchBlog(query);
//       }
//     });
//   } else {
//     console.error('searchQuery 요소를 찾을 수 없습니다.');
//   }
// }

// async function searchBlog(query) {
//   const api_url =
//     'https://openapi.naver.com/v1/search/blog.json?query=' +
//     encodeURIComponent(query) +
//     '&display=10&start=1&sort=random';

//   try {
//     const response = await axios.get(api_url, {
//       headers: {
//         'X-Naver-Client-Id': 'oINvcti2ijXhM9DxWau8',
//         'X-Naver-Client-Secret': 'laXayxxY8j',
//       },
//     });

//     if (response.status === 200) {
//       const data = response.data;
//       var items = data.items;
//       var resultsContainer = document.getElementById('results');
//       resultsContainer.innerHTML = '';
//       items.forEach(item => {
//         var title = item.title;
//         var link = item.link;
//         var description = item.description;
//         var resultItem = document.createElement('div');
//         resultItem.className = 'result__item';
//         resultItem.innerHTML = `
//           <h3>${title}</h3>
//           <p>${description}</p>
//           <a href="${link}" target="_blank">Read more</a>
//         `;
//         resultsContainer.appendChild(resultItem);
//       });
//     } else {
//       console.error('Error:', response.status);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// document.addEventListener('DOMContentLoaded', searchEnter);

// // 수동 이벤트 트리거 ㄴ
// const event = new window.KeyboardEvent('keydown', { key: 'Enter' });
// document.getElementById('searchQuery').value = '테스트 검색어';
// document.getElementById('searchQuery').dispatchEvent(event);

// function searchBlog(query) {
//   const api_url =
//     'https://openapi.naver.com/v1/search/blog.json?' + encodeURIComponent(query);
//   +'=&display=10&start=1&sort=random';
//   // var apiUrl =
//   //   'https://openapi.naver.com/v1/search/blog.json?query=' + encodeURIComponent(query);

//   fetch(api_url, {
//     method: 'GET',
//     mode: 'cors',
//     url: 'https://openapi.naver.com/v1/search/blog.json?+query=&display=10&start=1&sort=random',
//     header: {
//       'X-Naver-Client-Id': 'oINvcti2ijXhM9DxWau8',
//       'X-Naver-Client-Secret': 'laXayxxY8j',
//     },
//   })
//     .then(response => {
//       //HTTP 응답이 성공적일 때 실행
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })

//     .then(data => {
//       // JSON 데이터가 성공적으로 파싱되면 실행됨
//       var items = data.items;
//       var resultsContainer = document.getElementById('results');
//       resultsContainer.innerHTML = '';
//       items.forEach(item => {
//         var title = item.title;
//         var link = item.link;
//         var description = item.description;
//         var resultItem = document.createElement('div');
//         resultItem.className = 'result__item';
//         resultItem.innerHTML = `
//           <h3>${title}</h3>
//           <p>${description}</p>
//           <a href="${link}" target="_blank">Read more</a>
//         `;
//         resultsContainer.appendChild(resultItem);
//       });
//     })
//     .catch(error => {
//       // HTTP 응답이 실패하면 실행됨
//       console.error('Error:', error);
//     });
// }
