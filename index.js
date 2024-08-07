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
  const utf8Query = utf8.encode(req.query.query);
  const api_url =
    'https://openapi.naver.com/v1/search/blog?query=' +
    encodeURI.utf8Query +
    '&display=10&start=1&sort=random';
  var apiUrl = 'https://openapi.naver.com/v1/search/blog/' + encodeURIComponent(query);
  // var apiUrl =
  //   'https://openapi.naver.com/v1/search/blog.json?query=' + encodeURIComponent(query);

  fetch(apiUrl, {
    method: 'GET',
    mode: 'cors',
  })
    .then(response => {
      //HTTP 응답이 성공적일 때 실행됨
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })

    .then(data => {
      // JSON 데이터가 성공적으로 파싱되면 실행됨
      var items = data.items;
      var resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';
      items.forEach(item => {
        var title = item.title;
        var link = item.link;
        var description = item.description;
        var resultItem = document.createElement('div');
        resultItem.className = 'result__item';
        resultItem.innerHTML = `
          <h3>${title}</h3>
          <p>${description}</p>
          <a href="${link}" target="_blank">Read more</a>
        `;
        resultsContainer.appendChild(resultItem);
      });
    })
    .catch(error => {
      // HTTP 응답이 실패하면 실행됨
      console.error('Error:', error);
    });
}
