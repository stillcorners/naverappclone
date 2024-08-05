// 검색창에서 엔터 누르면 API 요청
document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('searchQuery');

  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      var query = searchInput.value;
      searchBlog(query);
    }
  });
});

function searchBlog(query) {
  var clientId = 'oINvcti2ijXhM9DxWau8';
  var clientSecret = 'laXayxxY8j';
  var apiUrl =
    'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURIComponent(query);

  var headers = {
    'X-Naver-Client-Id': clientId,
    'X-Naver-Client-Secret': clientSecret,
  };
  console.log('Fetching data from:', apiUrl);

  fetch(apiUrl, {
    method: 'GET',
    headers: headers,
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  });
  then(body => {
    console.log('Response:', body);
    var parser = new DOMParser();
    var xml = parser.parseFromString(body, 'text/xml');
    var items = xml.querySelectorAll('item');
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    items
      .forEach(item => {
        var title = item.querySelector('title').textContent;
        var link = item.querySelector('link').textContent;
        var description = item.querySelector('description').textContent;
        var resultItem = document.createElement('div');
        resultItem.className = 'result__item';
        resultItem.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${link}" target="_blank">Read more</a>
      `;
        resultsContainer.appendChild(resultItem);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
}
//  function (error, response, body) {
//   if (error) {
//     console.error('Error:', error);
//     return;
//   }
//   console.log('Response:', body);
//   // 여기서 body를 파싱하고 결과를 HTML에 추가하는 로직을 추가할 수 있습니다.
// });
//};

// function Search() {
//   var searchInput = document.getElementById('searchQuery');
//   var query = searchInput.value;
//   string = query;
//   console.log('Fetching data from:', options.url);
// }

// document.addEventListener('DOMContentLoaded', function () {
//   const searchInput = document.getElementById('searchQuery');

//   function searchBlog(event) {
//     event.preventDefault();
//     const query = searchInput.value;
//     //const apiUrl = `https://openapi.naver.com/v1/search/blog.xml`;
//     const apiUrl = `https://openapi.naver.com/v1/search/blog.xml?query=${encodeURIComponent(
//       query
//     )}&display=10&start=1&sort=sim`;

//     const clientId = 'oINvcti2ijXhM9DxWau8';
//     const clientSecret = 'laXayxxY8j';

//     console.log('Fetching data from:', apiUrl);

//     fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'X-Naver-Client-Id': clientId,
//         'X-Naver-Client-Secret': clientSecret,
//       },
//     })
//       .then(response => {
//         console.log('Response status:', response.status);

//         if (!response.ok) {
//           // 응답이 정상적으로 보내지 못할 때
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.text();
//       })
//       .then(str => {
//         console.log('Response text:', str);

//         new window.DOMParser().parseFromString(str, 'text/xml');
//       })
//       .then(data => {
//         console.log('Parsed XML data:', data);

//         const items = data.querySelectorAll('item');
//         const resultsContainer = document.getElementById('results');
//         resultsContainer.innerHTML = '';
//         items.forEach(item => {
//           const title = item.querySelector('title').textContent;
//           const link = item.querySelector('link').textContent;
//           const description = item.querySelector('description').textContent;
//           const resultItem = document.createElement('div');
//           resultItem.className = 'result__item';
//           resultItem.innerHTML = `
//                   <h3>${title}</h3>
//                   <p>${description}</p>
//                   <a href="${link}" target="_blank">Read more</a>
//                 `;
//           resultsContainer.appendChild(resultItem);
//         });
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }
// });
