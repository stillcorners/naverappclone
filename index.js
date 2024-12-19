const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config()
const { CLIENT_ID, CLIENT_SECRET } = process.env
const { fileURLToPath } = 'url';
const { dirname, join } = 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(join(__dirname, 'src'))); // index.html 위치
app.use(express.static(join(__dirname, 'src/result'))); // results.html 위치

app.use(
  cors({
    origin: [
      'https://regal-cassata-bf72c7.netlify.app/'
    ],
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.get('/results', (req, res) => {
  res.sendFile(join(__dirname, 'src/result/results.html'));
});

app.get('/search/blog', async (req, res) => {
  const query = req.query.query;
  const api_url =
    'https://openapi.naver.com/v1/search/blog?query=' +
    encodeURI(query) +
    '&display=10&start=1&sort=date';

  try {
    const response = await axios.get(api_url, {
      headers: {
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET,
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