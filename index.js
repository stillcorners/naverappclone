import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const client_id = 'oINvcti2ijXhM9DxWau8';
const client_secret = 'laXayxxY8j';

app.use(
  cors({
    origin: 'https://stillcorners.github.io',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="kr">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="네이버 모바일 앱 클론코딩" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NAVER clone</title>
        <script>
          async function searchBlog() {
            const query = document.getElementById('searchQuery').value;
            try {
              const response = await fetch(\`/search/blog?query=\${encodeURIComponent(query)}\`);
              const data = await response.json();
              displayResults(data);
            } catch (error) {
              console.error('Error:', error);
            }
          }

          function displayResults(data) {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = data.items
              .map(
                item => \`
                  <div class="result-item">
                    <h3>\${item.title}</h3>
                    <p>\${item.description}</p>
                    <a href="\${item.link}" target="_blank">Read more</a>
                  </div>
                \`
              )
              .join('');
          }
        </script>
      </head>
      <body>
        <div>
          <input type="text" id="searchQuery" placeholder="검색어를 입력해주세요." />
          <button onclick="searchBlog()">검색</button>
        </div>
        <div id="results"></div>
      </body>
    </html>
    `);
});

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// node index.js
