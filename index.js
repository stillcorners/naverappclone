// 네이버 검색 API 예제 - 블로그 검색
const express = require('express');
const app = express();

const client_id = 'oINvcti2ijXhM9DxWau8';
const client_secret = 'laXayxxY8j';
app.get('/search/blog', function (req, res) {
  // const api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query); // JSON 결과
  const api_url =
    'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
  const request = require('request');
  const options = {
    url: api_url,
    headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});
app.listen(3000, function () {
  console.log(
    'http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!'
  );
});

// const express = require('express');
// const app = express();

// async function fetchBlogData(query) {
//   const api_url = `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(
//     query
//   )}`;
//   const options = {
//     headers: {
//       'X-Naver-Client-Id': oINvcti2ijXhM9DxWau8,
//       'X-Naver-Client-Secret': laXayxxY8j,
//     },
//   };

//   const response = await fetch(api_url, options);
//   if (!response.ok) {
//     throw new Error(`Error: ${response.status}`);
//   }
//   return response.json();
// }

// app.get('/search/blog', async (req, res) => {
//   try {
//     const data = await fetchBlogData(req.query.query);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).send(error.message);
//     console.error('Error:', error.message);
//   }
// });

// app.listen(3000, function () {
//   console.log(
//     'http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!'
//   );
// });

//---

// app.get('/search/blog', (req, res) => {
//   const api_url =
//     'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query); // JSON 결과
//   const request = require('request');
//   const options = {
//     url: api_url,
//     headers: {
//       'X-Naver-Client-Id': oINvcti2ijXhM9DxWau8,
//       'X-Naver-Client-Secret': laXayxxY8j,
//     },
//   };
//   request.get(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
//       res.end(body);
//     } else {
//       res.status(response.statusCode).end();
//       console.log('error = ' + response.statusCode);
//     }
//   });
// });

// function searchBlog() {
//   const query = document.getElementById('searchQuery').value;
//   const apiUrl = `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(
//     query
//   )}`;
// }

// document.addEventListener('DOMContentLoaded', function () {
//   const searchInput = document.getElementById('searchQuery');
//   searchInput.addEventListener('keydown', function (event) {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       searchBlog();
//     }
//   });
// });
